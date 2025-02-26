import noChar from '@/assets/icons/character/no_char.png'
import Image, { StaticImageData } from 'next/image'
import { memo, useEffect, useState } from 'react'

interface CharacterImagePropsType {
  src: string
  // 필요한 경우 추가 스타일을 위한 className prop을 받을 수 있음
  className?: string
}

/** 캐릭터 이미지 컨테이너 */
const CharacterImage = ({ src, className = '' }: CharacterImagePropsType) => {
  const [characterImage, setCharacterImage] = useState<
    string | StaticImageData
  >(noChar)

  useEffect(() => {
    // 캐릭터 정보가 로드되면 이미지 변경
    if (src) setCharacterImage(src)
  }, [src])

  return (
    // 부모 div에 relative와 w-full, h-full (또는 원하는 높이)를 설정해서 Image의 fill 속성이 동작하게 함
    <div className={`relative w-full h-full ${className}`}>
      <Image
        unoptimized
        fill
        src={characterImage}
        onError={() => setCharacterImage(noChar)} // 에러 발생 시 기본 이미지로 변경
        alt="대표 캐릭터 이미지"
        priority
        // objectFit을 'contain'으로 지정하면 이미지 비율을 유지하며 컨테이너 내에 맞춤
        style={{ objectFit: 'contain' }}
      />
    </div>
  )
}

export default memo(CharacterImage)
