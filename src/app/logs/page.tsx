import React from "react"
import { LogsImageContextProvider } from "@/contexts/logs-image-context"
import LogsImage from "@/components/_ui/logs-image"
import LogsTitle from "@/components/_ui/logs-title"
import LinesBackground from "@/components/_ui/lines-background"
import fetchAllLogs from "@/lib/data/fetch-all-logs"

const LogsPage: React.FC = async () => {
  const articles = await fetchAllLogs()

  return (
    <LogsImageContextProvider>
      <div className="relative">
        <LinesBackground className="h-line1 sm:h-line1-sm" />

        <div className="absolute w-full">
          {articles.map((article, idx) => {
            return <LogsTitle log={article} index={idx} key={idx} />
          })}
        </div>
        {/* Image */}
        <LogsImage className="fixed left-1/4 sm:left-1/2 top-1/4" />
      </div>
    </LogsImageContextProvider>
  )
}

export default LogsPage
