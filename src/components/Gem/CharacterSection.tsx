import { getCharOcid } from '@/fetch/charFetch'
import { MainCharacter } from '@/fetch/type/charFetchType'
import { checkHangulRex } from '@/utils/inputUtils'
import Image from 'next/image'
import { useState } from 'react'

const CharacterSection = () => {
  const [character, setCharacter] = useState<string>('')
  const [characterList, setList] = useState<MainCharacter[]>([])

  const handlerSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      ;(e.target as HTMLInputElement).blur() // 포커스아웃

      if (checkHangulRex(character)) {
        const { data, statusText } = await getCharOcid(character)

        if (statusText === 'OK') {
          if (data) {
            console.log(data.character_name)
            setList((pre) => [...pre, data])
          }
        }

        setCharacter('')
      }
    }
  }
  console.log(characterList)
  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (checkHangulRex(e.target.value)) setCharacter(e.target.value)
  }

  return (
    <section className="bg-white">
      캐릭터 추가
      <input
        className="h-8 p-3 rounded-lg"
        placeholder="캐릭터 이름 혹은 APIKEY를 입력해 주세요"
        value={character}
        onChange={handlerChange}
        onKeyDown={handlerSubmit}
      />
      {characterList.map((el) => {
        return (
          <div key={el.character_name}>
            <Image
              width={128}
              height={128}
              src={el.character_image} // 에러 발생 시 기본 이미지로 변경
              alt="대표 캐릭터 이미지"
              priority
            />
            {el.final_stat[0].stat_name}
            {el.character_name}
          </div>
        )
      })}
    </section>
  )
}

export default CharacterSection
