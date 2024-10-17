import React from "react"
import Link from "next/link"

const MENU = Object.freeze([
  {
    name: "home",
    url: "/",
    symbol: "🏠",
  },
  {
    name: "note",
    url: "/logs",
    symbol: "🗒️",
  },
  {
    name: "sms",
    url: "/sms",
    symbol: "💌",
  },
])

const Menu: React.FC = () => {
  return (
    <div className="fixed top-1/2 flex -translate-y-1/2 transform flex-col items-center">
      {MENU.map(({ name, url, symbol }) => (
        <Link
          passHref
          href={url}
          key={name}
          className={`relative flex h-line1 w-line1 items-center justify-center border-b border-primary first:border-t hover:bg-secondary sm:h-line1-sm sm:w-line1-sm`}
        >
          <div className="body1 text-primary">{symbol}</div>
        </Link>
      ))}
    </div>
  )
}

export default Menu
