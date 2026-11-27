// Technical drawing of the festival NO FOTO strip, as an SVG string (viewBox 0 0 960 560, units = mm).
// Ported from the "NO FOTO installation study" reference page. From the "box M3 wall" model as recorded:
// two vertical end posts replace the corner brackets. Colours come from the component's scoped CSS vars.
export function techDrawingSvg(): string {
  const ink = "var(--nf-ink)",
    ol = "var(--nf-accent)",
    mu = "var(--nf-mute)",
    paper = "var(--nf-paper)"
  const R = (x: number, y: number, w: number, h: number, a = "") =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${ink}" stroke-width=".7" ${a}/>`
  const Ln = (x1: number, y1: number, x2: number, y2: number, a = "") =>
    `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ink}" stroke-width=".7" ${a}/>`
  const T = (x: number, y: number, t: string, a = "") => `<text x="${x}" y="${y}" fill="${ink}" ${a}>${t}</text>`
  const HID = 'stroke-dasharray="3 2"'
  const dH = (x1: number, x2: number, y: number, t: string) =>
    Ln(x1, y, x2, y, 'stroke-width=".5"') +
    Ln(x1, y - 3, x1, y + 3, 'stroke-width=".5"') +
    Ln(x2, y - 3, x2, y + 3, 'stroke-width=".5"') +
    T((x1 + x2) / 2, y - 3, t, 'text-anchor="middle"')
  const dV = (x: number, y1: number, y2: number, t: string) =>
    Ln(x, y1, x, y2, 'stroke-width=".5"') +
    Ln(x - 3, y1, x + 3, y1, 'stroke-width=".5"') +
    Ln(x - 3, y2, x + 3, y2, 'stroke-width=".5"') +
    T(x - 4, (y1 + y2) / 2 + 3, t, 'text-anchor="end"')
  const bolt = (x: number, y: number) =>
    `<circle cx="${x}" cy="${y}" r="3.5" fill="none" stroke="${ol}" stroke-width=".8"/><circle cx="${x}" cy="${y}" r="2.7" fill="${ol}"/><circle cx="${x}" cy="${y}" r="1" fill="${paper}"/>`
  const lead = (x1: number, y1: number, x2: number, y2: number, t: string, anc = "start") =>
    Ln(x1, y1, x2, y2, 'stroke-width=".45"') +
    `<circle cx="${x1}" cy="${y1}" r="1.2" fill="${ink}"/>` +
    T(x2 + (anc === "end" ? -3 : 3), y2 + 3, t, `text-anchor="${anc}"`)
  const title = (x: number, y: number, t: string, sub: string) =>
    T(x, y, t, 'font-weight="700" font-size="11"') + T(x, y + 12, sub, `fill="${mu}"`)
  const post = (x: number, y: number, a = "") =>
    `<rect x="${x}" y="${y}" width="11.5" height="83" fill="${ol}" fill-opacity=".12" stroke="${ol}" stroke-width=".8" ${a}/>`
  let o = ""
  /* FRONT */
  const fx = 60,
    fy = 40
  o += R(fx, fy, 346, 89, 'stroke-width="1.1"')
  o += post(fx + 3, fy + 3, HID) + post(fx + 331.5, fy + 3, HID)
  o += R(fx + 13, fy + 4.5, 320, 80, `stroke="${mu}" ${HID}`)
  for (let c = 0; c < 32; c++) for (let r = 0; r < 8; r++) o += `<circle cx="${fx + 18 + c * 10}" cy="${fy + 9.5 + r * 10}" r=".9" fill="${mu}"/>`
  for (const [x, y] of [
    [8, 8],
    [338, 8],
    [8, 81],
    [338, 81],
  ])
    o += bolt(fx + x, fy + y)
  o += dH(fx, fx + 346, fy + 89 + 16, "346")
  o += dV(fx - 12, fy, fy + 89, "89")
  o += dH(fx + 13, fx + 333, fy - 8, "LED area 320 × 80 (8 × 32 WS2812B, 10 mm pitch)")
  o += lead(fx + 338, fy + 8, fx + 372, fy + 20, "4 × M3 × 8 + washer into the end-post inserts")
  o += lead(fx + 337, fy + 45, fx + 372, fy + 40, "End post behind (hidden), 2×")
  o += title(fx, fy + 89 + 34, "FRONT", "1.5 mm acrylic diffuser. Looks like one bar of light.")
  /* BACK */
  const bx = 60,
    by = 215
  o += R(bx, by, 346, 89, 'stroke-width="1.1"')
  o += post(bx + 3, by + 3, HID) + post(bx + 331.5, by + 3, HID)
  for (const cx of [bx + 8.75, bx + 337.25]) {
    o +=
      `<rect x="${cx - 7.5}" y="${by + 89}" width="15" height="19" fill="none" stroke="${ol}" stroke-width="1"/>` +
      `<circle cx="${cx}" cy="${by + 100}" r="2.2" fill="none" stroke="${ol}"/>`
  }
  o += `<rect x="${bx + 290}" y="${by + 60}" width="22" height="8" rx="4" fill="none" stroke="${ink}" stroke-width=".7"/>`
  o += lead(bx + 301, by + 64, bx + 372, by + 56, "Cable exit (existing back slot)")
  o += lead(bx + 337, by + 100, bx + 372, by + 102, "L bracket wall leg, 1 wall screw + anchor")
  o += lead(bx + 337, by + 20, bx + 372, by + 16, "End posts (hidden), 11.5 × 83 × 15")
  o += T(bx + 60, by + 46, "Back panel glued to the box", `fill="${mu}"`)
  o += dH(bx, bx + 14.5, by + 89 + 28, "14.5")
  o += title(bx, by + 89 + 46, "BACK", "Seen from the wall. One bracket under each end post.")
  /* SECTION A-A through an end post */
  const k = 2.2,
    sx = 720,
    sy = 40
  const S = (v: number) => v * k
  o += `<line x1="${sx}" y1="${sy - 10}" x2="${sx}" y2="${sy + S(125)}" stroke="${ink}" stroke-width="1.4"/>`
  for (let y = sy - 6; y < sy + S(125); y += 8) o += Ln(sx, y, sx - 7, y + 7, 'stroke-width=".4"')
  o += T(sx - 10, sy - 14, "WALL", 'text-anchor="end"')
  const pr = (x: number, y: number, w: number, h: number, f = "none", st = ink, a = "") =>
    `<rect x="${sx + S(x)}" y="${sy + S(y)}" width="${S(w)}" height="${S(h)}" fill="${f}" stroke="${st}" stroke-width=".8" ${a}/>`
  o += pr(0, 0, 3, 89) + pr(19, 0, 1.5, 89) + pr(0, 0, 20.5, 3) + pr(0, 86, 20.5, 3)
  o += pr(4, 3, 15, 83, ol, ol, 'fill-opacity=".18"')
  o += pr(4, 4.5, 3, 80, paper, mu)
  for (const y of [8, 81])
    o += `<rect x="${sx + S(13)}" y="${sy + S(y - 2)}" width="${S(6)}" height="${S(4)}" fill="${ol}"/><line x1="${sx + S(20.5)}" y1="${sy + S(y)}" x2="${sx + S(11)}" y2="${sy + S(y)}" stroke="${ink}" stroke-width="2.2"/><rect x="${sx + S(20.5)}" y="${sy + S(y - 2.7)}" width="${S(2.2)}" height="${S(5.4)}" fill="${ink}"/>`
  o += `<rect x="${sx + S(9.5)}" y="${sy + S(76)}" width="${S(4)}" height="${S(10)}" fill="${ol}" stroke="${ol}" stroke-dasharray="2 1.5" fill-opacity=".5"/>`
  o += `<line x1="${sx + S(11.5)}" y1="${sy + S(92)}" x2="${sx + S(11.5)}" y2="${sy + S(78)}" stroke="${ink}" stroke-width="2.2"/>`
  o += `<path d="M${sx} ${sy + S(89)} h${S(19)} v${S(1.6)} h${-S(17.4)} v${S(19)} h${-S(1.6)} z" fill="${ol}" stroke="${ol}"/>`
  o += `<line x1="${sx - 6}" y1="${sy + S(104)}" x2="${sx + S(1.6) + 4}" y2="${sy + S(104)}" stroke="${ink}" stroke-width="2.4"/>`
  o += dH(sx, sx + S(20.5), sy - 8, "20.5")
  o += dV(sx + S(20.5) + 16, sy, sy + S(89), "89")
  o += lead(sx + S(11), sy + S(40), sx + S(28), sy + S(40), "End post, PLA (15 deep)")
  o += lead(sx + S(5.5), sy + S(20), sx + S(28), sy + S(26), "LED panel in the post’s 3 mm step")
  o += lead(sx + S(19.7), sy + S(12), sx + S(28), sy + S(12), "1.5 mm acrylic diffuser")
  o += lead(sx + S(22), sy + S(8), sx + S(28), sy + S(-1), "M3 × 8 + washer, 2 per post")
  o += lead(sx + S(11.5), sy + S(82), sx + S(28), sy + S(68), "New M3 insert in post base (proposed)")
  o += lead(sx + S(11.5), sy + S(92), sx + S(24), sy + S(100), "M3 × 12 + washer, up into insert")
  o += lead(sx + S(12), sy + S(90.3), sx + S(24), sy + S(91), "¾ in steel L bracket")
  o += lead(sx + S(1), sy + S(104), sx + S(24), sy + S(118), "wall screw + anchor")
  o += title(sx - 10, sy + S(125) + 20, "SECTION A–A", "Through an end post, scale 2.2:1")
  /* BOTTOM */
  const ux = 60,
    uy = 420
  o += `<line x1="${ux - 10}" y1="${uy}" x2="${ux + 356}" y2="${uy}" stroke="${ink}" stroke-width="1.4"/>`
  for (let x = ux - 8; x < ux + 356; x += 8) o += Ln(x, uy, x + 7, uy - 7, 'stroke-width=".4"')
  o += R(ux, uy, 346, 20.5, 'stroke-width="1.1"')
  for (const cx of [ux + 8.75, ux + 337.25]) {
    o += `<rect x="${cx - 7.5}" y="${uy}" width="15" height="19" fill="${ol}" fill-opacity=".25" stroke="${ol}"/>` + `<circle cx="${cx}" cy="${uy + 11.5}" r="2.6" fill="${ol}"/>`
  }
  o += dH(ux, ux + 346, uy + 36, "346")
  o += dV(ux - 14, uy, uy + 20.5, "20.5")
  o += lead(ux + 337, uy + 11.5, ux + 372, uy + 12, "Bolt under the post centre, 11.5 mm from wall")
  o += title(ux, uy + 56, "BOTTOM", "Brackets stay inside the box depth, hidden from the front.")
  o += `<line x1="${fx + 8.75}" y1="${fy - 22}" x2="${fx + 8.75}" y2="${fy + 100}" stroke="${mu}" stroke-width=".6" stroke-dasharray="8 3 2 3"/>`
  o += T(fx + 2, fy + 112, "A", 'font-weight="700"') + T(fx + 2, fy - 24, "A", 'font-weight="700"')
  return o
}

export const HARDWARE: { part: string; qty: number; where: string }[] = [
  { part: "PLA end post (vertical column), 11.5 × 83 × 15 mm", qty: 2, where: "One at each end against the side wall; holds the LED panel edge in a 3 mm step" },
  { part: "M3 heat insert", qty: 6, where: "3 per post: 2 front, 1 side" },
  { part: "M3 × 8 socket bolt + M3 washer (7 mm)", qty: 4, where: "Front panel corners (4.4 mm holes) into the post front inserts" },
  { part: "M3 × 8 socket bolt + M3 washer", qty: 2, where: "Through each side wall into the post side insert" },
  {
    part: "M3 heat insert, new (proposed)",
    qty: 2,
    where: "In the base of each post for the wall bracket; needs a post reprint and a 3.4 mm hole in the bottom acrylic if none lines up",
  },
  { part: "M3 × 12 socket bolt + M3 washer", qty: 2, where: "Up through each L bracket and the bottom wall into that insert" },
  { part: "Steel L bracket, ¾ in (19 mm)", qty: 2, where: "Under each end post; stays behind the 20.5 mm front face" },
  { part: "Wall screw + anchor", qty: 2, where: "One per bracket, anchor to suit the venue wall" },
  { part: "Acrylic panels", qty: 6, where: "Front 1.5 mm diffuser, back (glued), top, bottom, 2 sides 3 mm" },
]
