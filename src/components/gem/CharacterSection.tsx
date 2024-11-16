import ItemContainer from '@/commonComponents/ItemContainer'
import { getCharInfo } from '@/fetch/charFetch'
import { getCharList } from '@/fetch/charListFetch'
// import { Get } from '@/fetch/client'
import { MainCharacterResponse } from '@/type/axios/characterType'
import { WorldType } from '@/type/character/world'
import { checkHangulRex } from '@/utils/inputUtils'
// import axios from 'axios'
import { memo, useCallback, useEffect, useState } from 'react'
import CharacterElement from './CharacterElement'
import WorldButton from './WorldButton'

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

// const axiosArr = (char220List) => {
//   return char220List.map((char: any) =>
//     Get('https://open.api.nexon.com/maplestory/v1/character/basic', {
//       headers: {
//         'x-nxopen-api-key':
//           '',
//       },
//       params: { ocid: char.ocid },
//     }),
//   )
// }

// const getcharacterOcid = async (char220List) => {
//   const data = await Promise.all(
//     char220List.map((char: any) =>
//       Get('https://open.api.nexon.com/maplestory/v1/character/basic', {
//         headers: {
//           'x-nxopen-api-key':
//             '',
//         },
//         params: { ocid: char.ocid },
//       }),
//     ),
//   )
//   return data
// }

//
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
        // const charList = await axios.get(
        //   'https://open.api.nexon.com/maplestory/v1/character/list',
        //   {
        //     headers: {
        //       'x-nxopen-api-key':
        //         '',
        //     },
        //   },
        // )
        // const char220List = charList.data.account_list[0].character_list.filter(
        //   (c: any) => {
        //     if (c.character_level > 220) {
        //       return true
        //     }
        //     return false
        //   },
        // )
        // const char220ListData = await Promise.all(
        //   char220List.map((char: any) =>
        //     axios.get('http://localhost:3000/api/maplestory/character', {
        //       params: { character_name: char.character_name },
        //     }),
        //   ),
        // )

        // char220ListData.forEach((data) => {
        //   setCharacterList((pre) => [...pre, data.data.data])
        // })

        // apikey를 입력 했을 시 //////////////////////////////////////////////
        const { data } = await getCharList(characterName)

        if (data) {
          const UniqueArr: MainCharacterResponse[] = []

          data.forEach((character) => {
            // ocid값이 중복이 아닌 경우에만 배열에 추가
            // console.log(characterList.length !== 0)
            if (
              !characterList.some((char) => character.ocid === char.ocid) ||
              characterList.length === 0
            ) {
              UniqueArr.push(character)
            }
          })

          setCharacterList((pre) => [...pre, ...UniqueArr])
        }
      } else {
        // 수동으로 원하는 캐릭터를 입력
        const { data } = await getCharInfo(characterName)

        if (data) {
          if (
            characterList.length === 0 ||
            !characterList.some((character) => character.ocid === data.ocid)
          ) {
            setCharacterList((pre) => [...pre, data])
          } else {
            alert(
              `중복된 닉네임으로 인해 추가하지 않음: ${data.character_name}`,
            )
          }
        }
      }
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
      <input
        className="h-8 p-3 w-80 rounded-lg outline-none bg-gray-200"
        placeholder="캐릭터 이름 혹은 APIKEY를 입력해 주세요"
        value={characterName}
        onChange={handlerChange}
        onKeyDown={handlerSubmit}
      />
      <div className="p-1 h-fit">
        {worldList.map((world) => {
          return (
            <WorldButton
              key={world.world}
              world={world}
              handleWorldChange={handleWorldChange}
            />
          )
        })}
        {characterList.map((el) => {
          return (
            <CharacterElement
              key={el.ocid}
              currentWorld={worldList.find((world) => world.current)}
              character={el}
            />
          )
        })}
      </div>
    </ItemContainer>
  )
}

export default memo(CharacterSection)
