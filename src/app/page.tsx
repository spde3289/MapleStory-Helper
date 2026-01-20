import NoticeListSection from './_components/noticeListSection/NoticeListSection'

import 'swiper/css'
import 'swiper/css/pagination'

export const dynamic = 'force-dynamic'

const Home = () => {
  return (
    <>
      <div className="w-full h-full py-16">
        <NoticeListSection />
      </div>
    </>
  )
}

export default Home
