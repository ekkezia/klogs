import 'server-only'

import { API_BASE_URL } from '../../../api'
import { TItpClass } from '@/types/itp-class-types'

export default async function fetchAllItpClasses() {
  const res = await fetch(`${API_BASE_URL}/api/itp-blog`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 10 },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error("❌ Failed to fetch classes")
  }

  return data as TItpClass[]
}
