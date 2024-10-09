// import 'server-only'

import { createClient, SanityDocument, type QueryParams } from "next-sanity"

// const id = nreo0xtv
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
}) {
  return client.fetch<QueryResponse>(query, params, {
    next: {
      revalidate: process.env.NODE_ENV === "development" ? 30 : 30,
      tags,
    },
  })
}

export async function sanityCreate<QueryResponse>({ params }: { params: SanityDocument }): Promise<QueryResponse> {
  try {
    console.log('attempting to create document at sanity')
    const createdDocument = await client.create(params)
    console.log('created document on sanity', createdDocument)
    return createdDocument as QueryResponse
  } catch (error) {
    console.error("Error creating document:", error)
    throw error
  }
}
