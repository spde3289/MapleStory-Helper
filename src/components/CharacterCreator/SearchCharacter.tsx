import { useMainCharacterContext } from '@/context/characterContext'
import { getCharOcid } from '@/fetch/charFetch'
import { checkHangulRex } from '@/utils/inputUtils'
import { setYear } from '@/utils/setDate'
import { setCookie } from 'cookies-next'
import { useState } from 'react'

const SearchCharacter = () => {
  const { setMainCharacter } = useMainCharacterContext()
  const [character, setCharacter] = useState<string>('')

  const options = {
    expires: setYear(1),
  }

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur() // 포커스아웃
      const { data, statusText } = await getCharOcid(character)

      if (statusText === 'OK') {
        // 쿠키에 대표 캐릭터 이름 저장
        setCookie('ocid', data?.character_name, options)
        if (data) {
          setMainCharacter(data)
        }
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
