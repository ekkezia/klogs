'use client'

import React from "react"
import Link from "next/link"
import Tippy from '@tippyjs/react'

const MENU = Object.freeze([
  {
    name: "Home",
    url: "/",
    symbol: "🏠",
  },
  {
    name: "Logs",
    url: "/logs",
    symbol: "🗒️",
  },
  {
    name: "SMS",
    url: "/sms",
    symbol: "💌",
  },
  {
    name: "ITP Blog",
    url: "/itp-blog",
    symbol: "🟪",
  },
])

const Menu: React.FC = () => {
  return (
    <div className="fixed top-1/2 flex -translate-y-1/2 transform flex-col items-center">
      {MENU.map(({ name, url, symbol }) => (
        <Tippy
            theme="custom"
            content={
              <div className="h-fit w-fit shadow">
                <p className="body3 text-primary">{name}</p>
              </div>
            }
            placement="left"
            onHidden={(instance) => {
              instance.unmount()
            }}
            key={name}
          >
          <Link
            passHref
            href={url}
            key={name}
            className={`relative flex h-line1 w-line1 items-center justify-center border-b border-primary first:border-t hover:bg-secondary sm:h-line1-sm sm:w-line1-sm`}
            data-tooltip-id="my-tooltip" data-tooltip-content={name}
          >
            <div className="body1 text-primary">{symbol}</div>
          </Link>
        </Tippy>
      ))}
    </div>
  )
}

export default Menu
