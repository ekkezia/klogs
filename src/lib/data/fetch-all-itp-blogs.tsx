import 'server-only'

import { API_BASE_URL } from '../../../api'
import { TItpBlogs } from '@/types/itp-blog-types'

export default async function fetchAllItpBlogs() {
    const res = await fetch(`${API_BASE_URL}/api/itp-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  )

  if (!res.ok) {
    throw new Error("❌lib/data/fetch-all-itp-blogs: Failed to fetch logs")
  }

  const data: TItpBlogs = await res.json()

  return data
}
