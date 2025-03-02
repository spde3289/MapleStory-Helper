'use client'

import { useMainCharacterContext } from '@/context/characterContext'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { getCharInfo } from '@/fetch/client/charFetch'
import { getCharList } from '@/fetch/client/charListFetch'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { getCharacterName } from '@/utils/localStorage/characterName'
import { getCharacterNameList } from '@/utils/localStorage/characterNameList'
import { useEffect } from 'react'

/** 페이지 로딩시 로컬스토리지에 있는 값을 가져와 데이터 패칭해 전역 상태로 등록하는 Provider */
const DataFetchProvider = ({ children }: { children: React.ReactNode }) => {
  const { setMainCharacter } = useMainCharacterContext()
  const { characterInfoList, handleCharacterInfo } =
    useCharacterInfoListContext()

  useEffect(() => {
    const fetchData = async () => {
      const characterName = getCharacterName() // 캐릭터이름저장
      if (typeof characterName === 'string') {
        const data = await getCharInfo(characterName)
        if (data) {
          setMainCharacter(data)
        }
      }
    }
    fetchData()
  }, [setMainCharacter])

  useEffect(() => {
    if (getCharacterNameList()?.length !== 0) {
      const response = async () => {
        const data = await getCharList(getCharacterNameList())
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
      }
      response()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return children
}

export default DataFetchProvider
