import React from "react"
import fetchAllArticles from "@/lib/data/fetch-all-articles"
import { LogsImageContextProvider } from "@/contexts/logs-image-context"
import LogsImage from "@/components/_ui/logs-image"
import LogsTitle from "@/components/_ui/logs-title"

export const NEWS_PER_PAGE = 6
export const DEFAULT_PAGE = 1

const LogsPage: React.FC = async () => {
  const articles = await fetchAllArticles()

  return (
    <LogsImageContextProvider>
      <div className="relative">
        <div className="absolute w-full">
          {articles.map((article, idx) => {
            return <LogsTitle article={article} index={idx} key={idx} />
          })}
        </div>
        {/* Image */}
        <LogsImage className="fixed right-[10vw] top-1/2" />
      </div>
    </LogsImageContextProvider>
  )
}

export default LogsPage
