'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Carousel.module.css'

import { NoticeSimple } from '@/app/_utils/mapper'
import clsx from 'clsx'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Autoplay, Mousewheel, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'

interface Props {
  title: string
  noticeList: NoticeSimple[]
}

const NoticePlainList = ({ title, noticeList }: Props) => {
  const paginationRef = useRef<HTMLDivElement | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    if (!swiperRef.current || !paginationRef.current) return

    const swiper = swiperRef.current

    const paginationParams =
      typeof swiper.params.pagination === 'object'
        ? swiper.params.pagination
        : {}

    swiper.params.pagination = {
      ...paginationParams,
      el: paginationRef.current,
      clickable: true,
    }

    swiper.pagination.destroy()
    swiper.pagination.init()
    swiper.pagination.render()
    swiper.pagination.update()
  }, [])

  return (
    <div className={clsx(styles.pagination, 'w-full')}>
      <h3 className="font-medium text-zinc-500 text-sm">{title}</h3>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        className={clsx(styles.root, 'h-32')}
        direction={'vertical'}
        spaceBetween={2}
        slidesPerView={'auto'}
        loop
        mousewheel
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          el: paginationRef.current,
          clickable: true,
        }}
        modules={[Mousewheel, Pagination, Autoplay]}
      >
        {noticeList.map((notice) => (
          <SwiperSlide key={notice.title} className="text-sm hover:underline">
            <Link href={`${notice.noticeId}`} className="flex gap-1 w-full">
              <span className="text-gray-500 shrink-0">{notice.date}</span>
              <span className="min-w-0 flex-1 truncate">{notice.title}</span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={paginationRef} />
    </div>
  )
}

export default NoticePlainList
