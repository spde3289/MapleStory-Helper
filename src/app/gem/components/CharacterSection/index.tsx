import ItemContainer from '@/components/common/ItemContainer'
import WorldImage from '@/components/common/WorldImage'
import { useCharacterInfoListContext } from '@/context/characterInfoListContext'
import { getCharInfo } from '@/fetch/client/charFetch'
import { getCharList } from '@/fetch/client/charListFetch'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'
import { checkHangulRex } from '@/utils/inputUtils'
import Link from 'next/link'
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

  // 월드 리스트 로직
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
          current: uniqueWorldNames[0] === world,
        })),
      ])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterInfoList])

  // 캐릭터 등록 로직
  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur() // 포커스아웃
      if (isApiKeyTypeCheck(characterName)) {
        // apikey를 입력 했을 시 //////////////////////////////////////////////
        const data = await getCharList(characterName)

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
        const data = await getCharInfo(characterName)

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

  // api키 혹은 캐릭터 이름만 등록 가능
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      checkHangulRex(e.target.value) ||
      e.target.value.startsWith('test_') ||
      e.target.value.startsWith('live_')
    ) {
      setCharacterName(e.target.value)
    }
  }
  // 선택 월드 변경 로직
  const handleWorldChange = useCallback((world: WorldListType) => {
    setWorldList((pre) => [
      ...pre.map((item) => ({ ...item, current: world.world === item.world })),
    ])
  }, [])

  return (
    <ItemContainer className="relative" title="캐릭터 등록">
      <div className="w-[820px] xs:w-full ">
        <div className="absolute top-3 right-4 underline">
          <Link
            target="_blank"
            href="https://openapi.nexon.com/ko/guide/prepare-in-advance/"
          >
            API KEY 발급
          </Link>
        </div>
        <input
          id="캐릭터등록"
          className="h-8 p-3 w-full rounded-lg outline-none bg-gray-200 mb-2"
          placeholder="캐릭터 이름 혹은 APIKEY를 입력해 주세요"
          value={characterName}
          onChange={handlerChange}
          onKeyDown={handlerSubmit}
        />
        {characterInfoList.length !== 0 && (
          <div className="p-1 h-fit w-full relative ">
            <div className="absolute w-full flex overflow-y-scroll scrollBar">
              {worldList.map((world) => {
                return (
                  <button
                    key={world.world}
                    className={`${world.current ? 'bg-gray-200 rounded-t-md' : ' '} flex items-center gap-2 whitespace-nowrap mr-3 p-1 pb-2`}
                    type="button"
                    onClick={() => handleWorldChange(world)}
                  >
                    <WorldImage world_name={world.world} size={20} />
                    {world.world}
                  </button>
                )
              })}
            </div>
            <div className="bg-gray-200 rounded-md mt-8 px-1 py-2 pt-3 flex flex-col gap-1">
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
        )}
      </div>
    </ItemContainer>
  )
}

export default memo(CharacterSection)
