import bossIcons from '@/assets/icons/boss'
import Image from 'next/image'

interface BossImagePropsType {
  boss: string
}

/** 보스 이미지 컨테이너 */
const BossImage = ({ boss }: BossImagePropsType) => {
  return (
    <Image
      quality={100}
      className="w-full h-full object-cover"
      src={bossIcons[boss]}
      alt="보스 이미지"
    />
  )
}

export default BossImage

//   w-full h-full object-cover
