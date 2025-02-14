'use client'

import { useMainCharacterContext } from '@/context/characterContext'
import { getCharInfo } from '@/fetch/client/charFetch'
import { checkHangulRex } from '@/utils/inputUtils'
import { setCharacterName } from '@/utils/localStorage/characterName'
import { useState } from 'react'

const SearchCharacter = () => {
  const { setMainCharacter } = useMainCharacterContext()
  const [character, setCharacter] = useState<string>('')

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur() // 포커스아웃
      const { data } = await getCharInfo(character)

      if (data) {
        // 로컬스토리지에 대표 캐릭터 이름 저장
        setCharacterName(data?.character_name)
        // localStorage.setItem('characterName', data?.character_name)
        setMainCharacter(data)
      }

      setCharacter('')
    }
  }

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkHangulRex(e.target.value)) setCharacter(e.target.value)
  }

  return (
    <input
      className="h-8 p-3 rounded-lg"
      placeholder="대표 캐릭터를 등록해주세요"
      value={character}
      onChange={handlerChange}
      onKeyDown={handlerSubmit}
    />
  )
}

export default SearchCharacter
