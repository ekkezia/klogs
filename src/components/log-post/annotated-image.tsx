"use client"

import React, { useState } from "react"
import { TAsset } from "@/types/log-sections"
import { imgSrc } from "./media"
import { L, Row, RuledBox } from "./grid"

type Pin = { _key: string; x: number; y: number; title: string; note?: string | null; zoom?: number | null }

// Image with numbered pins. Hover/tap a pin (or its note) → the pin highlights and a
// zoomed crop of that spot appears above the notes, explaining why that detail matters.
export const AnnotatedImage: React.FC<{ image: TAsset; pins: Pin[]; caption?: string | null }> = ({ image, pins, caption }) => {
  const [active, setActive] = useState<number | null>(pins.length ? 0 : null)
  const ratio = image.dims?.aspectRatio ?? 4 / 3
  const src = imgSrc(image, 2400)
  const pin = active !== null ? pins[active] : null
  const zoom = pin?.zoom && pin.zoom > 1 ? pin.zoom : 3

  return (
    <figure className="grid grid-cols-1 gap-x-4 px-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]" style={{ rowGap: 0 }}>
      {/* Image + pins — 14 lines tall, image keeps its own aspect ratio */}
      <div className="flex items-center justify-center" style={{ height: L(14) }}>
        <div className="relative max-h-full" style={{ aspectRatio: ratio, width: `min(100%, calc(${L(14)} * ${ratio}))` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={image.alt ?? caption ?? ""} className="h-full w-full object-contain" />
          {pins.map((p, i) => (
            <button
              key={p._key}
              type="button"
              aria-label={`${i + 1}: ${p.title}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`body4 absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white font-bold shadow-[0_2px_6px_rgba(0,0,0,0.35)] duration-300 sm:h-8 sm:w-8 ${
                active === i ? "scale-125 bg-primary !text-tertiary" : "bg-tertiary !text-primary"
              }`}
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Zoom lens + notes */}
      <div>
        {pin && (
          <div
            className="mb-[var(--L)] border border-primary bg-no-repeat"
            aria-hidden
            style={{
              height: L(6),
              backgroundImage: `url(${src})`,
              backgroundSize: `${zoom * 100}% auto`,
              backgroundPosition: `${pin.x}% ${pin.y}%`,
            }}
          />
        )}
        <RuledBox>
          {pins.map((p, i) => (
            <div
              key={p._key}
              onMouseEnter={() => setActive(i)}
              className={`cursor-default duration-300 ${active === i ? "bg-secondary" : ""}`}
            >
              <Row className="gap-0">
                <span className="body3 flex h-full shrink-0 items-center justify-center border-r border-primary font-bold" style={{ width: L(1) }}>
                  {i + 1}
                </span>
                <span className="body3 truncate px-3 font-bold">{p.title}</span>
              </Row>
              {p.note && active === i && (
                <Row lines={2} className="items-start px-3">
                  <p className="body3 line-clamp-2 opacity-80" style={{ lineHeight: L(1) }}>
                    {p.note}
                  </p>
                </Row>
              )}
            </div>
          ))}
        </RuledBox>
      </div>
      {caption && (
        <p className="body4 truncate uppercase tracking-wide !text-primary lg:col-span-2" style={{ height: L(1), lineHeight: L(1) }}>
          {caption}
        </p>
      )}
    </figure>
  )
}
