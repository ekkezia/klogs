"use client"

import dynamic from "next/dynamic"

import type { NoFotoSimProps } from "./client"

// Native (non-iframe) Portable Text block `noFotoSim`. Client-only: the component and
// three.js load lazily, only on pages where this block is rendered.
export const NoFotoSim = dynamic<NoFotoSimProps>(() => import("./client"), {
  ssr: false,
  loading: () => (
    <div className="px-4">
      <div className="body3 flex items-center justify-center bg-black/90 text-white" style={{ height: "calc(var(--L, var(--h-line2-sm)) * 19)" }}>
        ⏳ loading NO FOTO installation study…
      </div>
    </div>
  ),
})

export type { NoFotoSimProps }
