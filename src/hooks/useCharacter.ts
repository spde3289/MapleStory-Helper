import { useMainCharacterContext } from '@/context/characterContext'
import { getCharOcid } from '@/fetch/charFetch'
import { setYear } from '@/utils/setDate'
import { setCookie } from 'cookies-next'
import { useState } from 'react'

const useCharacter = () => {
  const [character, setCharacter] = useState<string>('')
  const { setMainCharacter } = useMainCharacterContext()

  const options = {
    expires: setYear(1),
  }

  async function handlerSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
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
    const regex = /^[a-zA-Z0-9가-힣ㄱ-ㅎㅏ-ㅣ]*$/ // 한글, 영어, 숫자만 입력 가능 스페이스바 불가능
    if (regex.test(e.target.value)) {
      setCharacter(e.target.value)
    }
  }

  return {
    character,
    handlerChange,
    handlerSubmit,
  }
}

export default useCharacter
