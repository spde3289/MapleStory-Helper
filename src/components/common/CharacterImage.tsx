import noChar from '@/assets/icons/character/no_char.png'
import Image, { StaticImageData } from 'next/image'
import { memo, useEffect, useState } from 'react'

interface CharacterImagePropsType {
  src: string
  // 필요한 경우 추가 스타일을 위한 className prop을 받을 수 있음
  // className?: string
}

/** 캐릭터 이미지 컨테이너 */
const CharacterImage = ({ src }: CharacterImagePropsType) => {
  const [characterImage, setCharacterImage] = useState<
    string | StaticImageData
  >(noChar)

  useEffect(() => {
    // 캐릭터 정보가 로드되면 이미지 변경
    if (src)
      setCharacterImage(
        `https://avatar.maplestory.nexon.com/Character/180/${src.split('/')[7].split('?')[0]}.png`,
      )
  }, [src])

  return (
    // 부모 div에 relative와 w-full, h-full (또는 원하는 높이)를 설정해서 Image의 fill 속성이 동작하게 함
    <div className="relative w-40 h-40 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Image
        unoptimized
        fill
        src={characterImage}
        className="object-cover"
        onError={() => setCharacterImage(noChar)} // 에러 발생 시 기본 이미지로 변경
        alt="대표 캐릭터 이미지"
        priority
      />
    </div>
  )
}

export default memo(CharacterImage)
