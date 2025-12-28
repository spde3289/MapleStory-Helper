'use client'

import { ThemeToggleButton } from '@/components/common/ThemeToggleButton'
import Image from 'next/image'
import Link from 'next/link'

import maple from '@/assets/icons/maple.ico'
import HeaderNav from './HeaderNav'
const RootHeader = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-2.5 dark:border-neutral-700 dark:bg-neutral-900 w-full">
      <div className="w-full xl:w-[1200px] xl:m-0 xl:mx-auto px-2.5 xl:px-0">
        <div className="flex justify-between items-center">
          <Link href="/">
            <h1 className="flex gap-2 items-center font-bold dark:gray-200 ">
              <Image src={maple} width={32} alt="메이플 아이콘" />
              <div>
                메이플 <span className="text-orange-500">헬퍼</span>
              </div>
            </h1>
          </Link>
          <ThemeToggleButton />
        </div>
        <HeaderNav />
      </div>
    </header>
  )
}

export default RootHeader
