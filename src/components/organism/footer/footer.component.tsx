import React from "react"

const currentYear = new Date().getFullYear()

const Footer: React.FC = () => {
  return (
    <div className="text-over relative flex h-full w-full flex-row items-center justify-between px-4">
      <p className="body3 overflow-scroll">{`Elizabeth Kezia Widjaja © ${currentYear} 🙂`}</p>
    </div>
  )
}

export default Footer
