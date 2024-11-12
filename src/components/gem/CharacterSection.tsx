import { getCharOcid } from '@/fetch/charFetch'
import { getCharList } from '@/fetch/charListFetch'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'
import { checkHangulRex } from '@/utils/inputUtils'
import { useEffect, useState } from 'react'
import CharacterElement from './CharacterElement'

type InputType = `test_${string}` | `live_${string}` // 정상적인 타입 선언

const isApiKeyTypeCheck = (value: string): value is InputType => {
  return value.startsWith('test_') || value.startsWith('live_')
}

type WorldListType = {
  world: WorldType
  current: boolean
}

// test_5db3f3ae2790ed549f18f8c6b4e5006694d382ee2d268318b22a255f52eac38defe8d04e6d233bd35cf2fabdeb93fb0d
const CharacterSection = () => {
  const [characterName, setCharacterName] = useState<InputType | string>('')
  const [worldList, setWorldList] = useState<WorldListType[]>([])
  const [characterList, setCharacterList] = useState<MainCharacterResponse[]>(
    [],
  )

  useEffect(() => {
    const uniqueWorldNames = Array.from(
      new Set(characterList.map((character) => character.world_name)),
    )

    setWorldList([
      ...uniqueWorldNames.map((world) => ({
        world,
        current: false,
      })),
    ])
  }, [characterList])

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur() // 포커스아웃

      if (isApiKeyTypeCheck(characterName)) {
        // apikey를 입력 했을 시
        const { data } = await getCharList(characterName)

        if (data) {
          setCharacterList((pre) => [...pre, ...data])
        }
      } else {
        // 수동으로 원하는 캐릭터를 입력
        const { data } = await getCharOcid(characterName)

        if (data) {
          setCharacterList((pre) => [...pre, data])
        }
      }

      setCharacterName('')
    }
  }

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      checkHangulRex(e.target.value) ||
      e.target.value.startsWith('test_') ||
      e.target.value.startsWith('live_')
    ) {
      setCharacterName(e.target.value)
    }
  }

  const handleWorldChange = (world: WorldListType) => {
    setWorldList((pre) => [
      ...pre.map((item) => ({ ...item, current: world.world === item.world })),
    ])
  }

  return (
    <section className="bg-white">
      캐릭터 추가
      {worldList.map((world) => {
        return (
          <button
            className="mr-6"
            type="button"
            key={world.world}
            onClick={() => handleWorldChange(world)}
          >
            {world.world}
          </button>
        )
      })}
      <input
        className="h-8 p-3 w-80 rounded-lg"
        placeholder="캐릭터 이름 혹은 APIKEY를 입력해 주세요"
        value={characterName}
        onChange={handlerChange}
        onKeyDown={handlerSubmit}
      />
      {characterList.map((el) => {
        return (
          <CharacterElement
            key={el.ocid}
            currentWorld={worldList.find((world) => world.current)}
            character={el}
          />
        )
      })}
    </section>
  )
}

export default CharacterSection
