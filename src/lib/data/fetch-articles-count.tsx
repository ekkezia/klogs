import { TArticlesCount } from "@/types/article-types"
import { API_BASE_URL } from "../../../api"
// import "server-only"

export default async function fetchArticlesCount() {
  const res = await fetch(`${API_BASE_URL}/api/articles/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch articles count")
  }

  const data: TArticlesCount = await res.json()
  
  return data
}
