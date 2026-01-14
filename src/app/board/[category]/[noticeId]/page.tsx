import { fetchNotice } from '@/lib/client/noticeClient'
import NoticeHtml from './_components/NoticeHtml'

type Category = 'notice' | 'update' | 'event' | 'cashshop'

interface Props {
  params: Promise<{
    category: Category
    noticeId: string
  }>
}

const NoticeDetailPage = async ({ params }: Props) => {
  const { noticeId, category } = await params

  const notice = await fetchNotice(Number(noticeId), {
    type: category,
  })

  return (
    <>
      <div className="w-full h-full my-16 py-2 bg-white rounded-md border border-gray-200 dark:border-neutral-700 dark:bg-neutral-800 ">
        <h2 className="text-lg font-semibold border-b py-2 pl-4">
          {notice.title}
        </h2>
        <NoticeHtml contents={notice.contents} />
        <div className="border-t py-2 pl-4 text-sm">
          원본 링크{' '}
          <a className=" text-[#6d62a1]" href={notice.url}>
            {notice.url}
          </a>
        </div>
      </div>
    </>
  )
}

export default NoticeDetailPage
