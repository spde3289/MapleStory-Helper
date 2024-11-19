import ItemContainer from '@/commonComponents/ItemContainer'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { getCharInfo } from '@/fetch/charFetch'
import { getCharList } from '@/fetch/charListFetch'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'
import { checkHangulRex } from '@/utils/inputUtils'
import { memo, useCallback, useEffect, useState } from 'react'
import CharacterElement from './CharacterElement'

// then은 요청에 대한 응답을 기다리고 다음 줄을 실행한다.
// 함수가 종료 되어도 요청에 대한 응답이 오게 되면 실행이 된다

// async/await는 요청에 대한 응답을 받을 때 까지 기다린 후 다음 줄을 실행한다.
// then보다 좋은 점은 코드의 실행 순서를 내가 원하는 대로 제어 할 수 있다는 점이 장점이다.

type InputType = `test_${string}` | `live_${string}` // 정상적인 타입 선언

const isApiKeyTypeCheck = (value: string): value is InputType => {
  return value.startsWith('test_') || value.startsWith('live_')
}

type WorldListType = {
  world: WorldType
  current: boolean
}

const CharacterSection = () => {
  const [characterName, setCharacterName] = useState<InputType | string>('')
  const [worldList, setWorldList] = useState<WorldListType[]>([])
  const { characterInfoList, handleCharacterInfo } =
    useCharacterInfoListContext()

  useEffect(() => {
    const uniqueWorldNames = Array.from(
      new Set(characterInfoList.map((character) => character.world_name)),
    )

    if (
      worldList.length === 0 ||
      uniqueWorldNames.length !== worldList.length
    ) {
      setWorldList([
        ...uniqueWorldNames.map((world) => ({
          world,
          current: false,
        })),
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterInfoList])

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur() // 포커스아웃
      if (isApiKeyTypeCheck(characterName)) {
        // apikey를 입력 했을 시 //////////////////////////////////////////////
        const { data } = await getCharList(characterName)

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
          handleCharacterInfo(UniqueArr)
        }
      } else {
        // 수동으로 원하는 캐릭터를 입력
        const { data } = await getCharInfo(characterName)

        if (data) {
          if (
            characterInfoList.length === 0 ||
            !characterInfoList.some((character) => character.ocid === data.ocid)
          ) {
            handleCharacterInfo(data)
          } else {
            alert(
              `중복된 닉네임으로 인해 추가하지 않음: ${data.character_name}`,
            )
          }
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

  const handleWorldChange = useCallback((world: WorldListType) => {
    setWorldList((pre) => [
      ...pre.map((item) => ({ ...item, current: world.world === item.world })),
    ])
  }, [])

  return (
    <ItemContainer title="캐릭터 등록">
      <div className="w-[780px]">
        <input
          className="h-8 p-3 w-full rounded-lg outline-none bg-gray-200"
          placeholder="캐릭터 이름 혹은 APIKEY를 입력해 주세요"
          value={characterName}
          onChange={handlerChange}
          onKeyDown={handlerSubmit}
        />
        <div className="p-1 h-fit">
          {worldList.map((world) => {
            return (
              <button
                key={world.world}
                className="mr-6"
                type="button"
                onClick={() => handleWorldChange(world)}
              >
                {world.world}
              </button>
            )
          })}
          {characterInfoList.map((char) => {
            return (
              <CharacterElement
                key={char.ocid}
                currentWorld={worldList.find((world) => world.current)}
                character={char}
              />
            )
          })}
        </div>
      </div>
    </ItemContainer>
  )
}

export default memo(CharacterSection)
