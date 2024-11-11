import { getCharOcid } from '@/fetch/charFetch'
import { getCharList } from '@/fetch/charListFetch'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { checkHangulRex } from '@/utils/inputUtils'
import { useState } from 'react'

type InputType = `test_${string}` | `live_${string}` // 정상적인 타입 선언

const isApiKeyTypeCheck = (value: string): value is InputType => {
  return value.startsWith('test_') || value.startsWith('live_')
}
// test_5db3f3ae2790ed549f18f8c6b4e5006694d382ee2d268318b22a255f52eac38defe8d04e6d233bd35cf2fabdeb93fb0d
const CharacterSection = () => {
  const [character, setCharacter] = useState<InputType | string>('')
  const [characterList, setCharacterList] = useState<MainCharacterResponse[]>(
    [],
  )

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur() // 포커스아웃

      if (isApiKeyTypeCheck(character)) {
        // apikey를 입력 했을 시
        const { data } = await getCharList(character)

        if (data) {
          setCharacterList(data)
        }
      } else {
        // 수동으로 원하는 캐릭터를 입력
        const { data } = await getCharOcid(character)

        if (data) {
          setCharacterList((pre) => [...pre, data])
        }
      }

      setCharacter('')
    }
  }
  console.log(characterList)

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      checkHangulRex(e.target.value) ||
      e.target.value.startsWith('test_') ||
      e.target.value.startsWith('live_')
    ) {
      setCharacter(e.target.value)
    }
  }

  return (
    <section className="bg-white">
      캐릭터 추가
      <input
        className="h-8 p-3 w-80 rounded-lg"
        placeholder="캐릭터 이름 혹은 APIKEY를 입력해 주세요"
        value={character}
        onChange={handlerChange}
        onKeyDown={handlerSubmit}
      />
    </section>
  )
}

export default CharacterSection
