import LinesBackground from '@/components/_ui/lines-background'
import fetchAllArticles from "@/lib/data/fetch-all-articles"
import fetchArticle from "@/lib/data/fetch-article"

export async function generateStaticParams() {
  const logs = await fetchAllArticles()

  return logs.map((log) => ({
    log_id: log._id,
  }))
}

export default async function LogPage({ params }: { params: { log_id: string } }) {
  const log = await fetchArticle(params.log_id)

  return (
    <div className="relative pointer-events-none">
      <LinesBackground />
      <div className="h4 px-4">{log.title}</div>
      <div className="body2 px-4">{log.body}</div>
    </div>
  )
}
