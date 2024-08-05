import React from "react"

const LogsTag: React.FC<{
  title: string
  content?: string | React.ReactNode | null | undefined
}> = ({ title, content }) => {
  return (
    <div className="body2 flex flex-wrap px-4 text-primary">
      {title}
      <div className="flex flex-wrap px-4 text-secondary">{content}</div>
    </div>
  )
}

export default LogsTag
