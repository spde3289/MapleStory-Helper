import { Boss } from '@/data/boss'

type localStorageCharListType = {
  character_name: string
  boss: Boss
}[]

export const getCharacterNameList = (): localStorageCharListType => {
  const arr = localStorage.getItem('characterNameList')

  if (arr === null) return []
  return JSON.parse(arr)
}

export const setCharacterNameList = (nameArr: string[]) => {
  localStorage.setItem('characterNameList', JSON.stringify(nameArr))
}
