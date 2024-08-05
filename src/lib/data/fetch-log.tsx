import { TLog } from "@/types/log-types"
import { API_BASE_URL } from "../../../api"

export default async function fetchLog(slug: string) {
  const res = await fetch(`${API_BASE_URL}/api/logs/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }

  const data: TLog = await res.json()

  return data
}
