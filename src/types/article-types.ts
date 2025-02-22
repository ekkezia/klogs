import { z } from "zod"

const TechStackSchema = z.object({
  label: z.string(),
  _type: z.string(),
})

const featuredInSchema = z.object({
  label: z.string(),
  _type: z.string(),
})

const ArticleBlockSchema = z.object({
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

const ArticleImageSchema = z.object({
  asset: z.object({
    _id: z.string().nullable(),
    url: z.string().nullable(),
  }),
})

export const ArticleSchema = z.object({
  _id: z.string(),
  date: z.string(),
  title: z.string(),
  image: ArticleImageSchema,
  projectUrl: z.string(),
  githubUrl: z.string().nullable(),
  overview: z.array(ArticleBlockSchema),
  techStacks: z.array(TechStackSchema),
  featuredIns: z.array(featuredInSchema),
  description: z.array(ArticleBlockSchema),
  notes: z.array(ArticleBlockSchema),
  slug: z.string(),
})

export type TArticleImage = z.infer<typeof ArticleImageSchema>
export type TArticleBlock = z.infer<typeof ArticleBlockSchema>

export type TArticle = z.infer<typeof ArticleSchema>

export const ArticlesSchema = z.array(ArticleSchema)

export type TArticles = z.infer<typeof ArticlesSchema>

export const ArticlesCountSchema = z.number()

export type TArticlesCount = z.infer<typeof ArticlesCountSchema>

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

export const COUNT_QUERY = `count(*[_type == "article"])`
