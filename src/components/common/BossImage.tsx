import bossIcons from '@/assets/icons/boss'
import Image from 'next/image'

interface BossImagePropsType {
  boss: string
  className?: string
  size?: number
}

/** 보스 이미지 컨테이너 */
const BossImage = ({ boss, className = '', size = 25 }: BossImagePropsType) => {
  return (
    <Image
      unoptimized={boss === 'BlackMage'}
      className={className}
      src={bossIcons[boss]}
      width={size}
      height={size}
      alt="보스 이미지"
    />
  )
}

export default BossImage
