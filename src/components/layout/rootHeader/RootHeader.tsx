'use client'

import Image from 'next/image'
import Link from 'next/link'

import maple from '@/assets/icons/maple.ico'
import ThemeToggleButton from '@/components/common/ThemeToggleButton'
import NAV_ITEMS from '@/constants/navItems'
import clsx from 'clsx'
import NavGroup from './NavGroup'

const RootHeader = () => {
  return (
    <header
      className={clsx(
        'py-2.5',
        'bg-white border-b border-gray-200 dark:border-neutral-700 dark:bg-neutral-900',
      )}
    >
      <div
        className={clsx(
          'w-full px-2.5',
          'sm:px-6',
          'xl:w-[1200px] xl:m-0 xl:mx-auto xl:px-0',
        )}
      >
        <div className="flex justify-between items-center">
          <div
            className={clsx(
              'flex justify-between items-center gap-2',
              'sm:gap-8',
            )}
          >
            <Link href="/">
              <h1
                className={clsx(
                  'flex gap-2 font-maple items-center text-base font-semibold',
                  'sm:text-lg sm:font-bold',
                )}
              >
                <Image src={maple} width={32} alt="메이플 아이콘" />
                <div>
                  메이플 <span className="text-orange-500">헬퍼</span>
                </div>
              </h1>
            </Link>
            <div className="flex">
              {NAV_ITEMS.map((item) => (
                <NavGroup key={item.name} item={item} />
              ))}
            </div>
          </div>
          <div>
            <ThemeToggleButton />
          </div>
        </div>
      </div>
    </header>
  )
}

export default RootHeader
