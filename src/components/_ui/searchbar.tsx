"use client"

import { usePathname } from 'next/navigation'

const Searchbar: React.FC = () => {
  const pathname = usePathname()

  if (pathname == "/") {
    return <></>
  }
  return (
        <form>
          <input type="text" id="search" name="search" className="w-full h-[47px] caret-none px-4 body1" />
        </form>
  )
}

export default Searchbar
