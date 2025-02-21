"use client"

import { useLogTitleContext } from "@/contexts/log-title-context"
import { usePathname } from "next/navigation"
import { useEffect } from 'react';

const Searchbar: React.FC<{ className?: string; style?: any }> = ({
  className,
  style,
}) => {
  const pathname = usePathname()
  const { title, setTitle, loading, setLoading } = useLogTitleContext()

  useEffect(() => {
    if (!pathname) return;
  
    setLoading(true);
    if (pathname === "/logs") {
      setTitle('🗒️ Logs');
    } else if (pathname === "/sms") {
      setTitle('💌 SMS');
    } else if (pathname === "") {
      setTitle("");
    }
    
    setLoading(false);

  }, [pathname]);
  
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
        defaultValue={loading ? "⏳ Loading..." : title!}
        placeholder={loading ? "⏳ Loading..." : title!}
      />
    </form>
  )
}

export default Searchbar
