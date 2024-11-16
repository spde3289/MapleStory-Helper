import bossIcons from '@/icons/boss'
import Image from 'next/image'

interface BossImagePropsType {
  boss: string
}

const BossImage = ({ boss }: BossImagePropsType) => {
  return (
    <Image src={bossIcons[boss]} width={25} height={25} alt="보스 이미지" />
  )
}

export default BossImage
