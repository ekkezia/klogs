import React from "react"
import { LogsImageContextProvider } from "@/contexts/logs-image-context"
import LogsImage from "@/components/_ui/logs-image"
import LogsTitle from "@/components/_ui/logs-title"
import LinesBackground from "@/components/_ui/lines-background"
import fetchAllLogs from "@/lib/data/fetch-all-logs"

const LogsPage: React.FC = async () => {
  const logs = await fetchAllLogs()

  if (!logs) {
    return (
      <LogsImageContextProvider>
        <div className="relative">
          <LinesBackground className="h-line1 sm:h-line1-sm" />

          <div className="absolute w-full">No logs found 😭</div>
        </div>
      </LogsImageContextProvider>
    )
  }

  return (
    <LogsImageContextProvider>
      <div className="relative">
        <LinesBackground className="h-line1 sm:h-line1-sm" />

        <div className="absolute w-full">
          {logs.map((log, idx) => {
            return <LogsTitle log={log} index={idx} key={idx} />
          })}
        </div>
        {/* Image */}
        <LogsImage className="fixed left-1/4 top-1/4 sm:left-1/2" />
      </div>
    </LogsImageContextProvider>
  )
}

export default LogsPage
