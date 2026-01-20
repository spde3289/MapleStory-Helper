import NoticeListSection from './_components/noticeListSection/NoticeListSection'

import 'swiper/css'
import 'swiper/css/pagination'
import TimeLineSection from './_components/timeLineSection/TimeLineSection'

export const dynamic = 'force-dynamic'

const Home = () => {
  return (
    <>
      <div className="w-full h-full py-16">
        <TimeLineSection />
        <NoticeListSection />
      </div>
    </>
  )
}

export default Home
