'use client'

import { useSidebar } from '@/context/SidebarContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavBarItemProps {
  name: string
  path: string
}

const NavItem = ({ name, path }: NavBarItemProps) => {
  const { toggleMobileSidebar } = useSidebar()
  const pathname = usePathname()

  return (
    <Link href={path} onClick={() => toggleMobileSidebar()}>
      <li
        className={`pl-3 py-2  ${
          path === pathname ? 'menu-item-active' : 'menu-item-inactive'
        }`}
      >
        <h2>{name}</h2>
      </li>
    </Link>
  )
}

export default NavItem
