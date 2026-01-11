import worldIcons from '@/assets/icons/world'
import { KOR_TO_ENG_WORLD } from '@/constants/domain/worldName'
import type { WorldType } from '@/types/domain/game/worldtype'
import Image from 'next/image'
import { memo } from 'react'

interface CharacterImagePropsType {
  worldName: WorldType
  size?: number
}

/** 월드 이미지 컨테이너 */
const WorldImage = ({ worldName, size }: CharacterImagePropsType) => {
  const worldSrc = (world: keyof typeof KOR_TO_ENG_WORLD): string => {
    const burning: string[] = [
      '챌린저스',
      '챌린저스2',
      '챌린저스3',
      '챌린저스4',
    ]
    const special: string[] = ['스페셜', '스페셜2', '스페셜3', '스페셜4']

    if (burning.includes(world)) return KOR_TO_ENG_WORLD[world]
    if (special.includes(world)) return KOR_TO_ENG_WORLD[world]

    return KOR_TO_ENG_WORLD[world]
  }

  return (
    <Image
      src={worldIcons[worldSrc(worldName as keyof typeof KOR_TO_ENG_WORLD)]}
      width={size || 14}
      height={size || 14}
      alt="월드 이미지"
    />
  )
}

export default memo(WorldImage)
