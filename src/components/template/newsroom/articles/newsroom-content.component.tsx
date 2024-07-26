import React from "react"
import NewsGrid from "./articles-block/news-grid.component"
import fetchAllArticles from "@/lib/data/fetch-all-articles"
import { formatDate } from "@/utils/dates"
import { sanityImage } from "@/sanity/image-builder"

export const NEWS_PER_PAGE = 6
export const DEFAULT_PAGE = 1

const NewsroomContent: React.FC = async () => {
  const articles = await fetchAllArticles()

  return (
    <div className="relative">
      {/* lines */}
      <div className="absolute w-full">
        <div className="h-[24px] w-full border-b border-primary"></div>
        <div className="h-[24px] w-full border-b border-primary"></div>
        <div className="h-[24px] w-full border-b border-primary"></div>
        <div className="h-[24px] w-full border-b border-primary"></div>
        <div className="h-[24px] w-full border-b border-primary"></div>
        <div className="h-[24px] w-full border-b border-primary"></div>
        <div className="h-[24px] w-full border-b border-primary"></div>
        <div className="h-[24px] w-full border-b border-primary"></div>

      </div>
      <div className="absolute">
        {articles.map((article) => {
          return (
            <div className="body1" key={article._id}>
              <div>{formatDate(article.date)}</div>
              <div>{article.title}</div>
              <div>{article.body}</div>
              <img src={sanityImage(article.image)} alt={article.title} />
            </div>
          )
        })}
      </div>
      <NewsGrid articles={[]} loading={false} />
      {/* <NewsPagination
      pagesCount={Math.ceil(totalCount / NEWS_PER_PAGE)}
      page={queryParams.page}
      onPageChange={handlePageChange}
      loading={countLoading}
    /> */}
    </div>
  )
}

export default NewsroomContent
