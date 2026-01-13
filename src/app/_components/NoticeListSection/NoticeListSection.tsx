import {
  mapNoticesToSimpleList,
  mapThumbnailNoticesToSimpleList,
} from '@/app/_utils/mapper'
import { fetchNoticeList } from '@/lib/client/noticeClient'
import clsx from 'clsx'
import NoticePlainList from './NoticePlainList'
import NoticeThumbnailList from './NoticeThumbnailList'

const NoticeListSection = async () => {
  const noticeList = await fetchNoticeList({ type: 'notice' })
  const updateNoticeList = await fetchNoticeList({ type: 'update' })
  const eventNoticeList = await fetchNoticeList({ type: 'event' })
  const cashshopNoticeList = await fetchNoticeList({ type: 'cashshop' })

  return (
    <section
      className={clsx(
        'bg-white py-2 px-4 rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 ',
      )}
    >
      <div className={clsx(' ')}>
        <div
          className={clsx(
            'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs',
          )}
        >
          <NoticePlainList
            title="공지사항"
            noticeList={mapNoticesToSimpleList(noticeList.items)}
          />
          <NoticePlainList
            title="업데이트"
            noticeList={mapNoticesToSimpleList(updateNoticeList.items)}
          />
        </div>
        <div className="w-full my-2 h-[1px] bg-gray-200 dark:bg-neutral-700 " />
        <div
          className={clsx(
            'grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs',
          )}
        >
          <NoticeThumbnailList
            title="이벤트"
            noticeList={mapThumbnailNoticesToSimpleList(eventNoticeList.items)}
          />
          <NoticeThumbnailList
            title="캐시샵"
            noticeList={mapThumbnailNoticesToSimpleList(
              cashshopNoticeList.items,
            )}
          />
        </div>
      </div>
    </section>
  )
}

export default NoticeListSection
