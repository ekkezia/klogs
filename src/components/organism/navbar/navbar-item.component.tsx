import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { INavItems } from "./navbar.component"

interface INavBarItemComponentProps {
  navItems: INavItems
  itemKey: string
}

const NavBarItem: React.FC<INavBarItemComponentProps> = ({
  navItems,
  itemKey,
}) => {
  const router = useRouter()

  return (
    <div>
      <div className="flex" onClick={() => {}}>
        <div>{<div className="size-4 bg-orange-300" />}</div>
        <Link href="/">
          <p>Menu Item</p>
        </Link>
      </div>
    </div>
  )
}

export default NavBarItem
