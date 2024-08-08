"use client"

import { useLogTitleContext } from "@/contexts/log-title-context"
import { usePathname } from "next/navigation"

const Searchbar: React.FC<{ className?: string; style?: any }> = ({
  className,
  style,
}) => {
  const pathname = usePathname()
  const { title, loading } = useLogTitleContext()

  if (pathname == "/") {
    return <></>
  }
  return (
    <form className={className} style={style}>
      <input
        type="text"
        id="search"
        name="search"
        // todo
        className={"caret-none body1 h-[35.5px] w-full bg-tertiary px-4 sm:h-[47px]"}
        defaultValue={pathname === "/logs" ? "🗒️ Logs" : loading ? "⏳ Loading..." : title!}
        placeholder={pathname === "/logs" ? "🗒️ Logs" : loading ? "⏳ Loading..." : title!}
      />
    </form>
  )
}

export default Searchbar
