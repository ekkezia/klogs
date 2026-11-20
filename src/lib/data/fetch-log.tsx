import 'server-only'

import { sanityFetch } from "@/sanity/client"
import { TLog, sanityQueryConfig } from "@/types/log-types"

// Direct Sanity query (see fetch-all-logs.tsx for why we skip /api/logs/[slug]).
export default async function fetchLog(slug: string) {
  return sanityFetch<TLog | null>({ query: sanityQueryConfig("fetchBy", "slug", slug) })
}
