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
    <div>
      My Post: {params.log_id}
      <div>{log.title}</div>
      <div>{log.body}</div>
    </div>
  )
}
