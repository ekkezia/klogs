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
      className="fixed bottom-0 left-0 z-[Z_INDEX_FIXED_BARS] w-screen border-t border-primary bg-white"
      style={{ height: HORIZONTAL_BAR_HEIGHT }}
    >
      <div className="flex w-full" style={{ maxWidth: MAXWIDTH, height: HORIZONTAL_BAR_HEIGHT }}>
        <div
          className={`h-full border-r border-primary`}
          style={{ width: OUTER_BAR_WIDTH }}
        />

        <div
          className={`h-full border-r border-primary ${INNER_BAR_WIDTH} ${INNER_BAR_WIDTH_LG} ${INNER_BAR_WIDTH_SM}`}
          style={{
            width: INNER_BAR_WIDTH,
          }}
        />

        <div className="flex-1">
          <Footer />
        </div>

        <div
          className={`h-full border-l border-primary ${INNER_BAR_WIDTH} ${INNER_BAR_WIDTH_LG} ${INNER_BAR_WIDTH_SM}`}
          style={{ width: INNER_BAR_WIDTH }}
        />

        <div
          className={`h-full border-l border-primary ${OUTER_BAR_WIDTH} ${OUTER_BAR_WIDTH_LG} hidden lg:block`}
          style={{ width: OUTER_BAR_WIDTH }}
        />
      </div>
    </div>
  )
}

export default BottomBar
