import useWindowSize from '@/hooks/useWindowSize'
import maple from '@/icons/maple.ico'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AccordionLayoutButton from './AccordionLayoutButton'

const NavBar = () => {
  const [navSize, setNavSize] = useState<string>('h-screen w-52')
  const { windowWidth } = useWindowSize()

  const width = windowWidth < 1024 ? 'w-full h-14' : 'h-screen w-52'
  useEffect(() => {
    setNavSize(width)
  }, [width])

  const handelNavSize = () => {
    if (navSize === width) setNavSize('h-screen w-0')
    if (navSize === 'h-screen w-0') setNavSize(width)
    if (navSize === 'w-full h-14') setNavSize('w-full t-0')
    if (navSize === 'w-full t-0') setNavSize(width)
  }

  return (
    <nav
      className={`${navSize} lg:pt-4 relative xs:flex flex-1 transition-all`}
    >
      {navSize === width && (
        <>
          <div className="flex xs:w-14 flex-col xs:h-full xs:pt-2 items-center mb-6 xs:mb-3 lg:min-w-52 ">
            <Link href="/">
              <h1 className="flex w-fit items-center font-bold">
                <Image
                  className="lg:mr-2"
                  src={maple}
                  width={32}
                  height={32}
                  alt="메이플 아이콘"
                />
                <div className="xs:hidden">Maple Helper</div>
              </h1>
            </Link>
            <div className="xs:hidden h-[1px] mt-4 bg-gray-100 w-7/12" />
          </div>
          <ul className="flex lg:flex-col xs:space-x-4 xs:items-center w-full ml-3 mr-3 lg:space-y-6 font-bold">
            <li className="pl-3">
              <h2>
                <Link href="/gem">보스 결정석</Link>
              </h2>
            </li>
            <li className="pl-3">
              <h2>
                <Link href="/genesis">해방 퀘스트 계산기</Link>
              </h2>
            </li>
          </ul>
        </>
      )}
      <AccordionLayoutButton
        navSize={navSize}
        width={width}
        handelNavSize={handelNavSize}
      />
    </nav>
  )
}

export default NavBar
