import React from "react"
import Link from "next/link"

const SOCIAL_LINKS = Object.freeze([
  {
    name: "email",
    url: "mailto:e.kezia@gmail.com",
    symbol: "E",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/company/parallelchain-lab",
    symbol: "L",
  },
  {
    name: "instagram",
    url: "https://instagram.com/ekezia",
    symbol: "I",
  },
  {
    name: "portfolio",
    url: "https://e-kezia.com",
    symbol: "Z",
  },
  {
    name: "github",
    url: "https://github.com/parallelchain-io",
    symbol: "K",
  },
])

const Socials: React.FC = () => {
  return (
    <div className="fixed top-1/2 flex -translate-y-1/2 transform flex-col items-center">
      {SOCIAL_LINKS.map(({ name, url, symbol }) => (
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
      ))}
    </div>
  )
}

export default Socials
