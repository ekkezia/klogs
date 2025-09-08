import { z } from 'zod'
import { ItpClassSchema } from './itp-class-types'

// For the itp_blog (subfolder/file)
export const ItpBlogSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: z.object({
    current: z.string(),
  }),
  projectUrl: z.string().optional(),
  githubUrl: z.string().optional(),
  date: z.string(),
  tags: z.array(z.string()).optional(),
  class: ItpClassSchema, // reference to class
  body: z.array(
    z.union([
      z.object({
        _type: z.literal("block"),
        style: z.string().optional(),
        children: z.array(
          z.object({
            _key: z.string(),
            _type: z.literal("span"),
            text: z.string(),
            marks: z.array(z.string()).optional(),
          })
        ),
      }),
      z.object({
        _type: z.literal("image"),
        asset: z.object({
          _ref: z.string(),
          _type: z.literal("reference"),
        }),
        alt: z.string().optional(),
      }),
    ])
  ),
})

export type TItpBlog = z.infer<typeof ItpBlogSchema>

export const Itpitp_blogsSchema = z.array(ItpBlogSchema)
export type TItpBlogs = z.infer<typeof Itpitp_blogsSchema>

// For counting documents
export const Itpitp_blogCountSchema = z.number()
export type TItpBlogCount = z.infer<typeof Itpitp_blogCountSchema>

// -----------------------------
// INPUT SCHEMA (for creating new)
// -----------------------------
export const Itpitp_blogInputSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.date(),
  tags: z.array(z.string()).optional(),
  classId: z.string(), // reference to class _id
  body: z.any(), // keep flexible for PortableText editor input
})

export type TItpBlogInput = z.infer<typeof Itpitp_blogInputSchema>

// Optimistic type (without _id/date from server)
export type TOptimisticItpitp_blog = Omit<TItpBlog, "_id" | "date">

// -----------------------------
// GROQ QUERIES
// -----------------------------
export const sanityQueryConfig = (
  type: "count" | "fetchAll" | "fetchBy",
  fetchBy?: string | null,
  fetchByEqualsTo?: string | null
) => {
  let query: string

  const fields = `{
    _id,
    title,
    projectUrl,
    githubUrl,
    slug,
    date,
    tags,
    "class": class->{_id, title, slug},
    body[]{
      ...,
      _type == "image" => {
        ...,
        "alt": alt,
        "asset": asset->
      }
    }
  }`

  switch (type) {
    case "count":
      query = `count(*[_type == "itp_blog"])`
      break
    case "fetchAll":
      query = `*[_type == "itp_blog"]` + fields
      break
    case "fetchBy":
      // filter by itp class name
      if (fetchBy === "class-slug") {
        query = `*[_type == "itp_blog" && class->slug.current == "${fetchByEqualsTo}"]` + fields
      } else if (fetchBy === "blog-slug") {
        query = `*[_type == "itp_blog" && slug.current == "${fetchByEqualsTo}"]` + fields
      } else {
        query = `*[_type == "itp_blog" && ${fetchBy} == "${fetchByEqualsTo}"]` + fields
      }
      break
  }

  return query
}

export const COUNT_QUERY = `count(*[_type == "itp_blog"])`
