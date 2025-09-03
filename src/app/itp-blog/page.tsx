import React from "react"
import { LogsImageContextProvider } from "@/contexts/logs-image-context"
import LinesBackground from "@/components/_ui/lines-background"
import fetchAllItpClasses from '@/lib/data/fetch-all-itp-classes'
import { TItpClass } from '@/types/itp-class-types'
import LogsTitle from '@/components/_ui/logs-title'

const ItpBlogPage: React.FC = async () => {
  const itpClasses: TItpClass[] = await fetchAllItpClasses()

  if (!itpClasses) {
    return (
      <LogsImageContextProvider>
        <div className="relative">
          <LinesBackground className="h-line1 sm:h-line1-sm" />

          <div className="body1 absolute h-line1 w-full text-primary sm:h-line1-sm">No ITP classes found 😭</div>
        </div>
      </LogsImageContextProvider>
    )
  }

  return (
    <LogsImageContextProvider>
      <div className="relative">
        <LinesBackground className="h-line1 sm:h-line1-sm" />

        <div className="absolute w-full">
          {itpClasses.map((itpClass, idx) => {
            return <LogsTitle logParentSlug='itp-blog' log={itpClass} index={idx} key={idx} />
          })}
        </div>
      </div>
    </LogsImageContextProvider>
  )
}

export default ItpBlogPage
