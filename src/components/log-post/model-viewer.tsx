"use client"

import React, { useEffect, useState } from "react"
import { TAsset } from "@/types/log-sections"
import { imgSrc } from "./media"
import { L } from "./grid"

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Record<string, any>
    }
  }
}

// Rotatable / zoomable .glb model (Google <model-viewer>), 14 lines tall.
export const ModelBlock: React.FC<{ fileUrl: string; poster?: TAsset | null; caption?: string | null; autoRotate?: boolean | null }> = ({
  fileUrl,
  poster,
  caption,
  autoRotate = true,
}) => {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    import("@google/model-viewer").then(() => setReady(true))
  }, [])

  return (
    <figure className="px-4">
      <div className="relative border border-primary" style={{ height: L(14) }}>
        {ready ? (
          <model-viewer
            src={fileUrl}
            poster={imgSrc(poster) || undefined}
            camera-controls=""
            touch-action="pan-y"
            {...(autoRotate ? { "auto-rotate": "" } : {})}
            shadow-intensity="0.6"
            style={{ width: "100%", height: "100%", background: "transparent" }}
          />
        ) : (
          <div className="body3 flex h-full items-center justify-center opacity-60">⏳ loading 3D…</div>
        )}
        <span className="body4 pointer-events-none absolute bottom-2 right-3 uppercase !text-primary opacity-70">drag to rotate · scroll to zoom</span>
      </div>
      {caption && (
        <p className="body4 truncate uppercase tracking-wide !text-primary" style={{ height: L(1), lineHeight: L(1) }}>
          {caption}
        </p>
      )}
    </figure>
  )
}
