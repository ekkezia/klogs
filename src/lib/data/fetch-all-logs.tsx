import 'server-only'

import { sanityFetch } from "@/sanity/client"
import { TLogs, sanityQueryConfig } from "@/types/log-types"

// Query Sanity directly from the server instead of calling our own /api/logs over HTTP.
// (The HTTP hop went to API_BASE_URL, which on preview deployments points at the
// production site — so previews were reading production's query, not this branch's.)
export default async function fetchAllLogs() {
  const data = await sanityFetch<TLogs>({ query: sanityQueryConfig("fetchAll") })

  if (!data) {
    throw new Error("❌lib/data/fetch-all-logs: Failed to fetch logs")
  }

  return data
}
