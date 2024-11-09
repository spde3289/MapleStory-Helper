import { useMainCharacterContext } from '@/context/characterContext'
import noChar from '@/icons/character/no_char.png'
import worldIcons from '@/icons/world'
import { deleteCookie } from 'cookies-next'
import Image, { StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import SearchCharacter from './SearchCharacter'

const CharacterCreator = () => {
  const { mainCharacter, setMainCharacter } = useMainCharacterContext()
  const [charScr, setCharScr] = useState<string | StaticImageData>(noChar)

  useEffect(() => {
    // 캐릭터 정보가 로드되면 이미지 변경
    if (mainCharacter) setCharScr(mainCharacter?.character_image)
  }, [mainCharacter])

  const worldSrc = (worldName: string): string => {
    const reboot: string[] = ['리부트', '리부트2']
    const burning: string[] = ['버닝', '버닝2', '버닝3']

    if (reboot.includes(worldName)) return '리부트'
    if (burning.includes(worldName)) return '버닝'
    return worldName
  }

  if (mainCharacter === null) return <SearchCharacter />

  return (
    <div className="w-40 h-full py-3 bg-white flex flex-col items-center rounded-xl">
      <div className="relative w-32 h-32 mb-2 bg-gray-300 rounded-full">
        <Image
          width={128}
          height={128}
          src={charScr}
          onError={() => setCharScr(noChar)} // 에러 발생 시 기본 이미지로 변경
          alt="대표 캐릭터 이미지"
          priority
        />
      </div>
      <div className="text-center">{mainCharacter.character_name}</div>
      <div className="flex gap-2 text-sm">
        <div className="flex items-center gap-1">
          <Image
            className=""
            src={worldIcons[worldSrc(mainCharacter.world_name)]}
            width={14}
            height={14}
            alt="대표 캐릭터 이미지"
          />
          {mainCharacter.world_name}
        </div>
        <div>{mainCharacter.character_guild_name}</div>
      </div>
      <div className="flex gap-10 mt-3">
        <button
          type="button"
          onClick={() => {
            setMainCharacter(null)
            deleteCookie('ocid')
          }}
          className="relative hover:after:content-['삭제'] after:absolute after:w-12 after:-translate-x-1/2 after:left-1/2 after:top-10 after:bg-gray-700 after:text-white after:text-sm hover:after:px-2 hover:after:py-1 after:rounded-md"
        >
          <FaRegTrashAlt className="text-red-700" />
        </button>
      </div>
    </div>
  )
}

export default CharacterCreator
