// 1. fetches all itp blog posts
// 2. filter it according to the class on the [slug]

import { sanityFetch } from '@/sanity/client'
import { sanityQueryConfig } from '@/types/itp-blog-types'
import { NextResponse } from "next/server"
import { z } from "zod"

export const revalidate = 0

export async function GET(request: Request, { params }: { params: { "class-slug": string } }) {
  const classSlug = params['class-slug']
  try {
    const res = await sanityFetch({
      query: sanityQueryConfig("fetchBy", 'class-slug', classSlug),
    })

    // const validated = LogSchema.parse(res)

    return NextResponse.json(res)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
