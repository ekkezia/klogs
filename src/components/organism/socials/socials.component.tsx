'use client'

import React from "react"
import Link from "next/link"
import Tippy from '@tippyjs/react'

const SOCIAL_LINKS = Object.freeze([
  {
    name: "Email",
    url: "mailto:e.kezia@gmail.com",
    symbol: "E",
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/in/elizabeth-kezia-w-622897151",
    symbol: "L",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/ekezia",
    symbol: "I",
  },
  {
    name: "Photography",
    url: "https://e-kezia.com",
    symbol: "Z",
  },
  {
    name: "Github",
    url: "https://github.com/ekkezia",
    symbol: "K",
  },
])

const Socials: React.FC = () => {
  return (
    <div className="fixed top-1/2 flex -translate-y-1/2 transform flex-col items-center">
      {SOCIAL_LINKS.map(({ name, url, symbol }) => (
          <Tippy
            theme="custom"
            content={
              <div className="h-fit w-fit shadow">
                <p className="body3 text-primary">{name}</p>
              </div>
            }
            onHidden={(instance) => {
              instance.unmount()
            }}
            placement="right"
            key={name}
          >
        <Link
          passHref
          href={url}
          target="_blank"
          rel="noreferrer"
          key={name}
          className={`w-line1 sm:w-line1-sm h-line1 sm:h-line1-sm relative flex items-center justify-center border-b border-primary first:border-t hover:bg-secondary`}
        >
          <div className="body1 text-primary">{symbol}</div>
        </Link>
        </Tippy>
      ))}
    </div>
  )
}

export default Socials
