import LinesBackground from "@/components/_ui/lines-background"
import LogsUrl from "@/components/_ui/logs-url"
import LogsTag from "@/components/_ui/logs-tag"
import LogsBlock from "@/components/_ui/logs-block"

import LogsIframe from "@/components/_ui/logs-iframe"
import fetchLog from "@/lib/data/fetch-log"
import fetchAllLogs from "@/lib/data/fetch-all-logs"

export async function generateStaticParams() {
  const logs = await fetchAllLogs()

  return logs.map((log) => ({
    slug: log.slug ?? "",
  }))
}

export default async function LogPage({ params }: { params: { slug: string } }) {
  const log = await fetchLog(params.slug)

  const tags = log?.techStacks?.map((tag) => (
    <div
      key={tag.label}
      className="h-line2 sm:h-line2-sm w-fit overflow-scroll text-ellipsis border-x border-primary px-4"
    >
      {tag.label}
    </div>
  ))

  console.log("⚙️ tags", tags)

  const featuredIns = log?.featuredIns?.map((tag) => (
    <div
      key={tag.label}
      className="h-line2 sm:h-line2-sm w-fit overflow-scroll text-ellipsis border-x border-primary px-4"
    >
      {tag.label}
    </div>
  ))
  console.log("⚙️ featuredIns sad", log)

  return (
    <>
      <div className="pointer-events-auto relative">
        <LinesBackground className="h-line2 sm:h-line2-sm" />
        <LogsUrl title="🌏 Project URL" href={log.projectUrl} />
        <LogsUrl title="🐈 Github" href={log.githubUrl} />

        {/* <LogsIframe url={log.projectUrl} /> */}

        <LogsBlock title="👀 Overview" blocks={log.overview} />
        <LogsTag title="📚 Tech Stack" content={tags} />
        <LogsBlock title="🖍️ Description" blocks={log.description} />

        <LogsTag title="⭐️ Featured In" content={featuredIns} />
        <LogsBlock title="📝 Notes" blocks={log.notes} />
      </div>
    </>
  )
}
