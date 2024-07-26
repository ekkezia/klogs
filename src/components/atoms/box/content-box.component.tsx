import React from "react"
import { HORIZONTAL_BAR_HEIGHT, INNER_BAR_WIDTH } from "@/styles/shared"
import { twMerge } from "tailwind-merge"

interface IContentBoxProps {
  padded?: boolean
  verticalContent?: React.ReactNode
  mainContent: React.ReactNode
  noBorderBottom?: boolean
  sticky?: boolean
}

const ContentBox: React.FC<IContentBoxProps> = ({ padded, verticalContent, mainContent, noBorderBottom, sticky }) => {
  return (
    <div
      className={twMerge(
        sticky ? "sticky z-10" : "relative",
        noBorderBottom ? "" : "border-b border-b-primary",
        "flex h-fit w-full"
      )}
      style={{
        top: sticky ? HORIZONTAL_BAR_HEIGHT : "",
      }}
    >
      <div
        className="flex justify-end border-r border-primary"
        style={{
          width: INNER_BAR_WIDTH,
          minWidth: INNER_BAR_WIDTH,
        }}
      >
        {verticalContent ?? ""}
      </div>

      <div
        className={twMerge(padded ? "p-2" : "p-0")}
        style={{
          width: `calc(100% - ${INNER_BAR_WIDTH})`,
        }}
      >
        {mainContent}
      </div>
    </div>
  )
}

export default ContentBox
