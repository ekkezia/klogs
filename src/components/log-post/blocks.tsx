import React from "react"
import dynamic from "next/dynamic"
import { PortableText, PortableTextReactComponents } from "next-sanity"
import { TBlock, TCredit, TFact } from "@/types/log-sections"
import { L, Row, RuledBox, pad } from "./grid"
import { MediaBlock, imgSrc } from "./media"
import { CodeBlock } from "./code-block"
import { AnnotatedImage } from "./annotated-image"

const ModelBlock = dynamic(() => import("./model-viewer").then((m) => m.ModelBlock), { ssr: false })

// ---------- text ----------
// body2's line-height == one ruled line, so paragraphs sit on the lines.
const text: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="body2">{children}</p>,
    h2: ({ children }) => <h3 className="body2 font-bold">{children}</h3>,
    h3: ({ children }) => <h4 className="body2 font-bold underline decoration-primary underline-offset-4">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="body2 border-l-2 border-primary pl-4 italic">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="body2 list-disc pl-8">{children}</ul>,
    number: ({ children }) => <ol className="body2 list-decimal pl-8">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4 hover:bg-secondary">
        {children}↗
      </a>
    ),
    code: ({ children }) => <code className="bg-secondary px-1">{children}</code>,
  },
}
export const TextBlock: React.FC<{ value: any[] }> = ({ value }) => (
  <div className="px-4">
    <PortableText value={value} components={text} />
  </div>
)

// ---------- facts (label / value rows) ----------
export const FactsRows: React.FC<{ items: TFact[] }> = ({ items }) => (
  <div className="px-4">
    <RuledBox>
      {items.map((f) => (
        <Row key={f._key ?? f.label} className="gap-0">
          <span className="body4 flex h-full w-1/3 shrink-0 items-center border-r border-primary px-3 uppercase tracking-wide !text-primary sm:w-1/4">
            {f.label}
          </span>
          <span className="body3 truncate px-3">{f.value}</span>
        </Row>
      ))}
    </RuledBox>
  </div>
)

// ---------- quotes ----------
const Quotes: React.FC<{ quotes: { _key: string; text: string; source?: string | null }[] }> = ({ quotes }) => (
  <div className="flex flex-col px-4" style={{ gap: L(1) }}>
    {quotes.map((q) => (
      <blockquote key={q._key}>
        <p className="text-[22px] text-text-primary sm:text-[28px]" style={{ lineHeight: L(1), fontFamily: "var(--font-bricolage-grotesque)" }}>
          “{q.text}”
        </p>
        {q.source && (
          <p className="body4 uppercase tracking-wide !text-primary" style={{ lineHeight: L(1) }}>
            — {q.source}
          </p>
        )}
      </blockquote>
    ))}
  </div>
)

// ---------- numbered insights ----------
const Insights: React.FC<{ items: { _key: string; title: string; text?: string | null }[] }> = ({ items }) => (
  <div className="grid grid-cols-1 gap-x-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((it, i) => (
      <RuledBox key={it._key} style={{ marginBottom: L(1) }}>
        <Row className="gap-0">
          <span className="body3 flex h-full shrink-0 items-center justify-center border-r border-primary font-bold !text-primary" style={{ width: L(1.5) }}>
            {pad(i + 1)}
          </span>
          <span className="body3 truncate px-3 font-bold">{it.title}</span>
        </Row>
        {it.text && (
          <Row lines={2} className="items-start px-3">
            <p className="body3 line-clamp-2 opacity-80" style={{ lineHeight: L(1) }}>
              {it.text}
            </p>
          </Row>
        )}
      </RuledBox>
    ))}
  </div>
)

// ---------- cards (people / props / characters) ----------
const Cards: React.FC<{ columns?: number; items: Extract<TBlock, { _type: "cardsBlock" }>["items"] }> = ({ columns = 3, items }) => {
  const cols = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3"
  return (
    <div className={`grid grid-cols-1 gap-x-4 px-4 ${cols}`}>
      {items.map((c) => (
        <article key={c._key} style={{ marginBottom: L(1) }}>
          {c.image?.url && (
            <div style={{ height: L(7) }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgSrc(c.image, 900)} alt={c.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
          )}
          <RuledBox>
            <Row className="gap-2 px-3">
              <span className="body3 truncate font-bold">{c.title}</span>
              {c.subtitle && <span className="body4 shrink-0 uppercase tracking-wide !text-primary">{c.subtitle}</span>}
            </Row>
            {c.text && (
              <Row lines={2} className="items-start px-3">
                <p className="body3 line-clamp-2 opacity-80" style={{ lineHeight: L(1) }}>
                  {c.text}
                </p>
              </Row>
            )}
            {c.url && (
              <Row className="px-3">
                <a href={c.url} target="_blank" rel="noreferrer" className="body4 uppercase tracking-wide !text-primary hover:underline">
                  {c.linkLabel ?? "link"} ↗
                </a>
              </Row>
            )}
          </RuledBox>
        </article>
      ))}
    </div>
  )
}

// ---------- chips ----------
const Chips: React.FC<{ label?: string | null; items: string[] }> = ({ label, items }) => (
  <div className="flex flex-wrap items-center gap-x-2 px-4" style={{ rowGap: 0 }}>
    {label && (
      <span className="body4 mr-2 uppercase tracking-wide !text-primary" style={{ lineHeight: L(1) }}>
        {label}
      </span>
    )}
    {items.map((t) => (
      <span key={t} className="flex items-center" style={{ height: L(1) }}>
        <span className="body4 border border-primary px-2 py-[2px] !text-primary">{t}</span>
      </span>
    ))}
  </div>
)

// ---------- colour palette ----------
const Palette: React.FC<{ colors: { _key: string; hex: string; name?: string | null }[] }> = ({ colors }) => (
  <div className="grid grid-cols-3 gap-x-2 px-4 sm:grid-cols-5 lg:grid-cols-7">
    {colors.map((c) => (
      <div key={c._key}>
        <div className="border border-primary" style={{ height: L(2), background: c.hex }} />
        <p className="body4 truncate uppercase !text-primary" style={{ height: L(1), lineHeight: L(1) }}>
          {c.hex}
          {c.name ? ` · ${c.name}` : ""}
        </p>
      </div>
    ))}
  </div>
)

// ---------- embed ----------
const Embed: React.FC<{ url: string; caption?: string | null }> = ({ url, caption }) => (
  <figure className="px-4">
    <div className="border border-primary" style={{ height: L(16) }}>
      <iframe src={url} title={caption ?? url} className="h-full w-full" loading="lazy" />
    </div>
    <p className="body4 truncate uppercase tracking-wide !text-primary" style={{ height: L(1), lineHeight: L(1) }}>
      {caption ?? url}{" "}
      <a href={url} target="_blank" rel="noreferrer" className="hover:underline">
        open ↗
      </a>
    </p>
  </figure>
)

// ---------- dispatcher ----------
export const Block: React.FC<{ block: TBlock }> = ({ block }) => {
  switch (block._type) {
    case "textBlock":
      return <TextBlock value={block.content} />
    case "mediaBlock":
      return <MediaBlock layout={block.layout} items={block.items} caption={block.caption} />
    case "quotesBlock":
      return <Quotes quotes={block.quotes ?? []} />
    case "insightsBlock":
      return <Insights items={block.items ?? []} />
    case "factsBlock":
      return <FactsRows items={block.items ?? []} />
    case "cardsBlock":
      return <Cards columns={block.columns} items={block.items ?? []} />
    case "chipsBlock":
      return <Chips label={block.label} items={block.items ?? []} />
    case "paletteBlock":
      return <Palette colors={block.colors ?? []} />
    case "codeBlock":
      return <CodeBlock {...block} />
    case "annotatedImageBlock":
      return block.image?.url ? <AnnotatedImage image={block.image} pins={block.pins ?? []} caption={block.caption} /> : null
    case "modelBlock":
      return block.fileUrl ? <ModelBlock {...block} /> : null
    case "embedBlock":
      return block.url ? <Embed url={block.url} caption={block.caption} /> : null
    default:
      return null
  }
}

// ---------- credits ----------
export const Credits: React.FC<{ items: TCredit[] }> = ({ items }) => (
  <div className="px-4">
    <RuledBox>
      {items.map((c) => (
        <Row key={c._key ?? c.name} className="gap-0">
          <span className="body4 flex h-full w-1/3 shrink-0 items-center border-r border-primary px-3 uppercase tracking-wide !text-primary sm:w-1/4">
            {c.role}
          </span>
          {c.url ? (
            <a href={c.url} target="_blank" rel="noreferrer" className="body3 truncate px-3 hover:bg-secondary">
              {c.name} ↗
            </a>
          ) : (
            <span className="body3 truncate px-3">{c.name}</span>
          )}
        </Row>
      ))}
    </RuledBox>
  </div>
)
