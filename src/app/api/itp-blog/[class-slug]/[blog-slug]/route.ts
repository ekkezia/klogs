// 1. fetches all itp blog posts
// 2. filter it according to the class on the [slug]

import { sanityFetch } from '@/sanity/client'
import { sanityQueryConfig } from '@/types/itp-blog-types'
import { NextResponse } from "next/server"
import { z } from "zod"

export const revalidate = 0

export async function GET(
  request: Request,
  { params }: { params: { "blog-slug": string } }
) {
  const blogSlug = params["blog-slug"]

  try {
    const data = await sanityFetch({
      query: sanityQueryConfig("fetchBy", "blog-slug", blogSlug),
    }) as any[]

    // console.log("Requested blog slug:", blogSlug)
    // console.log("Sanity data:", data)

    return NextResponse.json(data[0])
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
