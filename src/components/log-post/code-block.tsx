import React from "react"
import { Highlight, themes } from "prism-react-renderer"
import { L, RuledBox, Row } from "./grid"

// "3-7, 12" → Set {3,4,5,6,7,12}
const parseLines = (spec?: string | null) => {
  const out = new Set<number>()
  for (const part of (spec ?? "").split(",")) {
    const [a, b] = part.trim().split("-").map((n) => parseInt(n, 10))
    if (!Number.isNaN(a)) for (let i = a; i <= (Number.isNaN(b) ? a : b); i++) out.add(i)
  }
  return out
}

// Code lines are half a ruled line tall (two code lines per rule), and the panel is a
// whole number of rules tall, so it still sits on the grid. Long code scrolls inside.
export const CodeBlock: React.FC<{
  code: string
  filename?: string | null
  language?: string | null
  caption?: string | null
  highlightLines?: string | null
}> = ({ code, filename, language, caption, highlightLines }) => {
  const lang = (language ?? "text").toLowerCase()
  const hl = parseLines(highlightLines)
  const lines = code.replace(/\n$/, "").split("\n").length
  // up to 12 rules (24 code lines) before it scrolls
  const rules = Math.min(12, Math.max(2, Math.ceil(lines / 2)))

  return (
    <figure className="px-4">
      <RuledBox className="bg-[#1f1d24]">
        <Row className="justify-between gap-4 px-3">
          <span className="body3 truncate font-bold !text-tertiary">{filename ?? "snippet"}</span>
          <span className="body4 shrink-0 border border-primary px-2 py-[2px] uppercase !text-secondary">{lang}</span>
        </Row>
        <Highlight theme={themes.oneDark} code={code.replace(/\n$/, "")} language={lang}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre
              className="overflow-auto border-b border-primary py-0 text-[13px] sm:text-[15px]"
              style={{ height: L(rules), lineHeight: L(0.5), fontFamily: "var(--font-monoton), monospace", background: "transparent" }}
              tabIndex={0}
              aria-label={`${filename ?? "code"} (scrollable)`}
            >
              {tokens.map((line, i) => {
                const { key: _k, ...lineProps } = getLineProps({ line }) as any
                return (
                  <div key={i} {...lineProps} className={`flex ${hl.has(i + 1) ? "bg-[#CD2DD833]" : ""}`}>
                    <span className="w-10 shrink-0 select-none pr-3 text-right opacity-40 sm:w-12" style={{ color: "#aaa" }}>
                      {i + 1}
                    </span>
                    <span className="whitespace-pre pr-4">
                      {line.map((token, j) => {
                        const { key: _t, ...tokenProps } = getTokenProps({ token }) as any
                        return <span key={j} {...tokenProps} />
                      })}
                    </span>
                  </div>
                )
              })}
            </pre>
          )}
        </Highlight>
      </RuledBox>
      {caption && (
        <p className="body4 truncate uppercase tracking-wide !text-primary" style={{ height: L(1), lineHeight: L(1) }}>
          {caption}
        </p>
      )}
    </figure>
  )
}
