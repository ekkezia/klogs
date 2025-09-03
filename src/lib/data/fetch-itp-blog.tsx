import 'server-only'

import { API_BASE_URL } from '../../../api'
import { TItpBlog } from '@/types/itp-blog-types'

export default async function fetchItpBlog(classSlug: string, blogSlug: string) {
  const res = await fetch(`${API_BASE_URL}/api/itp-blog/${classSlug}/${blogSlug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    return []
    // throw new Error("❌lib/data/fetch-itp-blog: Failed to fetch logs")
  }

  const data: TItpBlog = await res.json()

  return data
}
