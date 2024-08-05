import { TLogs } from "@/types/log-types"
import { API_BASE_URL } from "../../../api"

export default async function fetchAllLogs() {
  const res = await fetch(`${API_BASE_URL}/api/logs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 10 },
  },
)

  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }

  const data: TLogs = await res.json()

  return data
}
