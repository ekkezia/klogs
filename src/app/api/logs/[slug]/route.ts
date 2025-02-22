import { sanityFetch } from "@/sanity/client"
import { ArticleSchema } from "@/types/article-types"
import { LogSchema, sanityQueryConfig } from "@/types/log-types"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  const { slug } = params
  try {
    const res = await sanityFetch({
      query: sanityQueryConfig("fetchBy", 'slug', slug),
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
