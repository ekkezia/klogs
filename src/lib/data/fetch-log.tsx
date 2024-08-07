// import 'server-only' // still being used in top-bar

import { sanityQueryConfig, TLog } from "@/types/log-types"
import { sanityFetch } from "@/sanity/client"

export default async function fetchLog(slug: string) {
  // const res = await fetch(`${API_BASE_URL}/api/logs/${slug}`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })

  // if (!res.ok) {
  //   throw new Error("❌ lib/data/fetch-log: Failed to fetch logs")
  // }

  // const data: TLog = await res.json()

  // return data
  try {
    const data: TLog = await sanityFetch<TLog>({
      query: sanityQueryConfig("fetchBy", "slug", slug),
    })

    // console.log(`⭐️ Data for ${slug}`, data)

    return data
  } catch (error) {
    console.error("❌ lib/data/fetch-log: Failed to fetch log", error)
  }
}
