import NoticeListSection from './_components/noticeListSection/NoticeListSection'

import 'swiper/css'
import 'swiper/css/pagination'
import UpdateTableSection from './_components/updateTableSection/UpdateTableSection'

export const dynamic = 'force-dynamic'

const Home = () => {
  return (
    <>
      <div className="w-full h-full py-16">
        <UpdateTableSection />
        <NoticeListSection />
      </div>
    </>
  )
}

export default Home
