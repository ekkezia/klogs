// Imperative three.js engine for the NO FOTO installation study.
// A port of the single-file reference page (three r128 + examples/js) to the `three` npm package
// (examples/jsm). Loaded only on the client, only when the block is rendered (see ./index.tsx).
//
// r128 → r183 notes, so the picture matches the reference:
//  • colours: material/light hex values are read as *linear* (r128 had no colour management)
//  • lights: r128 "legacy" lights were scaled by π and used a (1 - d/cutoff)^decay falloff;
//    intensities below are converted so the room is lit the same way
//  • post-processing: r153+ only tone-maps / sRGB-encodes when drawing to the screen, so the
//    gallery composer ends in an OutputPass. Because that pass tone-maps the whole frame (r128 skipped
//    `toneMapped: false` materials), the LED face and the phone screen get a small gain to compensate.
//    The phone screen samples a linear HDR render target of the phone camera.

import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib.js"

import { techDrawingSvg } from "./tech-drawing"

export type SimMode = "gallery" | "plan"
export type SimConfig = 1 | 3
export type SimOptions = { mode: SimMode; n: SimConfig }

type Lens = "free" | "eye" | "phone" | "moving"
type Pose = { tx: number; ty: number; tz: number; yaw: number; pitch: number; dist: number }

const LED_HZ = 60
// gains that undo the whole-frame tone mapping on emissive surfaces (see header)
const LED_GAIN = 1.6,
  SCREEN_GAIN = 1.35 / 0.95
const UNIT_W = 0.346,
  UNIT_H = 0.089,
  UNIT_D = 0.0205,
  CY = 1.5,
  PX = 20
const PHRASES = ["YOU GRANT US A", "NON-EXCLUSIVE,", "ROYALTY-FREE,", "TRANSFERABLE,", "SUB-LICENSABLE,", "WORLDWIDE LICENSE"]

/* 3x5 pixel font for an 8-row LED strip */
const G: Record<string, string[]> = {
  A: [".#.", "#.#", "###", "#.#", "#.#"], B: ["##.", "#.#", "##.", "#.#", "##."], C: [".##", "#..", "#..", "#..", ".##"],
  D: ["##.", "#.#", "#.#", "#.#", "##."], E: ["###", "#..", "##.", "#..", "###"], F: ["###", "#..", "##.", "#..", "#.."],
  G: [".##", "#..", "#.#", "#.#", ".##"], H: ["#.#", "#.#", "###", "#.#", "#.#"], I: ["###", ".#.", ".#.", ".#.", "###"],
  J: ["..#", "..#", "..#", "#.#", ".#."], K: ["#.#", "#.#", "##.", "#.#", "#.#"], L: ["#..", "#..", "#..", "#..", "###"],
  M: ["#.#", "###", "###", "#.#", "#.#"], N: ["##.", "#.#", "#.#", "#.#", "#.#"], O: [".#.", "#.#", "#.#", "#.#", ".#."],
  P: ["##.", "#.#", "##.", "#..", "#.."], Q: [".#.", "#.#", "#.#", "##.", ".##"], R: ["##.", "#.#", "##.", "#.#", "#.#"],
  S: [".##", "#..", ".#.", "..#", "##."], T: ["###", ".#.", ".#.", ".#.", ".#."], U: ["#.#", "#.#", "#.#", "#.#", "###"],
  V: ["#.#", "#.#", "#.#", "#.#", ".#."], W: ["#.#", "#.#", "###", "###", "#.#"], X: ["#.#", "#.#", ".#.", "#.#", "#.#"],
  Y: ["#.#", "#.#", ".#.", ".#.", ".#."], Z: ["###", "..#", ".#.", "#..", "###"], "-": ["...", "...", "###", "...", "..."],
  ",": ["...", "...", "...", ".#.", "#.."], ".": ["...", "...", "...", "...", ".#."],
}
function litSet(str: string, cols: number) {
  const glyphs: (string[] | null)[] = []
  let w = 0
  for (const ch of str) {
    if (ch === " ") {
      glyphs.push(null)
      w += 2
    } else {
      glyphs.push(G[ch] || G["-"])
      w += 4
    }
  }
  w -= 1
  const set = new Set<string>()
  let x = Math.floor((cols - w) / 2)
  for (const g of glyphs) {
    if (!g) {
      x += 2
      continue
    }
    for (let r = 0; r < 5; r++) for (let c = 0; c < 3; c++) if (g[r][c] === "#") set.add(x + c + "," + (r + 2))
    x += 4
  }
  return set
}

const esc = (s: unknown) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!)

/** hex read as linear RGB, the way r128 (no colour management) treated it */
const lin = (hex: number) => new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace)
/** r128 legacy light → r183 physical light: ×π, and match the old falloff at a reference distance */
const legacy = (intensity: number, distance = 0, decay = 1, atDist = 1) => {
  if (!distance) return intensity * Math.PI
  const old = Math.pow(Math.max(0, 1 - atDist / distance), decay)
  const now = (1 / Math.max(Math.pow(atDist, decay), 0.01)) * Math.pow(Math.max(0, 1 - Math.pow(atDist / distance, 4)), 2)
  return intensity * Math.PI * (old / now)
}

/**
 * Mount the simulation into `root` (which already contains the markup from ./client.tsx).
 * Returns a dispose function that stops the loop and frees every GPU resource.
 */
export function mountNoFotoSim(root: HTMLElement, opts: SimOptions): () => void {
  const q = <T extends Element = HTMLElement>(k: string) => root.querySelector(`[data-nf="${k}"]`) as unknown as T
  const view = q("view"),
    cv = q<HTMLCanvasElement>("canvas"),
    ann = q<SVGSVGElement>("ann"),
    spec = q("spec")
  const S = { mode: opts.mode as SimMode, n: opts.n as SimConfig, lens: "free" as Lens, next: "free" as Lens, fps: 30, rec: 0 }
  const ac = new AbortController()
  const on = (el: EventTarget, ev: string, fn: (e: any) => void, o: AddEventListenerOptions = {}) =>
    el.addEventListener(ev, fn, { ...o, signal: ac.signal })

  /* renderer, scene, cameras */
  const renderer = new THREE.WebGLRenderer({ canvas: cv, antialias: true, preserveDrawingBuffer: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.03, 60)
  const phoneCam = new THREE.PerspectiveCamera(40, 2, 0.03, 60)
  const rt = new THREE.WebGLRenderTarget(640, 320, { type: THREE.HalfFloatType })
  const solid = new THREE.Group(),
    wire = new THREE.Group()
  scene.add(solid, wire)
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.6, 0.4, 0.9)
  composer.addPass(bloom)
  const outPass = new OutputPass()
  composer.addPass(outPass)
  RectAreaLightUniformsLib.init()
  const disposables: { dispose: () => void }[] = [rt, bloom, outPass]

  /* materials */
  const M = {
    wall: new THREE.MeshStandardMaterial({ color: lin(0x8c8982), roughness: 0.92 }),
    floor: new THREE.MeshStandardMaterial({ color: lin(0x4d4a45), roughness: 0.32, metalness: 0.05 }),
    ceil: new THREE.MeshStandardMaterial({ color: lin(0x2e2d2a), roughness: 0.95 }),
    beam: new THREE.MeshStandardMaterial({ color: lin(0x3b3a37), roughness: 0.9 }),
    art: new THREE.MeshStandardMaterial({ color: lin(0x6d5a48), roughness: 0.7 }),
    body: new THREE.MeshStandardMaterial({ color: lin(0x1c1b1a), roughness: 0.8 }),
    housing: new THREE.MeshStandardMaterial({ color: lin(0xe8e6e1), roughness: 0.25, transparent: true, opacity: 0.12, depthWrite: false }),
    back: new THREE.MeshStandardMaterial({ color: lin(0x111111), roughness: 0.6 }),
  }
  const Lm = {
    room: new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.7 }),
    grid: new THREE.LineBasicMaterial({ color: 0x1a1a1a, transparent: true, opacity: 0.22 }),
    dash: new THREE.LineDashedMaterial({ color: 0xa39b4f, dashSize: 0.08, gapSize: 0.06 }),
    fill: new THREE.MeshBasicMaterial({ color: 0xa39b4f }),
  }

  function box(w: number, h: number, d: number, x: number, y: number, z: number, mat: THREE.Material, lineMat?: THREE.Material | null, grp?: THREE.Group) {
    const g = new THREE.BoxGeometry(w, h, d)
    const m = new THREE.Mesh(g, mat)
    m.position.set(x, y, z)
    ;(grp || solid).add(m)
    if (lineMat !== null) {
      const e = new THREE.LineSegments(new THREE.EdgesGeometry(g), lineMat || Lm.room)
      e.position.set(x, y, z)
      wire.add(e)
    }
    return m
  }
  function line(pts: number[][], mat: THREE.LineBasicMaterial | THREE.LineDashedMaterial, group?: THREE.Group) {
    const g = new THREE.BufferGeometry().setFromPoints(pts.map((p) => new THREE.Vector3(p[0], p[1], p[2])))
    const l = new THREE.Line(g, mat)
    if ((mat as THREE.LineDashedMaterial).isLineDashedMaterial) l.computeLineDistances()
    ;(group || wire).add(l)
    return l
  }

  /* room: 8 m wide, 9 m deep, 4.5 m high; strip wall at z=0 */
  const RW = 8,
    RD = 9,
    RH = 4.5
  box(RW, 0.1, RD, 0, -0.05, RD / 2, M.floor)
  box(RW, 0.1, RD, 0, RH + 0.05, RD / 2, M.ceil)
  box(RW, RH, 0.1, 0, RH / 2, -0.05, M.wall)
  box(0.1, RH, RD, -RW / 2 - 0.05, RH / 2, RD / 2, M.wall)
  box(0.1, RH, RD, RW / 2 + 0.05, RH / 2, RD / 2, M.wall)
  for (let z = 1; z < RD; z += 1.5) box(RW, 0.32, 0.22, 0, RH - 0.16, z, M.beam)
  for (const z of [3.6, 7.2]) for (const x of [-2.4, 2.4]) box(0.4, RH, 0.4, x, RH / 2, z, M.wall)
  box(0.04, 0.9, 1.3, -RW / 2 + 0.02, 1.6, 3.2, M.art)
  box(1.1, 1.4, 0.04, -2.7, 1.65, 0.02, M.art)
  {
    const p: number[] = []
    for (let x = -RW / 2; x <= RW / 2 + 1e-6; x += 0.6) p.push(x, 0.001, 0, x, 0.001, RD)
    for (let z = 0; z <= RD + 1e-6; z += 0.6) p.push(-RW / 2, 0.001, z, RW / 2, 0.001, z)
    const g = new THREE.BufferGeometry()
    g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3))
    wire.add(new THREE.LineSegments(g, Lm.grid))
    for (let z = 1.75; z < RD - 1; z += 3)
      for (const x of [-2, 0.8])
        line(
          [
            [x, RH - 0.01, z - 0.4],
            [x + 1.2, RH - 0.01, z - 0.4],
            [x + 1.2, RH - 0.01, z + 0.4],
            [x, RH - 0.01, z + 0.4],
            [x, RH - 0.01, z - 0.4],
          ],
          Lm.room
        )
  }

  /* visitor holding a phone, landscape, pointed at the strip */
  const P_POS = new THREE.Vector3(-0.6, 0, 1.15),
    EYE = new THREE.Vector3(0.18, 1.6, 1.2),
    PHONE = new THREE.Vector3(-0.38, 1.42, 0.78),
    TGT = new THREE.Vector3(0, CY, 0)
  const person = new THREE.Group()
  solid.add(person)
  {
    const b = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.15, 1.45, 16), M.body)
    b.position.y = 0.725
    person.add(b)
    const h = new THREE.Mesh(new THREE.SphereGeometry(0.11, 16, 12), M.body)
    h.position.y = 1.6
    person.add(h)
    for (const s of [-1, 1]) {
      const a = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 8), M.body)
      const sh = new THREE.Vector3(s * 0.16, 1.32, 0).add(P_POS),
        hand = PHONE.clone().add(new THREE.Vector3(s * 0.06, -0.02, 0.02))
      a.position.copy(sh.clone().add(hand).multiplyScalar(0.5)).sub(P_POS)
      a.lookAt(hand.clone().sub(P_POS).add(person.position))
      a.rotateX(Math.PI / 2)
      person.add(a)
    }
    person.position.copy(P_POS)
    const pw = new THREE.Group()
    wire.add(pw)
    const e1 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.CylinderGeometry(0.17, 0.15, 1.45, 10)), Lm.room)
    e1.position.y = 0.725
    pw.add(e1)
    const e2 = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.SphereGeometry(0.11, 8, 6)), Lm.room)
    e2.position.y = 1.6
    pw.add(e2)
    pw.position.copy(P_POS)
  }
  const phone = new THREE.Group()
  scene.add(phone)
  {
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.152, 0.074, 0.008), new THREE.MeshStandardMaterial({ color: lin(0x2a2a2c), roughness: 0.4, metalness: 0.5 }))
    phone.add(body)
    const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.144, 0.066), new THREE.MeshBasicMaterial({ map: rt.texture, toneMapped: false, color: new THREE.Color(SCREEN_GAIN, SCREEN_GAIN, SCREEN_GAIN) }))
    scr.position.z = 0.0045
    phone.add(scr)
    const pe = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(0.152, 0.074, 0.008)), Lm.room)
    phone.add(pe)
    phone.position.copy(PHONE)
    phone.lookAt(PHONE.clone().multiplyScalar(2).sub(TGT))
    phoneCam.position.copy(PHONE)
    phoneCam.lookAt(TGT)
  }

  /* lights */
  scene.add(new THREE.AmbientLight(lin(0xffffff), legacy(0.05)), new THREE.HemisphereLight(lin(0xbfc6d0), lin(0x201c18), legacy(0.07)))
  function spot(from: number[], to: number[], int: number) {
    const d = Math.hypot(from[0] - to[0], from[1] - to[1], from[2] - to[2])
    const s = new THREE.SpotLight(lin(0xffe2bd), legacy(int, 9, 1.6, d), 9, 0.38, 0.6, 1.6)
    s.position.set(from[0], from[1], from[2])
    s.target.position.set(to[0], to[1], to[2])
    scene.add(s, s.target)
    return s
  }
  spot([-2.6, RH - 0.3, 2.6], [-RW / 2, 1.6, 3.2], 2.2)
  spot([-2.6, RH - 0.3, 1.4], [-2.7, 1.6, 0], 1.8)
  const trackPos: [number, number, number] = [-2.6, RH - 0.3, 2.6]
  box(0.09, 0.22, 0.09, ...trackPos, M.back, Lm.room)
  {
    const cone = new THREE.ConeGeometry(0.9, 1.9, 14, 1, true)
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(cone), Lm.grid)
    cone.dispose()
    e.position.set(-3.2, 2.9, 2.85)
    e.lookAt(-RW / 2, 1.6, 3.2)
    e.rotateX(-Math.PI / 2)
    wire.add(e)
  }

  /* the strip: one continuous housing, n panels long */
  let stripG: THREE.Group | null = null,
    stripWire: THREE.Group | null = null,
    planObjs: THREE.Group | null = null,
    face: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null,
    glowLights: THREE.Light[] = [],
    outlet: THREE.Mesh | null = null
  const C = { eye: document.createElement("canvas"), cam: document.createElement("canvas") }
  const X = { eye: C.eye.getContext("2d")!, cam: C.cam.getContext("2d")! }
  const T: { eye: THREE.CanvasTexture | null; cam: THREE.CanvasTexture | null } = { eye: null, cam: null }
  let lastEye = "",
    lastFrame = -1

  function disposeTree(o: THREE.Object3D) {
    o.traverse((c: any) => {
      c.geometry?.dispose?.()
      const mats = Array.isArray(c.material) ? c.material : c.material ? [c.material] : []
      for (const m of mats) {
        // shared materials (M / Lm) are disposed at teardown
        if (Object.values(M).includes(m) || Object.values(Lm).includes(m)) continue
        m.map?.dispose?.()
        m.dispose?.()
      }
    })
  }

  function buildStrips(n: SimConfig) {
    if (stripG) {
      solid.remove(stripG)
      wire.remove(stripWire!)
      wire.remove(planObjs!)
      glowLights.forEach((l) => {
        scene.remove(l)
        l.dispose()
      })
      disposeTree(stripG)
      disposeTree(stripWire!)
      disposeTree(planObjs!)
      if (outlet) {
        solid.remove(outlet)
        disposeTree(outlet)
      }
      T.eye?.dispose()
      T.cam?.dispose()
    }
    stripG = new THREE.Group()
    stripWire = new THREE.Group()
    planObjs = new THREE.Group()
    glowLights = []
    const cols = 32 * n,
      tot = UNIT_W * n
    for (const k of ["eye", "cam"] as const) {
      C[k].width = cols * PX
      C[k].height = 8 * PX
      const t = new THREE.CanvasTexture(C[k])
      t.colorSpace = THREE.SRGBColorSpace
      T[k] = t
    }
    box(tot - 0.004, UNIT_H, UNIT_D - 0.004, 0, CY, UNIT_D / 2, M.back, null, stripG)
    face = new THREE.Mesh(new THREE.PlaneGeometry(tot - 0.012, UNIT_H - 0.012), new THREE.MeshBasicMaterial({ map: T.eye, toneMapped: false, fog: false }))
    face.position.set(0, CY, UNIT_D + 0.001)
    stripG.add(face)
    box(tot, UNIT_H, UNIT_D, 0, CY, UNIT_D / 2, M.housing, null, stripG)
    const pg = new THREE.BoxGeometry(tot, UNIT_H, UNIT_D)
    const pm = new THREE.Mesh(pg, Lm.fill)
    pm.position.set(0, CY, UNIT_D / 2)
    stripWire.add(pm)
    const pe = new THREE.LineSegments(new THREE.EdgesGeometry(pg), new THREE.LineBasicMaterial({ color: 0x1a1a1a }))
    pe.position.copy(pm.position)
    stripWire.add(pe)
    const wc = document.createElement("canvas")
    wc.width = 256
    wc.height = 128
    const w = wc.getContext("2d")!
    const gr = w.createRadialGradient(128, 64, 4, 128, 64, 128)
    gr.addColorStop(0, "rgba(255,236,210,.55)")
    gr.addColorStop(1, "rgba(255,236,210,0)")
    w.fillStyle = gr
    w.fillRect(0, 0, 256, 128)
    const wash = new THREE.Mesh(
      new THREE.PlaneGeometry(tot * 2.6 + 0.6, 1.1),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(wc), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.22 })
    )
    wash.position.set(0, CY, 0.004)
    stripG.add(wash)
    const a = new THREE.RectAreaLight(lin(0xfff0dc), legacy(2.2), tot, UNIT_H)
    a.position.set(0, CY, UNIT_D + 0.01)
    a.lookAt(0, CY, 5)
    scene.add(a)
    glowLights.push(a)
    const p = new THREE.PointLight(lin(0xfff0dc), legacy(0.18 * n, 2.6, 2, 0.6), 2.6, 2)
    p.position.set(0, CY, 0.35)
    scene.add(p)
    glowLights.push(p)
    /* camera sign: an invitation to photograph (not crossed out) */
    {
      const sc = document.createElement("canvas")
      sc.width = 256
      sc.height = 256
      const g = sc.getContext("2d")!
      g.fillStyle = "#ebe8e1"
      g.fillRect(0, 0, 256, 256)
      g.fillStyle = "#1c1b1a"
      g.beginPath()
      g.moveTo(98, 78); g.lineTo(108, 58); g.lineTo(148, 58); g.lineTo(158, 78); g.closePath(); g.fill()
      g.beginPath()
      g.roundRect(44, 76, 168, 118, 18)
      g.fill()
      g.fillStyle = "#ebe8e1"
      g.beginPath(); g.arc(128, 135, 40, 0, Math.PI * 2); g.fill()
      g.fillStyle = "#1c1b1a"
      g.beginPath(); g.arc(128, 135, 28, 0, Math.PI * 2); g.fill()
      g.fillStyle = "#ebe8e1"
      g.beginPath(); g.arc(186, 96, 7, 0, Math.PI * 2); g.fill()
      const st = new THREE.CanvasTexture(sc)
      st.colorSpace = THREE.SRGBColorSpace
      const sx = -tot / 2 - 0.277
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), new THREE.MeshStandardMaterial({ map: st, roughness: 0.8, emissive: 0xffffff, emissiveMap: st, emissiveIntensity: 0.12 }))
      sign.position.set(sx, CY, 0.004)
      stripG.add(sign)
      const sw = new THREE.Mesh(new THREE.PlaneGeometry(0.1, 0.1), new THREE.MeshBasicMaterial({ map: st }))
      sw.position.set(sx, CY, 0.004)
      planObjs.add(sw)
    }
    solid.add(stripG)
    wire.add(stripWire)
    wire.add(planObjs)
    const ox = tot / 2 + 0.35
    outlet = box(0.08, 0.12, 0.03, ox, 0.3, 0.015, M.back, null)
    const o = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.12, 0.03), Lm.fill)
    o.position.set(ox, 0.3, 0.015)
    planObjs.add(o)
    line(
      [
        [tot / 2, CY - 0.03, 0.02],
        [tot / 2 + 0.12, CY - 0.03, 0.02],
        [ox, 1.0, 0.02],
        [ox, 0.36, 0.02],
      ],
      Lm.dash,
      planObjs
    )
    const hz = n === 3 ? 1.2 : 1
    line(
      [
        [-hz, 0.004, 0],
        [hz, 0.004, 0],
        [hz, 0.004, 2],
        [-hz, 0.004, 2],
        [-hz, 0.004, 0],
      ],
      Lm.dash,
      planObjs
    )
    lastEye = ""
    lastFrame = -1
  }

  /* LED pixels: the eye fuses the 60 Hz flicker; the camera catches it as rolling bands */
  const message = (t: number) => (S.n === 1 ? "NO FOTO" : PHRASES[Math.floor(t / 2.6) % PHRASES.length])
  function paint(k: "eye" | "cam", msg: string, t: number) {
    const ctx = X[k],
      cols = 32 * S.n,
      W = C[k].width,
      H = C[k].height,
      lit = litSet(msg, cols),
      g = PX * 0.16
    /* rolling-shutter band spacing: faster sensor readout at 60 fps gives wider bands; slight drift from 59.94 vs 60 */
    const kx = S.fps === 30 ? 0.5 : 0.3,
      drift = t * 0.9
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, W, H)
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < 8; r++) {
        let v = 1
        if (k === "cam" && !lit.has(c + "," + r)) v = 0.05 + 0.28 * Math.max(0, Math.sin(c * kx - r * 0.7 + drift))
        ctx.fillStyle = `rgb(${(255 * v) | 0},${(243 * v) | 0},${(226 * v) | 0})`
        ctx.fillRect(c * PX + g / 2, r * PX + g / 2, PX - g, PX - g)
      }
    if (k === "eye") {
      ctx.fillStyle = "rgba(255,243,226,.82)"
      ctx.fillRect(0, 0, W, H)
    }
    T[k]!.needsUpdate = true
  }
  function updateStrip(t: number) {
    if (!lastEye) {
      paint("eye", "", 0)
      lastEye = "x"
    }
    const f = Math.floor(t * S.fps)
    if (f !== lastFrame) {
      lastFrame = f
      const tq = f / S.fps
      paint("cam", message(tq), tq)
    }
  }

  /* orbit camera, shared by both modes */
  const O: Pose = { tx: 0, ty: 1.35, tz: 0.5, yaw: 0.42, pitch: 0.12, dist: 3.6 }
  const FREE = (): Pose => ({ tx: -0.3, ty: 1.45, tz: 0.55, yaw: 0.14, pitch: 0.1, dist: S.n === 3 ? 2.7 : 2.3 })
  function poseFrom(pos: THREE.Vector3): Pose {
    const d = pos.clone().sub(TGT),
      dist = d.length()
    return { tx: TGT.x, ty: TGT.y, tz: TGT.z, yaw: Math.atan2(d.x, d.z), pitch: Math.asin(d.y / dist), dist }
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
  let anim: { from: Pose; goal: Pose; t0: number } | null = null
  function goTo(goal: Pose, lens: Lens) {
    anim = { from: { ...O }, goal, t0: performance.now() }
    S.lens = "moving"
    S.next = lens
    applyLook()
  }
  function stepAnim(now: number) {
    if (!anim) return
    let k = Math.min(1, (now - anim.t0) / 750)
    if (reduceMotion.matches) k = 1
    const e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2
    for (const key in O) {
      const kk = key as keyof Pose
      O[kk] = anim.from[kk] + (anim.goal[kk] - anim.from[kk]) * e
    }
    if (k === 1) {
      anim = null
      S.lens = S.next
      applyLook()
    }
  }
  function place() {
    const cp = Math.cos(O.pitch)
    camera.position.set(O.tx + O.dist * Math.sin(O.yaw) * cp, O.ty + O.dist * Math.sin(O.pitch), O.tz + O.dist * Math.cos(O.yaw) * cp)
    camera.position.x = Math.max(-RW / 2 + 0.2, Math.min(RW / 2 - 0.2, camera.position.x))
    camera.position.y = Math.max(0.15, Math.min(RH - 0.25, camera.position.y))
    camera.position.z = Math.max(0.15, Math.min(RD - 0.2, camera.position.z))
    camera.lookAt(O.tx, O.ty, O.tz)
    const fov = S.lens === "phone" ? phoneCam.fov : 45
    if (camera.fov !== fov) {
      camera.fov = fov
      camera.updateProjectionMatrix()
    }
  }
  let drag: { x: number; y: number; yaw: number; pitch: number; moved: boolean } | null = null
  // the page keeps scrolling with the wheel until the visitor engages the view (click / drag)
  let engaged = false
  function leaveLens() {
    if (S.lens === "eye" || S.lens === "phone") {
      S.lens = "free"
      applyLook()
    }
  }
  on(view, "pointerdown", (e: PointerEvent) => {
    if ((e.target as Element).closest("button")) return
    engaged = true
    anim = null
    if (S.lens === "moving") S.lens = S.next
    drag = { x: e.clientX, y: e.clientY, yaw: O.yaw, pitch: O.pitch, moved: false }
    view.setPointerCapture(e.pointerId)
  })
  on(view, "pointermove", (e: PointerEvent) => {
    if (!drag) return
    if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 4) {
      drag.moved = true
      leaveLens()
    }
    if (!drag.moved) return
    O.yaw = Math.max(-1.3, Math.min(1.3, drag.yaw - (e.clientX - drag.x) * 0.006))
    O.pitch = Math.max(-0.3, Math.min(1.45, drag.pitch + (e.clientY - drag.y) * 0.005))
  })
  on(view, "pointerup", () => (drag = null))
  on(view, "pointercancel", () => (drag = null))
  on(view, "pointerleave", () => {
    if (!drag) engaged = false
  })
  on(
    view,
    "wheel",
    (e: WheelEvent) => {
      if (!engaged && !e.ctrlKey) return
      e.preventDefault()
      leaveLens()
      O.dist = Math.max(0.5, Math.min(8.5, O.dist * (1 + Math.sign(e.deltaY) * 0.08)))
    },
    { passive: false }
  )

  /* projection helpers, hotspots, plan annotations */
  function proj(v3: THREE.Vector3) {
    const v = v3.clone().project(camera)
    return { x: ((v.x + 1) / 2) * view.clientWidth, y: ((1 - v.y) / 2) * view.clientHeight, ok: v.z < 1 && v.z > -1 && Math.abs(v.x) < 1.05 && Math.abs(v.y) < 1.05 }
  }
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z)
  const spots = [
    { el: q("spotEye"), at: V(0.12, CY + 0.2, 0.12), lens: "eye" as Lens, pos: EYE },
    { el: q("spotCam"), at: V(-0.38, 1.33, 0.78), lens: "phone" as Lens, pos: PHONE },
  ]
  spots.forEach((s) => on(s.el, "click", () => goTo(poseFrom(s.pos), s.lens)))
  function drawSpots() {
    for (const s of spots) {
      const p = proj(s.at)
      const hide = !p.ok || S.lens === s.lens || (S.lens === "moving" && S.next === s.lens) || camera.position.distanceTo(s.at) < 0.35
      s.el.hidden = hide
      if (!hide) {
        const left = s.el.dataset.side === "left"
        s.el.style.transform = left ? `translate(calc(${p.x + 15}px - 100%),${p.y + 4}px)` : `translate(${p.x - 15}px,${p.y - 15}px)`
      }
    }
  }
  const CHAR_W = 7.4
  function tag(x: number, y: number, txt: string, anchor: "start" | "end" | "middle") {
    const w = txt.length * CHAR_W + 12
    const ax = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x
    return `<rect x="${ax}" y="${y - 12}" width="${w}" height="20" fill="var(--nf-paper)" stroke="var(--nf-ink)" stroke-width=".6"/><text x="${ax + 6}" y="${y + 3}" fill="var(--nf-ink)">${esc(txt)}</text>`
  }
  function dim(a: number[], b: number[], txt: string) {
    const p = proj(V(a[0], a[1], a[2])),
      q2 = proj(V(b[0], b[1], b[2]))
    if (!p.ok || !q2.ok) return ""
    const dx = q2.x - p.x,
      dy = q2.y - p.y,
      len = Math.hypot(dx, dy) || 1,
      nx = (-dy / len) * 6,
      ny = (dx / len) * 6
    return (
      `<line x1="${p.x}" y1="${p.y}" x2="${q2.x}" y2="${q2.y}" stroke="var(--nf-ink)"/>` +
      `<line x1="${p.x - nx}" y1="${p.y - ny}" x2="${p.x + nx}" y2="${p.y + ny}" stroke="var(--nf-ink)"/><line x1="${q2.x - nx}" y1="${q2.y - ny}" x2="${q2.x + nx}" y2="${q2.y + ny}" stroke="var(--nf-ink)"/>` +
      tag((p.x + q2.x) / 2, (p.y + q2.y) / 2, txt, "middle")
    )
  }
  function pin(pt: number[], dx: number, dy: number, txt: string) {
    const p = proj(V(pt[0], pt[1], pt[2]))
    if (!p.ok) return ""
    const ex = p.x + dx,
      ey = p.y + dy
    return (
      `<circle cx="${p.x}" cy="${p.y}" r="3" fill="var(--nf-accent)"/><line x1="${p.x}" y1="${p.y}" x2="${ex}" y2="${ey}" stroke="var(--nf-ink)" stroke-width=".8"/>` +
      tag(ex, ey, txt, dx < 0 ? "end" : "start")
    )
  }
  let annWasEmpty = true
  function drawAnn() {
    if (S.mode !== "plan") {
      if (!annWasEmpty) ann.innerHTML = ""
      annWasEmpty = true
      return
    }
    annWasEmpty = false
    const tot = UNIT_W * S.n,
      h = tot / 2,
      wallW = S.n === 3 ? 1.4 : 0.6,
      hz = S.n === 3 ? 1.2 : 1
    ann.innerHTML =
      dim([-h, CY - 0.28, 0.06], [h, CY - 0.28, 0.06], (34.6 * S.n).toFixed(1) + " cm" + (S.n === 3 ? ", one continuous housing" : "")) +
      dim([-wallW / 2, CY + 0.42, 0.02], [wallW / 2, CY + 0.42, 0.02], wallW + " m of wall") +
      dim([h + 0.6, 0, 0.05], [h + 0.6, CY, 0.05], "150 cm to centre") +
      pin([h, CY + UNIT_H / 2, UNIT_D], 60, -70, `H 8.9 cm · D ≈ 3.6 cm with controller housing · LED ${LED_HZ} Hz`) +
      pin([h + 0.35, 0.3, 0.03], 60, 10, "wall outlet within 2 m · artist brings 5 V adapter") +
      pin([0, 0, 2], 30, 40, "Clear floor " + hz * 2 + " × 2 m for phones") +
      pin([-h - 0.277, CY + 0.05, 0.01], -40, -50, "Camera sign 10 × 10 cm, an invitation to photograph") +
      pin(trackPos, 40, -10, "Track lights aimed away · 50–100 lux ambient")
  }
  function drawSpec() {
    const one = S.n === 1
    const rows: [string, string][] = [
      ["Size", `${one ? "34.6 × 8.9 × ≈3.6 cm" : "103.8 × 8.9 × ≈3.6 cm, one housing"} (box 2.05 cm + slim controller housing)`],
      ["Wall", `${one ? "0.6 m" : "1.4 m"} wide, centre at 150 cm`],
      ["Floor", `${one ? "2 × 2 m" : "2.4 × 2 m"} clear in front`],
      ["LED", `Flicker at ${LED_HZ} Hz, near phone frame rates (30 or 60 fps)`],
      ["Power", "Standard wall outlet within 2 m for the artist's 5 V adapter (US outlets are 120 V)"],
      ["Light", "Dim corner, 50–100 lux ambient; no spotlight on the strip"],
      ["Mount", "2 × ¾ in L brackets under the end posts, M3 × 12 up into the posts; see drawing below"],
      ["Hidden text", `<span data-sw></span>${one ? "NO FOTO" : "Instagram Terms of Use license clause, one phrase at a time"}`],
      ["Install", "1 artist, about half a day, flicker tuned on site"],
    ]
    spec.innerHTML =
      `<h4>${one ? "Single strip" : "Three panels, one strip"}</h4><p>${one ? "The work as shown at Composition." : "Scaled option: three LED panels in one continuous housing."}</p><dl>` +
      rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("") +
      `</dl>`
  }
  const t0 = performance.now()
  function drawInfo() {
    const msg = message((performance.now() - t0) / 1000)
    q("info").innerHTML =
      S.lens === "phone"
        ? `<span><b>LED</b> flicker ${LED_HZ} Hz</span><span><b>Camera</b> ${S.fps} fps, rolling shutter</span><span>The camera catches the flicker as bands and reads: <b>${esc(msg)}</b></span>`
        : S.lens === "eye"
          ? `<span><b>LED</b> flicker ${LED_HZ} Hz</span><span><b>Eye</b> fuses it into one steady bar of light</span><span>No text is visible</span>`
          : `<span><b>LED</b> flicker ${LED_HZ} Hz, close to phone frame rates (30 or 60 fps)</span><span>Click <b>Eye view</b> or <b>Camera view</b> to step into either point of view</span>`
  }

  /* mode look — the theme is scoped to the component root (data-mode), never the whole page */
  const probe = document.createElement("i")
  probe.style.display = "none"
  root.appendChild(probe)
  const css = (v: string) => {
    probe.style.color = `var(${v})`
    return getComputedStyle(probe).color
  }
  const fogGallery = new THREE.Fog(lin(0x060606), 5.5, 13)
  function applyLook() {
    const plan = S.mode === "plan",
      lens = S.lens === "moving" ? "free" : S.lens
    root.dataset.mode = S.mode
    solid.visible = !plan
    wire.visible = plan
    person.visible = !plan
    scene.fog = plan ? null : fogGallery
    scene.background = new THREE.Color(plan ? css("--nf-paper") : "#060606")
    const ink = new THREE.Color(css("--nf-ink"))
    ;[Lm.room, Lm.grid].forEach((m) => m.color.copy(ink))
    const ol = new THREE.Color(css("--nf-accent"))
    ;[Lm.dash, Lm.fill].forEach((m) => m.color.copy(ol))
    q("cam").dataset.on = String(!plan && lens === "phone")
    q("overview").setAttribute("aria-pressed", String(lens === "free"))
    q("shot").style.display = "none"
    q("hint").textContent = plan ? "Drag to orbit · click, then scroll to zoom · drag up for a top view" : "Drag to look around · click, then scroll to zoom"
    root.querySelectorAll<HTMLButtonElement>('[data-nf-seg="mode"] button').forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === S.mode)))
    root.querySelectorAll<HTMLButtonElement>('[data-nf-seg="cfg"] button').forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === String(S.n))))
    drawSpec()
    drawInfo()
  }

  /* controls */
  function seg(name: string, cb: (v: string) => void) {
    const el = root.querySelector(`[data-nf-seg="${name}"]`)!
    on(el, "click", (e: MouseEvent) => {
      const b = (e.target as Element).closest("button") as HTMLButtonElement | null
      if (!b) return
      cb(b.dataset.v!)
    })
  }
  seg("mode", (v) => {
    S.mode = v as SimMode
    applyLook()
  })
  seg("cfg", (v) => {
    S.n = (+v === 3 ? 3 : 1) as SimConfig
    buildStrips(S.n)
    applyLook()
  })
  on(q("overview"), "click", () => goTo(FREE(), "free"))
  on(q("fmt"), "click", () => {
    S.fps = S.fps === 30 ? 60 : 30
    q("fps").textContent = String(S.fps)
    lastFrame = -1
    drawInfo()
  })
  let flashRaf = 0
  on(q("recBtn"), "click", () => {
    S.rec = S.rec ? 0 : performance.now()
    q("timer").dataset.rec = String(!!S.rec)
    const f = q("flash")
    f.style.transition = "none"
    f.style.opacity = ".6"
    flashRaf = requestAnimationFrame(() => {
      f.style.transition = ""
      f.style.opacity = "0"
    })
    render()
    const img = q<HTMLImageElement>("shot")
    img.src = cv.toDataURL("image/jpeg", 0.8)
    img.style.display = "block"
  })

  q("dwg").innerHTML = techDrawingSvg()

  /* loop */
  function resize() {
    const w = view.clientWidth,
      h = view.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    composer.setSize(w, h)
    ann.setAttribute("viewBox", `0 0 ${w} ${h}`)
  }
  const ro = new ResizeObserver(resize)
  ro.observe(view)
  const exposure = () => (S.mode === "plan" ? 1 : S.lens === "phone" ? 1.35 : 0.95)
  function render() {
    place()
    if (S.mode === "gallery") {
      /* the visitor's phone screen shows what its camera sees */
      face!.material.map = T.cam
      const pv = person.visible
      person.visible = false
      phone.visible = false
      face!.material.color.setScalar(1)
      renderer.setRenderTarget(rt)
      renderer.render(scene, phoneCam)
      renderer.setRenderTarget(null)
      person.visible = pv
      phone.visible = S.lens !== "phone"
      face!.material.map = S.lens === "phone" ? T.cam : T.eye
    } else {
      phone.visible = true
      face!.material.map = T.eye
    }
    renderer.toneMappingExposure = exposure()
    if (S.mode === "gallery") {
      face!.material.color.setScalar(LED_GAIN)
      composer.render()
    } else {
      face!.material.color.setScalar(1)
      renderer.render(scene, camera)
    }
  }
  let lastInfo = 0,
    raf = 0,
    visible = true
  function loop(now: number) {
    raf = 0
    if (!visible) return
    const t = (now - t0) / 1000
    stepAnim(now)
    updateStrip(t)
    render()
    drawAnn()
    drawSpots()
    if (S.rec) {
      const s = Math.floor((now - S.rec) / 1000)
      q("timer").textContent = "00:" + String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0")
    }
    if (now - lastInfo > 400) {
      lastInfo = now
      drawInfo()
    }
    raf = requestAnimationFrame(loop)
  }
  // pause rendering while the block is scrolled out of view
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting
      if (visible && !raf) raf = requestAnimationFrame(loop)
    },
    { rootMargin: "200px" }
  )
  io.observe(view)

  buildStrips(S.n)
  Object.assign(O, FREE())
  resize()
  applyLook()
  raf = requestAnimationFrame(loop)

  return () => {
    ac.abort()
    if (raf) cancelAnimationFrame(raf)
    cancelAnimationFrame(flashRaf)
    ro.disconnect()
    io.disconnect()
    glowLights.forEach((l) => l.dispose())
    scene.traverse((c: any) => {
      c.geometry?.dispose?.()
      const mats = Array.isArray(c.material) ? c.material : c.material ? [c.material] : []
      for (const m of mats) {
        m.map?.dispose?.()
        m.dispose?.()
      }
      if (c.isLight) c.dispose?.()
    })
    T.eye?.dispose()
    T.cam?.dispose()
    Object.values(M).forEach((m) => m.dispose())
    Object.values(Lm).forEach((m) => m.dispose())
    disposables.forEach((d) => d.dispose())
    composer.dispose()
    renderer.dispose()
    renderer.forceContextLoss()
    probe.remove()
    ann.innerHTML = ""
    spec.innerHTML = ""
    q("dwg").innerHTML = ""
  }
}
