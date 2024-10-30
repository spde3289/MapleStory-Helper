import { useState } from 'react'
import { useMainCharacterContext } from '@/context/characterContext' // 실제 경로로 수정
import { getCharOcid } from '@/fetch/charFetch'
import { setCookie, getCookie } from 'cookies-next'

const useCharacter = () => {
  const [character, setCharacter] = useState<string>('')
  const { setMainCharacter } = useMainCharacterContext()

  const date = new Date()
  date.setFullYear(date.getFullYear() + 1)

  const options = {
    expires: date,
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
  // useEffect(() => {
  // }, [])

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
