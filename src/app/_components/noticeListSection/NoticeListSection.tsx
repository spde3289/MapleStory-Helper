import {
  mapNoticesToSimpleList,
  mapThumbnailNoticesToSimpleList,
} from '@/app/_utils/mapper'
import { fetchNoticeList } from '@/lib/client/noticeClient'
import clsx from 'clsx'
import NoticePlainList from './NoticePlainList'
import NoticeThumbnailList from './NoticeThumbnailList'

const NoticeListSection = async () => {
  const noticeList = await fetchNoticeList({ type: 'notice' }).catch(() => ({
    items: [],
    type: 'notice' as const,
  }))
  const updateNoticeList = await fetchNoticeList({ type: 'update' }).catch(
    () => ({ items: [], type: 'update' as const }),
  )
  const eventNoticeList = await fetchNoticeList({ type: 'event' }).catch(
    () => ({ items: [], type: 'event' as const }),
  )
  const cashshopNoticeList = await fetchNoticeList({ type: 'cashshop' }).catch(
    () => ({ items: [], type: 'cashshop' as const }),
  )

  return (
    <section
      className={clsx(
        'bg-white py-2 px-4 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 ',
      )}
    >
      <div className={clsx('grid grid-cols-1 sm:grid-cols-2 gap-x-7 text-xs')}>
        <NoticePlainList
          title="공지사항"
          type={noticeList.type}
          noticeList={mapNoticesToSimpleList(noticeList.items)}
        />
        <div className=" sm:hidden w-full my-4 h-[1px] bg-gray-300 dark:bg-neutral-700 " />
        <NoticePlainList
          title="업데이트"
          type={updateNoticeList.type}
          noticeList={mapNoticesToSimpleList(updateNoticeList?.items)}
        />
      </div>
      <div className="w-full my-4 sm:my-6 h-[1px] bg-gray-300 dark:bg-neutral-700 " />
      <div className={clsx('flex flex-col')}>
        <NoticeThumbnailList
          title="진행중인 이벤트"
          type={eventNoticeList?.type}
          noticeList={mapThumbnailNoticesToSimpleList(eventNoticeList.items)}
        />
        <div className="w-full my-4 sm:my-6 h-[1px] bg-gray-300 dark:bg-neutral-700 " />
        <NoticeThumbnailList
          title="캐시샵 공지"
          type={cashshopNoticeList?.type}
          noticeList={mapThumbnailNoticesToSimpleList(cashshopNoticeList.items)}
        />
      </div>
    </section>
  )
}

export default NoticeListSection
