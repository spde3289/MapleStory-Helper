import noChar from '@/icons/character/no_char.png'
import Image, { StaticImageData } from 'next/image'
import { memo, useEffect, useState } from 'react'

interface CharacterImagePropsType {
  width?: number
  height?: number
  src: string
}

const CharacterImage = ({
  src,
  width = 128,
  height = 128,
}: CharacterImagePropsType) => {
  const [characterImage, setCharacterImage] = useState<
    string | StaticImageData
  >(noChar)

  useEffect(() => {
    // 캐릭터 정보가 로드되면 이미지 변경
    if (src) setCharacterImage(src)
  }, [src])

  return (
    <Image
      unoptimized={false}
      width={width}
      height={height}
      src={characterImage}
      onError={() => setCharacterImage(noChar)} // 에러 발생 시 기본 이미지로 변경
      alt="대표 캐릭터 이미지"
      priority
    />
  )
}

export default memo(CharacterImage)
