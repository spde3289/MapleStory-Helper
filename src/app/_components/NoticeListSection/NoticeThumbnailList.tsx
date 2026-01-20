'use client'
import styles from './Carousel.module.css'

import { ThumbnailNoticeSimple } from '@/app/_utils/mapper'
import { ROUTES } from '@/constants/routers/appRoutes'
import { NoticeType } from '@/types/domain/notice'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  title: string
  type: NoticeType
  noticeList: ThumbnailNoticeSimple[]
}

const NoticeThumbnailList = ({ title, type, noticeList }: Props) => {
  return (
    <div className={clsx(styles.pagination, 'w-full aspect-auto')}>
      <h3 className="font-bold text-sm mb-2">{title}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs">
        {noticeList.map((notice) => (
          <Link
            key={notice.noticeId}
            href={ROUTES.BOARD.DETAIL(type, notice.noticeId)}
            className="flex flex-col group flex-1 border rounded-md overflow-hidden border-gray-300 dark:border-neutral-700"
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={notice.thumbnail_url}
                fill
                quality={100}
                unoptimized
                className="object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                alt={notice.title}
              />
            </div>
            <div className="p-2">
              <p className="flex-1 truncate font-bold ">{notice.title}</p>
              <span className="text-gray-500 shrink-0 text-xs truncate text-center">
                {notice.text}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default NoticeThumbnailList
