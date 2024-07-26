import React from "react"
import {
  HORIZONTAL_BAR_HEIGHT,
  MAXWIDTH,
  INNER_BAR_WIDTH,
  OUTER_BAR_WIDTH,
  INNER_BAR_WIDTH_SM,
  OUTER_BAR_WIDTH_LG,
  INNER_BAR_WIDTH_LG,
} from "@/styles/shared"
import Footer from "../../organism/footer/footer.component"

const BottomBar: React.FC = () => {
  return (
    <div
      className="fixed bottom-0 left-0 z-10 flex w-full border-t border-primary"
      style={{ height: HORIZONTAL_BAR_HEIGHT }}
    >
      <div className={`h-full border-r border-primary`} style={{ width: OUTER_BAR_WIDTH }} />

      <div className="flex-1 bg-white">
        <Footer />
      </div>

      <div className={`h-full border-l border-primary`} style={{ width: OUTER_BAR_WIDTH }} />
    </div>
  )
}

export default BottomBar
