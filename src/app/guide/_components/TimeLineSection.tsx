import { SERVICE_UPDATE_HISTORY } from '@/constants/serviceUpdateHistory'
import TimeLine from './TimeLine'

const TimeLineSection = () => {
  return (
    <section className="w-full h-full my-16 py-2 px-4 bg-white rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 ">
      <h2 className="font-bold text-lg mb-6">업데이트 내역</h2>
      <TimeLine items={[...SERVICE_UPDATE_HISTORY]} />
    </section>
  )
}

export default TimeLineSection
