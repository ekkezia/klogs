import Link from "next/link"
import React from "react"

const LogsUrl: React.FC<{
  title: string
  href?: string | null
}> = ({ title, href }) => {
  if (!href) return <></>
  return (
    <Link
      className="h-line2 sm:h-line2-sm group body2 flex w-full cursor-pointer gap-4 overflow-x-scroll px-4 text-primary hover:bg-secondary"
      href={href}
      passHref
      target="_blank"
    >
      <div className="text-nowrap">{title}↗</div>
      <div className="text-primary opacity-0 duration-500 group-hover:opacity-100">{href}</div>
    </Link>
  )
}

export default LogsUrl
