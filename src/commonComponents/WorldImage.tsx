import worldIcons from '@/icons/world'
import Image from 'next/image'
import { memo } from 'react'

interface CharacterImagePropsType {
  world_name: string
}

const WorldImage = ({ world_name }: CharacterImagePropsType) => {
  const worldSrc = (worldName: string): string => {
    const burning: string[] = ['버닝', '버닝2', '버닝3']

    if (burning.includes(worldName)) return '버닝'
    return worldName
  }

  return (
    <Image
      unoptimized={world_name === '에오스' || world_name === '핼리오스'}
      src={worldIcons[worldSrc(world_name)]}
      width={14}
      height={14}
      alt="월드 이미지"
    />
  )
}

export default memo(WorldImage)
