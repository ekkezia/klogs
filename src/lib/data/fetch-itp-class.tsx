import 'server-only'

import { API_BASE_URL } from '../../../api'
import { TItpClass } from '@/types/itp-class-types'

export default async function fetchItpClass(classSlug: string) {
  const res = await fetch(`${API_BASE_URL}/api/itp-blog/${classSlug}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })

  const data = await res.json()

  if (!res.ok) {
    return []
    // throw new Error("❌ Failed to fetch classes")
  }

  return data as TItpClass[]
}
