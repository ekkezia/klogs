import { sanityCreate, sanityFetch } from "@/sanity/client"
import { CreateSanityDocument } from "@/types/sanity-types"
import { TSmsInput } from "@/types/sms-types"
import { sanityQueryConfig } from "@/types/sms-types"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"
import { z } from "zod"

export async function GET() {
  try {
    const res = await sanityFetch({
      query: sanityQueryConfig("fetchAll"),
    })

    // const validated = ArticlesSchema.parse(res);
    // revalidatePath('/api/sms')

    return NextResponse.json(res)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to fetch SMS" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const data: TSmsInput = await req.json()

    const newDocument: CreateSanityDocument = {
      _type: "sms", // document name
      name: data.name,
      email: data.email,
      date: data.date,
      sms: data.sms,
      typoSms: data.typoSms,
    }

    const res = await sanityCreate({
      params: newDocument,
    })

    revalidatePath("api/sms")
    return NextResponse.json({ message: "Received data successfully", res })
  } catch (error) {
    console.error("Error in POST request:", error)

    // Handle errors
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
