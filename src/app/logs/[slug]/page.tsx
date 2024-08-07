import LinesBackground from "@/components/_ui/lines-background"
import LogsUrl from "@/components/_ui/logs-url"
import LogsTag from "@/components/_ui/logs-tag"
import LogsBlock from "@/components/_ui/logs-block"

import LogsIframe from "@/components/_ui/logs-iframe"
import fetchLog from "@/lib/data/fetch-log"
import fetchAllLogs from "@/lib/data/fetch-all-logs"

export async function generateStaticParams() {
  try {
    const logs = await fetchAllLogs()
    return logs.map((log) => ({
      slug: log.slug ?? "call-me",
    }))
  } catch (error) {
    console.error("❌ /logs/[slug]: Failed to fetch all logs:", error)
    return []
  }
}

export default async function LogPage({ params }: { params: { slug: string } }) {
  const log = await fetchLog(params.slug)

  const tags = log?.techStacks?.map((tag) => (
    <div
      key={tag.label}
      className="h-line2 w-fit overflow-scroll text-ellipsis border-x border-primary px-4 sm:h-line2-sm"
    >
      {tag.label}
    </div>
  ))

  const featuredIns = log?.featuredIns?.map((tag) => (
    <a href={tag.url} target="_blank" key={tag.label}>
      <div className="h-line2 w-fit overflow-scroll text-ellipsis border-x border-primary px-4 duration-1000 hover:blur-[2px] sm:h-line2-sm">
        {tag.label}
        {tag.url && "↗"}
      </div>
    </a>
  ))

  return (
    <>
      <div className="relative">
        <LinesBackground className="h-line2 sm:h-line2-sm" />
        <div className="z-2 pointer-events-auto">
          <LogsUrl title="🌏 Project URL" href={log.projectUrl} />
          <LogsUrl title="🐈 Github" href={log.githubUrl} />

          <LogsIframe url={log.projectUrl} />

          <LogsBlock title="👀 Overview" blocks={log.overview} />
          <LogsTag title="📚 Tech Stack" content={tags} />
          <LogsBlock title="🖍️ Description" blocks={log.description} />

          <LogsTag title="⭐️ Featured In" content={featuredIns} />
          <LogsBlock title="📝 Notes" blocks={log.notes} />
        </div>
      </div>
    </>
  )
}
