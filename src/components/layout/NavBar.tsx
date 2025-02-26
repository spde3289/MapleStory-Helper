'use client'

import { useSidebar } from '@/context/SidebarContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

interface NavBarItemProps {
  isActive: boolean
  toggleMobileSidebar: () => void
  name: string
  path: string
}

const NavBarItem = ({
  isActive,
  toggleMobileSidebar,
  name,
  path,
}: NavBarItemProps) => {
  return (
    <Link href={path} onClick={() => toggleMobileSidebar()}>
      <li
        className={`pl-3 py-2  ${
          isActive ? 'menu-item-active' : 'menu-item-inactive'
        }`}
      >
        <h2>{name}</h2>
      </li>
    </Link>
  )
}

const navItems = [
  {
    path: '/gem',
    name: '주보 수익 계산기',
  },
  {
    path: '/genesis',
    name: '해방 퀘스트 계산기',
  },
]

const NavBar = () => {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar()
  const pathname = usePathname()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  let navWidth

  if (isExpanded || isMobileOpen) {
    navWidth = 'w-[290px]'
  } else if (isHovered) {
    navWidth = 'w-[290px]'
  } else {
    navWidth = 'w-[90px]'
  }

  return (
    <nav
      className={`flex flex-col h-[calc(100vh-65px)] fixed top-16 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${navWidth}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mt-5">
        <h3 className="mb-2 text-xs uppercase flex leading-[20px] text-gray-400 justify-start">
          계산기
        </h3>
        <ul className="flex flex-col w-full ml-3 mr-3 font-bold">
          {navItems.map((item) => (
            <NavBarItem
              path={item.path}
              name={item.name}
              key={item.name}
              toggleMobileSidebar={toggleMobileSidebar}
              isActive={item.path === pathname}
            />
          ))}
        </ul>
      </div>
    </nav>
  )
}
export default NavBar
