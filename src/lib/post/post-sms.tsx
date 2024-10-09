"use server"

import { revalidatePath } from "next/cache"
import { API_BASE_URL } from "../../../api"

export default async function postSms(sms: string, typoSms: string, formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/api/sms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: formData.get("name"),
      email: formData.get("email"),
      date: Date.now(),
      sms: sms,
      typoSms: typoSms,
    }),
  })

  if (!res.ok) {
    throw new Error("❌ lib/data/post-sms: Failed to post SMS")
  }

  revalidatePath("api/sms")

  return res.json()
}
