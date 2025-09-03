import LinesBackground from "@/components/_ui/lines-background"
import LogsTitle from '@/components/_ui/logs-title'
import { LogsImageContextProvider } from '@/contexts/logs-image-context'
import fetchAllItpBlogs from '@/lib/data/fetch-all-itp-blogs'

export async function generateStaticParams(): Promise<{ "class-slug": string }[]> {
  const itpBlogs = await fetchAllItpBlogs()

  const uniqueClassSlugs = Array.from(
    new Set(itpBlogs.map((blog) => blog.class?.slug.current).filter(Boolean))
  )

  // console.log('🤍 uniqueClassSlugs', uniqueClassSlugs)

  // return in the required format
  return uniqueClassSlugs.map((slug) => ({
    "class-slug": slug!,
  }))
}

export async function generateMetadata({ params }: { params: { "class-slug": string } }) {
  return {
    title: `ITP Blogs for ${params["class-slug"]}`,
  }
}

export default async function ItpBlogByClassPage({ params }: { params: { "class-slug": string } }) {
  const itpBlogs = await fetchAllItpBlogs()
  const itpBlogsByClass = itpBlogs.filter((c) => c.class?.slug.current === params["class-slug"])

  if (!itpBlogs) {
    return (
      <div className="relative">
        <LinesBackground className="h-line2 sm:h-line2-sm" />
        <div className="z-2 body2 pointer-events-auto h-line2 text-primary sm:h-line2-sm">No blog found in this class 😭</div>
      </div>
    )
  }

  return (
      <LogsImageContextProvider>
        <div className="relative">
          <LinesBackground className="h-line1 sm:h-line1-sm" />

          <div className="absolute w-full">
            {itpBlogsByClass.map((blog, idx) => {
              return <LogsTitle logParentSlug={`itp-blog/${params["class-slug"]}`} log={blog} index={idx} key={idx} />
            })}
          </div>
        </div>
      </LogsImageContextProvider>
  )
}
