import { useMainCharacterContext } from '@/context/characterContext'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { getCharInfo } from '@/fetch/charFetch'
import { getCharList } from '@/fetch/charListFetch'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { getCharacterName } from '@/utils/localStorage/characterName'
import { getCharacterNameList } from '@/utils/localStorage/characterNameList'
import { useEffect } from 'react'
import NavBar from '../commonComponents/commonLayout/NavBar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { setMainCharacter } = useMainCharacterContext()
  const { characterInfoList, handleCharacterInfo } =
    useCharacterInfoListContext()
  useEffect(() => {
    const fetchData = async () => {
      const characterName = getCharacterName() // 캐릭터이름저장
      if (typeof characterName === 'string') {
        const { data, statusText } = await getCharInfo(characterName)
        if (statusText === 'OK' && data) {
          setMainCharacter(data)
        }
      }
    }
    fetchData()
  }, [setMainCharacter])

  useEffect(() => {
    if (getCharacterNameList()?.length !== 0) {
      const response = async () => {
        const { data } = await getCharList(getCharacterNameList())
        if (data) {
          const UniqueArr: MainCharacterResponse[] = []

          data.forEach((character) => {
            // ocid값이 중복이 아닌 경우에만 배열에 추가
            if (
              !characterInfoList.some((char) => character.ocid === char.ocid) ||
              characterInfoList.length === 0
            ) {
              UniqueArr.push(character)
            }
          })
          handleCharacterInfo(UniqueArr, getCharacterNameList())
        }

        // handleCharacterInfo()
      }
      response()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
