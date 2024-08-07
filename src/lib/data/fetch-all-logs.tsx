import 'server-only'

import { sanityQueryConfig, TLogs } from "@/types/log-types"
import { sanityFetch } from "@/sanity/client"

export default async function fetchAllLogs() {
  //   const res = await fetch(`${API_BASE_URL}/api/logs`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     next: { revalidate: 10 },
  //   },
  // )

  // if (!res.ok) {
  //   throw new Error("❌lib/data/fetch-all-logs: Failed to fetch logs")
  // }

  // const data: TLogs = await res.json()

  // return data

  try {
    const data: TLogs = await sanityFetch<TLogs>({
      query: sanityQueryConfig("fetchAll"),
    })

    // console.log("⭐️ Data for all logs", data)
    
    return data
  } catch (error) {
    console.error("❌ lib/data/fetch-all-logs: Failed to fetch logs", error)
  }
}
