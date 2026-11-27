"use client"

import React, { useEffect, useRef, useState } from "react"

import type { SimConfig, SimMode } from "./engine"
import s from "./no-foto-sim.module.css"
import { HARDWARE } from "./tech-drawing"

export type NoFotoSimProps = {
  title?: string | null
  config?: "1" | "3" | null
  initialMode?: SimMode | null
}

// Client-only. three.js (and the engine) are imported inside the effect, so they are only
// downloaded once this block actually mounts in the browser.
const NoFotoSimClient: React.FC<NoFotoSimProps> = ({ title, config, initialMode }) => {
  const rootRef = useRef<HTMLElement>(null)
  const n: SimConfig = config === "3" ? 3 : 1
  const mode: SimMode = initialMode === "plan" ? "plan" : "gallery"
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let dispose: (() => void) | null = null
    let cancelled = false
    import("./engine")
      .then(({ mountNoFotoSim }) => {
        if (cancelled) return
        dispose = mountNoFotoSim(root, { mode, n })
        setStatus("ready")
      })
      .catch((err) => {
        console.error("NO FOTO sim failed to start", err)
        if (!cancelled) setStatus("error")
      })
    return () => {
      cancelled = true
      dispose?.()
    }
    // the props only set the starting state; the sim owns its state afterwards
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <figure ref={rootRef} className={`${s.root} px-4`} data-mode={mode} aria-label={title ?? "NO FOTO installation study"}>
      {title && <p className={`${s.line} ${s.title} body3`}>{title}</p>}

      <div className={s.ctrls}>
        <div className={s.seg} data-nf-seg="mode" role="group" aria-label="Mode">
          <button type="button" data-v="gallery" aria-pressed={mode === "gallery"}>
            Gallery view
          </button>
          <button type="button" data-v="plan" aria-pressed={mode === "plan"}>
            Plan &amp; specs
          </button>
        </div>
        <div className={s.seg} data-nf-seg="cfg" role="group" aria-label="Configuration">
          <button type="button" data-v="1" aria-pressed={n === 1}>
            1 strip · NO FOTO
          </button>
          <button type="button" data-v="3" aria-pressed={n === 3}>
            3 panels · license clause
          </button>
        </div>
        <div className={s.seg}>
          <button type="button" data-nf="overview" aria-pressed="true">
            Overview
          </button>
        </div>
      </div>

      <div className={s.stage}>
        <div className={s.view} data-nf="view">
          <canvas data-nf="canvas" />
          <svg className={s.ann} data-nf="ann" aria-hidden="true" />
          <button type="button" className={s.spot} data-nf="spotEye" aria-label="See through the visitor's eyes" hidden>
            <i />
            <b>Eye view</b>
          </button>
          <button type="button" className={s.spot} data-nf="spotCam" data-side="left" aria-label="See through the phone camera" hidden>
            <i />
            <b>Camera view</b>
          </button>
          <div className={s.cam} data-nf="cam">
            <div className={s.tbar}>
              <span className={s.timer} data-nf="timer">
                00:00:00
              </span>
              <button type="button" className={s.fmt} data-nf="fmt" aria-label="Switch frame rate">
                <span>HD</span>
                <span className={s.f} data-nf="fps">
                  30
                </span>
              </button>
            </div>
            <div className={s.grid} />
            <div className={s.bbar}>
              <div className={s.modes}>
                <span>TIME-LAPSE</span>
                <span>SLO-MO</span>
                <b>VIDEO</b>
                <span>PHOTO</span>
                <span>PORTRAIT</span>
              </div>
              <button type="button" className={s.rec} data-nf="recBtn" aria-label="Record" />
            </div>
          </div>
          <div className={s.flash} data-nf="flash" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className={s.shot} data-nf="shot" alt="Last frame captured" />
          {/* the engine writes the hint; React only owns the status line below it */}
          <div className={s.hint} data-nf="hint" />
          {status !== "ready" && (
            <div className={s.status}>{status === "loading" ? "⏳ loading 3D…" : "3D could not start (WebGL unavailable?)"}</div>
          )}
          <div className={s.info} data-nf="info" />
        </div>
        <aside className={s.spec} data-nf="spec" />
      </div>

      <section className={s.tech}>
        <p className={`${s.line} ${s.techHead}`} style={{ marginTop: "var(--nf-L)" }}>
          <span>↳</span>Technical drawing
        </p>
        <p className={`${s.line} ${s.techText}`}>
          Festival version: the acrylic LED box only, without the controller housing behind it. Two vertical PLA end posts hold the front panel and LED panel;
          two small L brackets carry it from below. Dimensions in mm.
        </p>
        <div className={s.dwg} style={{ marginTop: "var(--nf-L)" }}>
          <svg data-nf="dwg" viewBox="0 0 960 560" role="img" aria-label="Front, back, section and bottom views of the NO FOTO strip with mounting brackets" />
        </div>
        <table className={s.hw} style={{ marginTop: "var(--nf-L)" }}>
          <thead>
            <tr>
              <th>Part</th>
              <th className={s.q}>Qty</th>
              <th>Where</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE.map((h) => (
              <tr key={h.part}>
                <td>{h.part}</td>
                <td className={s.q}>{h.qty}</td>
                <td>{h.where}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className={`${s.line} ${s.note}`}>
          From the end-post version of the “box M3 wall” Fusion model as recorded in the NO FOTO chat (not read from the file directly). Hole positions are
          approximate (±2 mm). The bracket insert in the post base is a proposal: the posts have no bottom insert today.
        </p>
      </section>

      <p className={`${s.line} ${s.foot}`}>
        Simulation: dimensions are to scale, lighting and flicker banding are approximate. Clause text from{" "}
        <a href="https://help.instagram.com/581066165581870" target="_blank" rel="noreferrer">
          Instagram Terms of Use ↗
        </a>
      </p>
    </figure>
  )
}

export default NoFotoSimClient
