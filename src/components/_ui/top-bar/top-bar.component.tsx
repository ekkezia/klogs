
import React from "react"
import Searchbar from "../searchbar"

const TopBar: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 z-[11] flex h-line1 w-full border-b border-primary bg-tertiary sm:h-line1-sm">
      <div className={`h-full w-line1 border-r border-primary sm:w-line1-sm`} />

      <div className="flex-1 bg-tertiary">
        <Searchbar />
      </div>

      <div className={`h-full w-line1 border-l border-primary sm:w-line1-sm`} />
    </div>
  )
}

export default TopBar
