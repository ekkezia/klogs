import { z } from "zod"

const TechStackSchema = z.object({
  label: z.string(),
  url: z.string(),
})

const featuredInSchema = z.object({
  label: z.string(),
  url: z.string(),
})

const LogBlockSchema = z.object({
  _key: z.string(),
  markDefs: z.array(z.any()),
  children: z.array(
    z.object({
      marks: z.array(z.any()),
      text: z.string(),
      _key: z.string(),
      _type: z.string(),
    })
  ),
  _type: z.string(),
  style: z.string(),
})

const LogImageSchema = z.object({
  asset: z.object({
    _id: z.string().nullable(),
    url: z.string().nullable(),
  }),
})

export const LogSchema = z.object({
  _id: z.string(),
  date: z.string(),
  title: z.string(),
  image: LogImageSchema,
  projectUrl: z.string(),
  githubUrl: z.string().nullable(),
  overview: z.array(LogBlockSchema),
  techStacks: z.array(TechStackSchema),
  featuredIns: z.array(featuredInSchema),
  description: z.array(LogBlockSchema),
  notes: z.array(LogBlockSchema),
  slug: z.string(),
})

export type TLogImage = z.infer<typeof LogImageSchema>
export type TLogBlock = z.infer<typeof LogBlockSchema>

export type TLog = z.infer<typeof LogSchema>

export const LogsSchema = z.array(LogSchema)

export type TLogs = z.infer<typeof LogsSchema>

export const LogsCountSchema = z.number()

export type TLogsCount = z.infer<typeof LogsCountSchema>

export const sanityQueryConfig = (
  type: "count" | "fetchAll" | "fetchBy",
  fetchBy?: string | null,
  fetchByEqualsTo?: string | null
) => {
  let query: string

  const fields = `{
    _id,
    date,
    title,
    image {
      asset->{
        _id,
        url
      }
    },    
    projectUrl,
    githubUrl,
    overview,
    techStacks[]{
      label,
      url
    },
    featuredIns[]{
      label,
      url
    },
    description,
    notes,
    slug
}`

  switch (type) {
    case "count":
      query = `count(*[_type == "article"])`
      break
    case "fetchAll":
      query = `*[_type == "article"]` + fields
      break
    case "fetchBy":
      query = `*[_type == "article" && ${fetchBy} == "${fetchByEqualsTo}"]` + fields + "[0]"
      break
  }

  return query
}

export const COUNT_QUERY = `count(*[_type == "Log"])`
