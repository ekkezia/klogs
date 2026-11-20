import Link from "next/link"
import React from "react"
import { TLogCategory } from "@/types/log-types"

// Full-width row of cells, styled like the side menu: each cell is one ruled line tall,
// split by vertical borders, emoji + label. Single-select; "All" clears the filter.
const LogsCategoryBar: React.FC<{
  categories: (TLogCategory & { count: number })[]
  active?: string
  total: number
}> = ({ categories, active, total }) => {
  const cell = (key: string, href: string, emoji: string, label: string, count: number, isActive: boolean) => (
    <Link
      key={key}
      href={href}
      scroll={false}
      aria-current={isActive ? "page" : undefined}
      className={`flex h-full min-w-max flex-1 items-stretch justify-start border-r border-primary last:border-r-0 duration-300 ${
        isActive ? "bg-primary" : "hover:bg-secondary"
      }`}
    >
      {/* Emoji gets its own square cell, like the side menu */}
      <span className="flex w-line1 shrink-0 items-center justify-center border-r border-primary text-[20px] leading-none sm:w-line1-sm sm:text-[26px]">
        {emoji}
      </span>
      <span className="flex items-center gap-2 px-3">
        <span className={`body3 whitespace-nowrap ${isActive ? "!text-tertiary" : ""}`}>{label}</span>
        <span className={`body4 ${isActive ? "!text-tertiary" : "!text-primary"}`}>{count}</span>
      </span>
    </Link>
  )

  return (
    <nav className="relative flex h-line1 w-full overflow-x-auto border-b border-primary bg-tertiary sm:h-line1-sm">
      {cell("all", "/logs", "🗂️", "All", total, !active)}
      {categories.map((c) => {
        const key = c.slug ?? c.title
        return cell(key, `/logs?category=${encodeURIComponent(key)}`, c.emoji ?? "•", c.title, c.count, active === key)
      })}
    </nav>
  )
}

export default LogsCategoryBar
