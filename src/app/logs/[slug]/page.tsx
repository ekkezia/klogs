import dynamic from "next/dynamic"

import LinesBackground from "@/components/_ui/lines-background"
import LogsUrl from "@/components/_ui/logs-url"
import LogsTag from "@/components/_ui/logs-tag"
import LogsBlock from "@/components/_ui/logs-block"

import fetchLog from "@/lib/data/fetch-log"
import fetchAllLogs from "@/lib/data/fetch-all-logs"
import { Suspense } from "react"

const LogsIframe = dynamic(() => import("@/components/_ui/logs-iframe"), { ssr: false })

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const logs = await fetchAllLogs()

  if (!logs) {
    return []
  }

  return logs?.map((log) => ({
    slug: log.slug ?? "call-me",
  }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const log = await fetchLog(params.slug)

  return {
    title: log?.title,
  }
}

export default async function LogPage({ params }: { params: { slug: string } }) {
  const log = await fetchLog(params.slug)

  if (!log) {
    return (
      <div className="relative">
        <LinesBackground className="h-line2 sm:h-line2-sm" />
        <div className="z-2 body2 pointer-events-auto h-line2 text-primary sm:h-line2-sm">No log found 😭</div>
      </div>
    )
  }

  const tags = log.techStacks?.map((tag) => (
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
    <div className="relative">
      <LinesBackground className="h-line2 sm:h-line2-sm" />
      <div className="z-2 pointer-events-auto">
        <LogsUrl title="🌏 Project URL" href={log.projectUrl} />
        <LogsUrl title="🐈 Github" href={log.githubUrl} />

        <Suspense fallback={<>⏳</>}>
          <LogsIframe url={log.projectUrl} />
        </Suspense>

        <LogsBlock title="👀 Overview" blocks={log.overview} />
        <LogsTag title="📚 Tech Stack" content={tags} />
        <LogsBlock title="🖍️ Description" blocks={log.description} />

        <LogsTag title="⭐️ Featured In" content={featuredIns} />
        <LogsBlock title="📝 Notes" blocks={log.notes} />
      </div>
    </div>
  )
}
