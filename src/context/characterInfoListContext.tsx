import bosses, { Boss } from '@/data/boss'
import BossInfo from '@/data/boss/boss.json'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { setCharacterNameList } from '@/utils/localStorage/characterNameList'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export interface characterInfo extends MainCharacterResponse {
  currentCharacter: boolean
  boss: Boss
}

type localStorageCharListType = {
  character_name: string
  boss: Boss
}[]

interface CharacterInfoListContextType {
  characterInfoList: characterInfo[]
  handleCharacterInfo: (
    data: MainCharacterResponse | MainCharacterResponse[],
    charList?: localStorageCharListType,
  ) => void
  setCharacterInfoList: Dispatch<SetStateAction<characterInfo[]>>
}

const CharacterInfoListContext =
  createContext<CharacterInfoListContextType | null>(null)

const CheckStat = (value: number) => {
  // 하세이칼
  if (value >= 150000000) return bosses.haseikal
  // 검밑솔
  if (value >= 100000000) return bosses.geommitsol
  // 하스우
  if (value >= 30000000) return bosses.hasuu
  // 이루윌
  if (value >= 20000000) return bosses.ruwill
  // 이루시
  if (value >= 15000000) return bosses.irushi
  // 가엔슬
  if (value >= 10000000) return bosses.gaenseul
  // 스데
  if (value >= 5000000) return bosses.sde

  return BossInfo // 기본 보스 리스트
}

const CharacterInfoListProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [characterInfoList, setCharacterInfoList] = useState<characterInfo[]>(
    [],
  )

  useEffect(() => {
    const arr: any[] = []

    if (characterInfoList.length !== 0) {
      characterInfoList.forEach((info) => {
        arr.push({ character_name: info.character_name, boss: info.boss })
      })

      setCharacterNameList(arr)
    }
  }, [characterInfoList])

  const handleCharacterInfo = useCallback(
    (
      data: MainCharacterResponse | MainCharacterResponse[],
      charList?: localStorageCharListType,
    ) => {
      if (Array.isArray(data)) {
        const mapingData = data.map((char) => {
          const charName = charList?.find(
            (el: any) => el.character_name === char.character_name,
          )
          return {
            ...char,
            currentCharacter: false, // access_flag
            boss: charName?.boss
              ? charName.boss
              : CheckStat(char.final_stat[42].stat_value),
          }
        })
        setCharacterInfoList((pre) =>
          [...pre, ...mapingData].sort((a, b) => {
            if (a.character_level === b.character_level) {
              return b.final_stat[42].stat_value - a.final_stat[42].stat_value
            }
            return b.character_level - a.character_level
          }),
        )
      } else {
        setCharacterInfoList((pre) =>
          [
            ...pre,
            {
              ...data,
              currentCharacter: false,
              boss: CheckStat(data.final_stat[42].stat_value),
            },
          ].sort((a, b) => {
            if (a.character_level === b.character_level) {
              return b.final_stat[42].stat_value - a.final_stat[42].stat_value
            }
            return b.character_level - a.character_level
          }),
        )
      }
    },
    [],
  )

  const value = useMemo(
    () => ({ characterInfoList, handleCharacterInfo, setCharacterInfoList }),
    [characterInfoList, handleCharacterInfo, setCharacterInfoList],
  )

  return (
    <CharacterInfoListContext.Provider value={value}>
      {children}
    </CharacterInfoListContext.Provider>
  )
}

export const useCharacterInfoListContext = () => {
  const context = useContext(CharacterInfoListContext)
  if (!context) {
    throw new Error(
      'useMainCharacterContext must be used within a MainCharacterProvider',
    )
  }
  return context // Context의 값을 반환
}

export default CharacterInfoListProvider
