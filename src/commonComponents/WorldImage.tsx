import worldIcons from '@/icons/world'
import Image from 'next/image'
import { memo } from 'react'

interface CharacterImagePropsType {
  world_name: string
}

const WorldImage = ({ world_name }: CharacterImagePropsType) => {
  const worldSrc = (worldName: string): string => {
    const reboot: string[] = ['리부트', '리부트2']
    const burning: string[] = ['버닝', '버닝2', '버닝3']

    if (reboot.includes(worldName)) return '리부트'
    if (burning.includes(worldName)) return '버닝'
    return worldName
  }

  return (
    <Image
      src={worldIcons[worldSrc(world_name)]}
      width={14}
      height={14}
      alt="월드 이미지"
    />
  )
}

export default memo(WorldImage)
