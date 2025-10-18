'use client'

import { BossType } from '@/data/boss'
// import BossInfo from '@/data/boss/boss.json'
import currentBossInfo from '@/data/boss/current/boss.json'
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
  boss: BossType
}

type localStorageCharListType = {
  character_name: string
  boss: BossType
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

export const BOSS_PRESET = {
  sde: [
    { difficulty: '카오스', name: '자쿰' },
    { difficulty: '하드', name: '매그너스' },
    { difficulty: '하드', name: '힐라' },
    { difficulty: '카오스', name: '파풀라투스' },
    { difficulty: '카오스', name: '피에르' },
    { difficulty: '카오스', name: '반반' },
    { difficulty: '카오스', name: '블러디퀸' },
    { difficulty: '카오스', name: '벨룸' },
    { difficulty: '카오스', name: '핑크빈' },
    { difficulty: '노멀', name: '시그너스' },
    { difficulty: '노멀', name: '스우' },
    { difficulty: '노멀', name: '데미안' },
  ],
  gaenseul: [
    { difficulty: '카오스', name: '자쿰' },
    { difficulty: '하드', name: '매그너스' },
    { difficulty: '카오스', name: '파풀라투스' },
    { difficulty: '카오스', name: '피에르' },
    { difficulty: '카오스', name: '반반' },
    { difficulty: '카오스', name: '블러디퀸' },
    { difficulty: '카오스', name: '벨룸' },
    { difficulty: '카오스', name: '핑크빈' },
    { difficulty: '노멀', name: '시그너스' },
    { difficulty: '노멀', name: '스우' },
    { difficulty: '노멀', name: '데미안' },
    { difficulty: '노멀', name: '가디언 엔젤 슬라임' },
  ],
  irushi: [
    { difficulty: '카오스', name: '자쿰' },
    { difficulty: '하드', name: '매그너스' },
    { difficulty: '카오스', name: '파풀라투스' },
    { difficulty: '카오스', name: '피에르' },
    { difficulty: '카오스', name: '반반' },
    { difficulty: '카오스', name: '블러디퀸' },
    { difficulty: '카오스', name: '벨룸' },
    { difficulty: '노멀', name: '시그너스' },
    { difficulty: '노멀', name: '스우' },
    { difficulty: '노멀', name: '데미안' },
    { difficulty: '노멀', name: '가디언 엔젤 슬라임' },
    { difficulty: '이지', name: '루시드' },
  ],
  ruwill: [
    { difficulty: '카오스', name: '자쿰' },
    { difficulty: '하드', name: '매그너스' },
    { difficulty: '카오스', name: '파풀라투스' },
    { difficulty: '카오스', name: '피에르' },
    { difficulty: '카오스', name: '반반' },
    { difficulty: '카오스', name: '블러디퀸' },
    { difficulty: '카오스', name: '벨룸' },
    { difficulty: '노멀', name: '스우' },
    { difficulty: '노멀', name: '데미안' },
    { difficulty: '노멀', name: '가디언 엔젤 슬라임' },
    { difficulty: '이지', name: '루시드' },
    { difficulty: '이지', name: '윌' },
  ],
  hasuu: [
    { difficulty: '하드', name: '매그너스' },
    { difficulty: '카오스', name: '파풀라투스' },
    { difficulty: '카오스', name: '피에르' },
    { difficulty: '카오스', name: '블러디퀸' },
    { difficulty: '카오스', name: '벨룸' },
    { difficulty: '하드', name: '스우' },
    { difficulty: '노멀', name: '데미안' },
    { difficulty: '노멀', name: '가디언 엔젤 슬라임' },
    { difficulty: '노멀', name: '루시드' },
    { difficulty: '노멀', name: '윌' },
    { difficulty: '노멀', name: '더스크' },
    { difficulty: '노멀', name: '듄켈' },
  ],
  geommitsol: [
    { difficulty: '하드', name: '매그너스' },
    { difficulty: '카오스', name: '파풀라투스' },
    { difficulty: '카오스', name: '블러디퀸' },
    { difficulty: '카오스', name: '벨룸' },
    { difficulty: '하드', name: '스우' },
    { difficulty: '하드', name: '데미안' },
    { difficulty: '카오스', name: '가디언 엔젤 슬라임' },
    { difficulty: '하드', name: '루시드' },
    { difficulty: '하드', name: '윌' },
    { difficulty: '카오스', name: '더스크' },
    { difficulty: '하드', name: '듄켈' },
    { difficulty: '하드', name: '진 힐라' },
  ],
  haseikal: [
    { difficulty: '카오스', name: '파풀라투스' },
    { difficulty: '카오스', name: '벨룸' },
    { difficulty: '하드', name: '스우' },
    { difficulty: '하드', name: '데미안' },
    { difficulty: '카오스', name: '가디언 엔젤 슬라임' },
    { difficulty: '하드', name: '루시드' },
    { difficulty: '하드', name: '윌' },
    { difficulty: '카오스', name: '더스크' },
    { difficulty: '하드', name: '듄켈' },
    { difficulty: '하드', name: '진 힐라' },
    { difficulty: '하드', name: '선택받은 세렌' },
    { difficulty: '이지', name: '감시자 칼로스' },
  ],
  nokallica: [
    { difficulty: '하드', name: '스우' },
    { difficulty: '하드', name: '데미안' },
    { difficulty: '카오스', name: '가디언 엔젤 슬라임' },
    { difficulty: '하드', name: '루시드' },
    { difficulty: '하드', name: '윌' },
    { difficulty: '카오스', name: '더스크' },
    { difficulty: '하드', name: '듄켈' },
    { difficulty: '하드', name: '진 힐라' },
    { difficulty: '하드', name: '선택받은 세렌' },
    { difficulty: '노멀', name: '감시자 칼로스' },
    { difficulty: '노멀', name: '최초의 대적자' },
    { difficulty: '이지', name: '카링' },
  ],
}

// 타입은 상황에 맞춰 조정하세요.
// type Difficulty = '이지' | '노멀' | '하드' | '카오스' | '익스트림'

type PresetEntry = {
  name: string // krName 기준 (예: "스우")
  difficulty: string
}

type BossTypeItem = {
  difficulty: string
  price: number
  current: boolean
}

type Boss = {
  name: string // 영문 이름
  krName: string // 한글 이름
  player: number
  type: BossTypeItem[]
}

// // 외부에서 주어지는 데이터
// declare const BossInfo: Boss[]
// declare const BOSS_PRESET: {
//   nokallica: PresetEntry[]
//   haseikal: PresetEntry[]
//   geommitsol: PresetEntry[]
//   hasu: PresetEntry[]
//   ruwill: PresetEntry[]
//   irushi: PresetEntry[]
//   gaenseul: PresetEntry[]
//   sde: PresetEntry[]
// }

// 1) 임계값 테이블: 큰 값부터 나열 (내림차순)
const THRESHOLDS: Array<{ limit: number; preset: PresetEntry[] }> = [
  { limit: 200_000_000, preset: BOSS_PRESET.nokallica }, // 노칼이카
  { limit: 150_000_000, preset: BOSS_PRESET.haseikal }, // 하세이칼
  { limit: 100_000_000, preset: BOSS_PRESET.geommitsol }, // 검밑솔
  { limit: 30_000_000, preset: BOSS_PRESET.hasuu }, // 하스우
  { limit: 20_000_000, preset: BOSS_PRESET.ruwill }, // 이루윌
  { limit: 15_000_000, preset: BOSS_PRESET.irushi }, // 이루시
  { limit: 10_000_000, preset: BOSS_PRESET.gaenseul }, // 가엔슬
  { limit: 5_000_000, preset: BOSS_PRESET.sde }, // 스데
]

// 2) 현재 스펙에 맞는 프리셋 선택
const pickPreset = (value: number): PresetEntry[] | null => {
  return THRESHOLDS.find(({ limit }) => value >= limit)?.preset ?? null
}

// 3) 메인 함수: BossInfo를 갱신하여 반환
const checkStat = (value: number): Boss[] => {
  const preset = pickPreset(value)
  if (!preset) return currentBossInfo

  // 4) 빠른 매칭을 위한 Map 구성 (krName → difficulty)
  const targetByKrName = new Map<string, string>(
    preset.map((p) => [p.name, p.difficulty]), // preset의 name이 krName과 동일하다고 가정
  )

  // 5) currentBossInfo 갱신
  return currentBossInfo.map((boss) => {
    const targetDifficulty = targetByKrName.get(boss.krName)
    if (!targetDifficulty) return boss

    const updatedType = boss.type.map((t) => ({
      ...t,
      current: t.difficulty === targetDifficulty, // 매칭된 난이도만 true
    }))

    return { ...boss, type: updatedType }
  })
}
// const updatedBossData = BossInfo.map((boss) => {
//   // nokallica 배열에서 일치하는 보스 찾기
//   const match = currentBoss?.find((n) => n.name === boss.krName)

//   // 일치하는 항목이 없으면 그대로 반환
//   if (!match) return boss

//   // 일치하는 항목이 있으면 difficulty 수정
//   const updatedType = boss.type.map((t) => ({
//     ...t,
//     current: t.difficulty === match.difficulty, // 일치하는 난이도만 current true
//   }))

//   return { ...boss, type: updatedType }
// })

// console.log(updatedBossData)

// return updatedBossData // 기본 보스 리스트

const SetBossList = (stat_value: number, currentBoss: BossType) => {
  const mergedBossInfo = [...checkStat(stat_value)]

  // const updatedBossData = BossInfo.map((boss) => {
  //   // nokallica 배열에서 일치하는 보스 찾기
  //   const match = currentBoss?.find((n) => n.name === boss.krName)

  //   // 일치하는 항목이 없으면 그대로 반환
  //   if (!match) return boss

  //   // 일치하는 항목이 있으면 difficulty 수정
  //   const updatedType = boss.type.map((t) => ({
  //     ...t,
  //     current: t.difficulty === match.difficulty, // 일치하는 난이도만 current true
  //   }))

  //   return { ...boss, type: updatedType }
  // })

  currentBoss.forEach((newBoss) => {
    const existingIndex = mergedBossInfo.findIndex(
      (boss) => boss.name === newBoss.name,
    )

    if (existingIndex !== -1) {
      // 기존 보스가 있으면 업데이트
      mergedBossInfo[existingIndex] = newBoss
    } else {
      // 새로운 보스면 추가
      mergedBossInfo.push(newBoss)
    }
  })

  return mergedBossInfo
}

const CharacterInfoListProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [characterInfoList, setCharacterInfoList] = useState<characterInfo[]>(
    [],
  )

  useEffect(() => {
    const arr: any[] = []

    characterInfoList.forEach((info) => {
      arr.push({ character_name: info.character_name, boss: info.boss })
    })

    setCharacterNameList(arr)
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
            currentCharacter: false,
            boss: charName?.boss
              ? SetBossList(char.final_stat[42].stat_value, charName.boss)
              : checkStat(char.final_stat[42].stat_value),
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
              boss: checkStat(data.final_stat[42].stat_value),
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
