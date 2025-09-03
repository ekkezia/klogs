import { z } from 'zod'

export const ItpClassSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
})

export type TItpClass = z.infer<typeof ItpClassSchema>

export const sanityQueryConfig = (
  type: "count" | "fetchAll" | "fetchBy",
  fetchBy?: string | null,
  fetchByEqualsTo?: string | null
) => {
  let query: string

  const fields = `{
    _id,
    title,
    slug,
  }`

  switch (type) {
    case "count":
      query = `count(*[_type == "itp_class"])`
      break
    case "fetchAll":
      query = `*[_type == "itp_class"]` + fields
      break
    case "fetchBy":
      query = `*[_type == "itp_class" && ${fetchBy} == "${fetchByEqualsTo}"]` + fields + "[0]"
      break
  }

  return query
}

export const COUNT_QUERY = `count(*[_type == "itp_class"])`
