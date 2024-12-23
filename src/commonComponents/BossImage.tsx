import bossIcons from '@/icons/boss'
import Image from 'next/image'

interface BossImagePropsType {
  boss: string
  className?: string
}

const BossImage = ({ boss, className = '' }: BossImagePropsType) => {
  return (
    <Image
      unoptimized={boss === 'BlackMage'}
      className={className}
      src={bossIcons[boss]}
      width={25}
      height={25}
      alt="보스 이미지"
    />
  )
}

export default BossImage
