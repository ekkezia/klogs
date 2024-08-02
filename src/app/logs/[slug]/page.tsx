import LinesBackground from "@/components/_ui/lines-background"
import LogsUrl from "@/components/_ui/logs-url"
import LogsTag from "@/components/_ui/logs-tag"
import LogsBlock from "@/components/_ui/logs-block"

import LogsIframe from "@/components/_ui/logs-iframe"
import fetchAllArticles from "@/lib/data/fetch-all-articles"
import fetchArticle from "@/lib/data/fetch-article"

export async function generateStaticParams() {
  const logs = await fetchAllArticles()

  return logs.map((log) => ({
    slug: log.slug,
  }))
}

export default async function LogPage({ params }: { params: { slug: string } }) {
  const log = await fetchArticle(params.slug)

  const tags = log?.techStack?.map((tag) => (
    <div key={tag.label} className="border-r border-primary px-4" style={{ height: 36 }}>
      {tag.label}
    </div>
  ))

  const featuredIns = log?.featuredIn?.map((tag) => (
    <div key={tag.label} className="border-r border-primary px-4" style={{ height: 36 }}>

      {tag.label}
    </div>
  ))


  return (
    <>
      <div className="pointer-events-auto relative">
        <LinesBackground height={36} />
        <LogsUrl title="Project URL" href={log.projectUrl} />
        <LogsUrl title="Github" href={log.githubUrl} />

        {/* <LogsIframe url={log.projectUrl} /> */}

        <LogsBlock title="Overview" blocks={log.overview}  />
        <LogsTag title="Tech Stack" content={tags} />
        <LogsBlock title="Description" blocks={log.description}  />

        <LogsTag title="Featured In" content={featuredIns}  />
        <LogsBlock title="Notes" blocks={log.notes}  />
      </div>
    </>
  )
}
