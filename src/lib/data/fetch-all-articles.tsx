import { TArticles } from "@/types/article-types"
import { API_BASE_URL } from "../../../api"

export default async function fetchAllArticles() {
  const res = await fetch(`${API_BASE_URL}/api/articles`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }

  const data: TArticles = await res.json()

  return data
}
