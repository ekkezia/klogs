import LinesBackground from "@/components/_ui/lines-background"
import LogTitleDynamic from '@/components/_ui/log-title-dynamic'
import LogsBlock from '@/components/_ui/logs-block'
import LogsUrl from '@/components/_ui/logs-url'
import fetchAllItpBlogs from '@/lib/data/fetch-all-itp-blogs'
import fetchItpBlog from '@/lib/data/fetch-itp-blog'

export const dynamic = "force-dynamic";

export const revalidate = 0

export async function generateStaticParams(): Promise<{ "class-slug": string; "blog-slug": string }[]> {
  const itpBlogs = await fetchAllItpBlogs()

  return itpBlogs.map((blog) => ({
    "class-slug": blog.class?.slug?.current ?? "",
    "blog-slug": blog.slug.current,
  }))
}

export async function generateMetadata({ params }: { params: { "blog-slug": string } }) {
  return {
    title: `ITP Blogs for ${params["blog-slug"]}`,
  }
}

export default async function ItpBlogByClassPage({ params }: { params: { "class-slug": string; "blog-slug": string } }) {
  const itpBlog = await fetchItpBlog(params["class-slug"], params["blog-slug"])

  if (!itpBlog || Array.isArray(itpBlog)) {
    return (
      <div className="relative">
        <LinesBackground className="h-line2 sm:h-line2-sm" />
        <div className="z-2 body2 pointer-events-auto h-line2 text-primary sm:h-line2-sm">Nothing written yet in this blog 😭</div>
      </div>
    )
  }

    console.log('itp url', itpBlog)

  return (
    <div className="relative">
      <LinesBackground className="h-line2 sm:h-line2-sm" />
      <div className="z-2 pointer-events-auto">
        <LogTitleDynamic title={itpBlog.title} />

        <LogsUrl title="🌏 Project URL" href={itpBlog.projectUrl} />
        <LogsUrl title="🐈 Github" href={itpBlog.githubUrl} />

        <LogsBlock title="🖍️ Notes" blocks={itpBlog.body} />

      </div>
    </div>
  )
}
