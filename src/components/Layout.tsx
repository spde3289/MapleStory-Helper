import { useMainCharacterContext } from '@/context/characterContext'
import { getCharOcid } from '@/fetch/charFetch'
import { setYear } from '@/utils/setDate'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import NavBar from './commonLayout/NavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setMainCharacter } = useMainCharacterContext()
  useEffect(() => {
    const options = {
      expires: setYear(1),
    }
    const fetchData = async () => {
      const ocid = getCookie('ocid', options) // 캐릭터이름저장
      if (typeof ocid === 'string') {
        const { data, statusText } = await getCharOcid(ocid)
        if (statusText === 'OK' && data) {
          setMainCharacter(data)
        }
      }
    }
    fetchData()
  }, [setMainCharacter])

  return (
    <>
      <NavBar />
      <section className="bg-gray-200 w-full h-screen flex-1">
        {children}
      </section>
    </>
  )
}

export default Layout
