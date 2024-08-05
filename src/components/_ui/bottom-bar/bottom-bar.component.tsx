import React from "react"
import Footer from "../../organism/footer/footer.component"
import ColorPicker from "../color-picker"

const BottomBar: React.FC = () => {
  return (
    <div className="h-line1 sm:h-line1-sm fixed bottom-0 left-0 z-10 flex w-full border-t border-primary">
      <div className={`w-line1 sm:w-line1-sm h-full border-r border-primary`} />

      <div className="flex-1 bg-tertiary">
        <Footer />
      </div>

      <div className={`w-line1 sm:w-line1-sm h-full border-l border-primary`}>
        {/* Color Picker */}
        <ColorPicker />
      </div>
    </div>
  )
}

export default BottomBar
