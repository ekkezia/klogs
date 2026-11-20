import React from "react"
import LinesBackground from "@/components/_ui/lines-background"
import LogsCard from "@/components/_ui/logs-card"
import fetchAllLogs from "@/lib/data/fetch-all-logs"

const LogsPage: React.FC = async () => {
  const logs = await fetchAllLogs()

  if (!logs || logs.length === 0) {
    return (
      <div className="relative">
        <LinesBackground className="h-line1 sm:h-line1-sm" />
        <div className="body1 absolute h-line1 w-full text-primary sm:h-line1-sm">No logs found 😭</div>
      </div>
    )
  }

  return (
    <div className="relative">
      <LinesBackground className="h-line1 sm:h-line1-sm" />

      {/* Gaps and padding are one line tall so cards stay on the dashed grid */}
      <div className="relative grid grid-cols-1 gap-[36px] px-3 py-line1 sm:gap-[48px] sm:p-line1-sm md:grid-cols-2 xl:grid-cols-3">
        {logs.map((log, idx) => (
          <LogsCard log={log} index={idx} key={log._id ?? idx} />
        ))}
      </div>
    </div>
  )
}

export default LogsPage
