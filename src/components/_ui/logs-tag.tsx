import React from "react"

const LogsTag: React.FC<{
  title: string
  content?: string | React.ReactNode | null | undefined
}> = ({ title, content }) => {
  console.log('content', title, content)
  return (
    <>
      <div className="body2 border-b border-primary px-4 text-primary" style={{ height: 36 }}>
        {title}
      </div>

      <div className="body2 flex flex-wrap border-b border-primary px-4 text-secondary">{content}</div>
    </>
  )
}

export default LogsTag
