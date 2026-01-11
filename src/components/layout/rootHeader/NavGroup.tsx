'use clinet'

import { NavItem } from '@/constants/navItems'
import useHoverLockPopup from '@/hooks/usePopup'
import clsx from 'clsx'
import { RiArrowDownSLine } from 'react-icons/ri'
import NavChildrenItem from './NavChildrenItem'

interface Props {
  item: NavItem
}

const NavGroup = ({ item }: Props) => {
  const { rootRef, open, onOpen, onClose, onClickLock } =
    useHoverLockPopup<HTMLDivElement>()

  return (
    <div
      className={clsx(
        'relative h-full py-2 px-4',
        'text-[#2a3038] dark:text-[#dfdfdf]',
      )}
      ref={rootRef}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        className={clsx(
          'font-medium text-sm flex items-center gap-1',
          'sm:text-base sm:font-semibold',
        )}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onClickLock()
        }}
        aria-expanded={open}
      >
        {item.name}
        <RiArrowDownSLine color="#868b94" />
      </button>
      {open && (
        <div
          onClick={onClose}
          className={clsx(
            'absolute top-full left-2 z-50 flex flex-col px-1 py-1.5 rounded-md border',
            'bg-white dark:bg-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,0.15)] dark:border-neutral-600',
          )}
        >
          {item.children.map((child) => (
            <NavChildrenItem
              key={child.name}
              href={child.path}
              content={child.name}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default NavGroup
