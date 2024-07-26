import { TArticle } from "@/types/article-types"
import { API_BASE_URL } from "../../../api"

export default async function fetchArticle(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/article/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }

  const data: TArticle = await res.json()

  return data
}
