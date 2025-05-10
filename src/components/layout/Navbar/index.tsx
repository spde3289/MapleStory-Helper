'use client'

import { calculatorItems, ledgerItems } from '@/constants/route'
import { useSidebar } from '@/context/SidebarContext'
import { useEffect, useRef } from 'react'
import ItemContainer from './ItemContainer'

const NavBar = () => {
  const { isExpanded, isMobileOpen, setIsHovered } = useSidebar()

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

  return (
    <nav
      className={`w-64 flex flex-col h-[calc(100vh-65px)] fixed top-16 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mt-5 flex flex-col gap-4">
        <ItemContainer title="계산기" items={calculatorItems} />
        <ItemContainer title="가계부" items={ledgerItems} />
      </div>
    </nav>
  )
}
export default NavBar
