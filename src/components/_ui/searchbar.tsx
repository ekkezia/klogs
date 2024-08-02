"use client"

import { usePathname } from "next/navigation"

const Searchbar: React.FC<{ className?: string; placeholder?: string; defaultValue?: string; style?: any }> = ({
  className,
  defaultValue,
  placeholder,
  style,
}) => {
  const pathname = usePathname()

  if (pathname == "/") {
    return <></>
  }
  return (
    <form className={className} style={style}>
      <input
        type="text"
        id="search"
        name="search"
        className={"caret-none body1 h-[47px] w-full px-4"}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </form>
  )
}

export default Searchbar
