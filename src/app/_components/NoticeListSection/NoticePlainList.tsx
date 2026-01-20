'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Carousel.module.css'

import { NoticeSimple } from '@/app/_utils/mapper'
import { ROUTES } from '@/constants/routers/appRoutes'
import { NoticeType } from '@/types/domain/notice'
import clsx from 'clsx'
import Link from 'next/link'

interface Props {
  title: string
  type: NoticeType
  noticeList: NoticeSimple[]
}

const NoticePlainList = ({ title, type, noticeList }: Props) => {
  return (
    <div className={clsx(styles.pagination, 'w-full')}>
      <h3 className="font-bold text-base mb-2">{title}</h3>
      <Swiper
        className={clsx(styles.root)}
        direction={'vertical'}
        spaceBetween={4}
        slidesPerView={'auto'}
      >
        {noticeList.map((notice) => (
          <SwiperSlide key={notice.title} className="text-sm hover:underline">
            <Link
              href={ROUTES.BOARD.DETAIL(type, notice.noticeId)}
              className="flex gap-1 w-full"
            >
              <p className="min-w-0 flex-1 truncate font-medium">
                {notice.title}
              </p>
              <span className="text-gray-500 shrink-0">{notice.date}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default NoticePlainList
