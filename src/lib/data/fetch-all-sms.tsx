// import "server-only"

import { TSms } from "@/types/sms-types"
import { API_BASE_URL } from "../../../api"

export default async function fetchAllSms() {
  const res = await fetch(`${API_BASE_URL}/api/sms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  })

  if (!res.ok) {
    const errorText = await res.text()

    console.error(`Failed to fetch: ${res.status} ${res.statusText} - ${errorText}`)

    throw new Error("❌ lib/data/fetch-all-sms: Failed to fetch all sms")
  }

  const data: TSms[] = await res.json()

  return data
}
