'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { useSidebar } from '@/context/SidebarContext'

function NavBar() {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleMobileSidebar,
  } = useSidebar()

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
          <Link href="/gem" onClick={() => toggleMobileSidebar()}>
            <li className="pl-3 menu-item-inactive py-2">
              <h2>보스 결정석</h2>
            </li>
          </Link>
          <Link href="/genesis" onClick={() => toggleMobileSidebar()}>
            <li className="pl-3 menu-item-inactive py-2">
              <h2>해방 퀘스트 계산기</h2>
            </li>
          </Link>
        </ul>
      </div>
    </nav>
  )
}
export default NavBar
