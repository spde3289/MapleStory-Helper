import { BiErrorCircle } from 'react-icons/bi'

interface Props {
  isVisible: boolean
  overRatio: number
  remainingRatio: number
}

const BannerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center w-full my-2 py-1.5 px-4 text-sm text-gray-900 bg-red-100">
      <BiErrorCircle size={24} fill="red" className="mr-3" />
      {children}
    </div>
  )
}

const AllocationStatusBanner = ({
  isVisible,
  overRatio,
  remainingRatio,
}: Props) => {
  if (!isVisible) {
    return <div className="w-full bg-gray-300 dark:bg-neutral-700 my-4" />
  }

  if (overRatio > 0) {
    return (
      <BannerLayout>
        <span>
          비율의 합이 100%가 되야 합니다. (초과 된 비율 : {overRatio}%)
        </span>
      </BannerLayout>
    )
  }

  return (
    <BannerLayout>
      <div className="flex gap-3">
        <span>남은 비율 : {remainingRatio}</span>
      </div>
    </BannerLayout>
  )
}

export default AllocationStatusBanner
