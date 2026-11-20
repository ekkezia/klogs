import React from "react"
import LogsCategoryBar from "@/components/_ui/logs-category-bar"
import { TLogCategory } from "@/types/log-types"
import LinesBackground from "@/components/_ui/lines-background"
import LogsCard from "@/components/_ui/logs-card"
import fetchAllLogs from "@/lib/data/fetch-all-logs"

const LogsPage = async ({ searchParams }: { searchParams?: { category?: string } }) => {
  const logs = await fetchAllLogs()

  if (!logs || logs.length === 0) {
    return (
      <div className="relative">
        <LinesBackground className="h-line1 sm:h-line1-sm" />
        <div className="body1 absolute h-line1 w-full text-primary sm:h-line1-sm">No logs found 😭</div>
      </div>
    )
  }

  // Collect every category used by at least one log (a log can have several)
  const byKey = new Map<string, TLogCategory & { count: number }>()
  for (const log of logs) {
    for (const c of log.categories ?? []) {
      const key = c.slug ?? c.title
      const prev = byKey.get(key)
      byKey.set(key, { ...c, count: (prev?.count ?? 0) + 1 })
    }
  }
  const categories = Array.from(byKey.values())
  const active = searchParams?.category
  const shown = active ? logs.filter((l) => (l.categories ?? []).some((c) => (c.slug ?? c.title) === active)) : logs

  return (
    <div className="relative">
      <LinesBackground className="h-line1 sm:h-line1-sm" />

      {/* Category filter — one ruled row; only shows once logs have categories */}
      {categories.length > 0 && <LogsCategoryBar categories={categories} active={active} total={logs.length} />}

      {/* Gaps and padding are one line tall so cards stay on the dashed grid */}
      <div className="relative grid grid-cols-1 gap-[36px] px-3 py-line1 sm:gap-[48px] sm:p-line1-sm md:grid-cols-2 lg:grid-cols-1">
        {shown.map((log, idx) => (
          <LogsCard log={log} index={logs.indexOf(log)} key={log._id ?? idx} />
        ))}
      </div>
    </div>
  )
}

export default LogsPage
