import NoticeFeedSection from './_components/noticeFeedSection/NoticeFeedSection'
import UpdateHistorySection from './_components/updateHistorySection/UpdateHistorySection'

import 'swiper/css'
import 'swiper/css/pagination'

export const dynamic = 'force-dynamic'

const Home = () => {
  return (
    <>
      <div className="w-full h-full py-16">
        <UpdateHistorySection />
        <NoticeFeedSection />
      </div>
    </>
  )
}

export default Home
