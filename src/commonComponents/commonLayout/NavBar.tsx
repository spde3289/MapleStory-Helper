import maple from '@/icons/maple.ico'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import AccordionLayoutButton from './AccordionLayoutButton'

const width = 'w-52'

const NavBar = () => {
  const [navWidth, setNavWidth] = useState<string>(width)

  const handelNavWidth = () => {
    if (navWidth === width) setNavWidth('w-0')
    if (navWidth === 'w-0') setNavWidth(width)
  }

  return (
    <nav className={`${navWidth} pt-4 relative transition-all flex-0`}>
      {navWidth === width && (
        <>
          <div className="flex flex-col items-center mb-6 min-w-52">
            <Link href="/">
              <h1 className="flex items-center font-bold">
                <Image
                  className="mr-2"
                  src={maple}
                  width={32}
                  height={32}
                  alt="메이플 아이콘"
                />
                Maple Helper
              </h1>
            </Link>
            <div className="h-[1px] mt-4 bg-gray-100 w-7/12" />
          </div>
          <ul className="ml-3 mr-3 space-y-6 font-bold ">
            <li className="pl-3">
              <h2>
                <Link href="/gem">보스 결졍석</Link>
              </h2>
            </li>
          </ul>
        </>
      )}
      <AccordionLayoutButton
        navWidth={navWidth}
        width={width}
        handelNavWidth={handelNavWidth}
      />
    </nav>
  )
}

export default NavBar
