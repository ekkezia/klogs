import { z } from "zod"

export const ArticleSchema = z.object({
  _id: z.string(),
  date: z.string(),
  title: z.string(),
  body: z.string(),
  image: z.object({
    asset: z.object({
      _ref: z.string(),
      _type: z.string(),
    }),
    _type: z.string(),
  }),
})

const ArticleImageSchema = z.object({
  asset: z.object({
    _ref: z.string(),
    _type: z.string(),
  }),
  _type: z.string(),
})

export type TArticleImage = z.infer<typeof ArticleImageSchema>

export type TArticle = z.infer<typeof ArticleSchema>

export const ArticlesSchema = z.array(ArticleSchema)

export type TArticles = z.infer<typeof ArticlesSchema>

export const ArticlesCountSchema = z.number()

export type TArticlesCount = z.infer<typeof ArticlesCountSchema>

export const ARTICLE_SANITY_QUERY = `*[_type == "article"]{
      _id, 
      date, 
      title, 
      body, 
      image, 
      slug
    }|order(date desc)`

export const COUNT_QUERY = `count(*[_type == "article"])`
