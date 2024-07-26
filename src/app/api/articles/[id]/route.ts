import { sanityFetch } from "@/sanity/client"
import { ArticleSchema } from "@/types/article-types"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const query = `*[_type == "article" && _id == "${id}"]{
    _id, 
    date, 
    title, 
    body, 
    image,
    slug
  }[0]`

  try {
    const res = await sanityFetch({
      query: query,
    })

    const validated = ArticleSchema.parse(res)

    return NextResponse.json(validated)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 })
  }
}
