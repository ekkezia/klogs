import React from "react"
import Link from "next/link"
import { TLog } from "@/types/log-types"
import { TSection } from "@/types/log-sections"
import { Block, Credits, FactsRows } from "./blocks"
import { Gap, L, POST_ROOT_CLASS, Row, RuledBox, pad } from "./grid"
import { imgSrc } from "./media"

// ---------- section heading ----------
// Main section: 2-line row (number cell + h4 title).  Subsection: 1-line bold row.
const SectionHeading: React.FC<{ n: number | null; title: string }> = ({ n, title }) =>
  n !== null ? (
    <div className="px-4">
      <RuledBox className="border-x-0">
        {/* min 2 lines; long titles wrap onto more 2-line rows instead of being cut off */}
        <Row lines={2} className="items-stretch gap-0" style={{ height: "auto", minHeight: L(2) }}>
          <span className="body1 flex shrink-0 items-center justify-center self-stretch border-r border-primary !text-primary" style={{ width: L(2) }}>
            {pad(n)}
          </span>
          {/* -1px bottom margin cancels the row's 1px border so wrapped titles stay on 2-line steps */}
          <h2 className="h4 px-4" style={{ lineHeight: L(2), marginBottom: -1 }}>
            {title}
          </h2>
        </Row>
      </RuledBox>
    </div>
  ) : (
    <h3 className="body2 flex items-center px-4 font-bold" style={{ height: L(1) }}>
      <span className="mr-2 !text-primary">↳</span>
      {title}
    </h3>
  )

const Section: React.FC<{ section: TSection; n: number | null }> = ({ section, n }) => (
  <section id={section._key}>
    <SectionHeading n={n} title={section.title} />
    {section.intro && (
      <p className="body2 px-4 opacity-90" style={{ marginTop: n !== null ? L(1) : 0 }}>
        {section.intro}
      </p>
    )}
    {(section.blocks ?? []).map((b) => (
      <div key={b._key} style={{ marginTop: L(1) }}>
        <Block block={b} />
      </div>
    ))}
  </section>
)

// ---------- header ----------
const Header: React.FC<{ log: TLog; lede: string }> = ({ log, lede }) => {
  const year = log.date ? new Date(log.date).getFullYear() : null
  const facts = log.facts?.length ? log.facts : year ? [{ label: "Year", value: String(year) }] : []
  const links = [
    log.projectUrl && { label: "🌏 Project", href: log.projectUrl },
    log.githubUrl && { label: "🐈 Code", href: log.githubUrl },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <header>
      <Gap />
      <h1 className="h4 px-4" style={{ lineHeight: L(2) }}>
        {log.title}
      </h1>
      {lede && <p className="body2 px-4">{lede}</p>}
      <Gap />

      {/* Facts as columns (like Year / Duration / Type) — 2 lines tall */}
      {facts.length > 0 && (
        <div className="px-4">
          <RuledBox className="grid grid-cols-2 border-r-0 sm:grid-cols-4">
            {facts.map((f, i) => (
              <div key={f._key ?? f.label} className="border-b border-r border-primary" style={{ height: L(2) }}>
                <p className="body4 px-3 uppercase tracking-wide !text-primary" style={{ lineHeight: L(1) }}>
                  {f.label}
                </p>
                <p className="body3 truncate px-3 font-bold" style={{ lineHeight: L(1) }}>
                  {f.value}
                </p>
              </div>
            ))}
          </RuledBox>
        </div>
      )}

      {/* Links + categories + tech, one row each */}
      {(links.length > 0 || (log.categories?.length ?? 0) > 0) && (
        <div className="flex flex-wrap items-center gap-x-4 px-4" style={{ minHeight: L(1) }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} target="_blank" className="body3 flex items-center hover:bg-secondary" style={{ height: L(1) }}>
              {l.label} ↗
            </Link>
          ))}
          {(log.categories ?? []).map((c) => (
            <Link key={c.slug ?? c.title} href={`/logs?category=${c.slug ?? c.title}`} className="body4 flex items-center gap-1 uppercase !text-primary hover:underline" style={{ height: L(1) }}>
              <span className="text-[16px]">{c.emoji}</span> {c.title}
            </Link>
          ))}
        </div>
      )}
      {log.techStacks?.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-2 px-4">
          {log.techStacks.map((t) => (
            <span key={t.label} className="flex items-center" style={{ height: L(1) }}>
              <span className="body4 border border-primary px-2 py-[2px] !text-primary">{t.label}</span>
            </span>
          ))}
        </div>
      )}

      {/* Hero */}
      {log.image?.asset?.url && (
        <>
          <Gap />
          <div className="px-4" style={{ height: L(16) }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc({ url: log.image.asset.url }, 2400)} alt={log.title} className="h-full w-full object-contain" />
          </div>
        </>
      )}
    </header>
  )
}

// ---------- page body ----------
const plain = (blocks?: any[] | null) =>
  (blocks ?? [])
    .map((b) => (b?.children ?? []).map((c: any) => c.text).join(""))
    .filter((t: string) => t.trim())
    .join(" ")

export const LogPost: React.FC<{ log: TLog }> = ({ log }) => {
  const lede = log.lede ?? plain(log.overview)
  let n = 0

  return (
    <article className={POST_ROOT_CLASS}>
      <Header log={log} lede={lede} />
      {(log.sections ?? []).map((s) => {
        const num = s.subsection ? null : ++n
        return (
          <div key={s._key} style={{ marginTop: L(s.subsection ? 1 : 2) }}>
            <Section section={s} n={num} />
          </div>
        )
      })}

      {(log.credits?.length ?? 0) > 0 && (
        <div style={{ marginTop: L(2) }}>
          <h2 className="body2 px-4 font-bold">Credits</h2>
          <Gap />
          <Credits items={log.credits!} />
        </div>
      )}
      <Gap lines={2} />
    </article>
  )
}

export { FactsRows }
