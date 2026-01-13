'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './Carousel.module.css'

import { ThumbnailNoticeSimple } from '@/app/_utils/mapper'
import { ROUTES } from '@/constants/routers/appRoutes'
import { NoticeType } from '@/types/domain/notice'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Autoplay, FreeMode, Mousewheel, Pagination } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'

interface Props {
  title: string
  type: NoticeType
  noticeList: ThumbnailNoticeSimple[]
}

const NoticeThumbnailList = ({ title, type, noticeList }: Props) => {
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
    <div className={clsx(styles.pagination, 'w-full aspect-auto')}>
      <h3 className="font-medium text-zinc-500 text-sm">{title}</h3>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        navigation={true}
        className={clsx(styles.root)}
        spaceBetween={16}
        freeMode={true}
        slidesPerView={3}
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
        modules={[Mousewheel, Pagination, Autoplay, FreeMode]}
      >
        {noticeList.map((notice) => (
          <SwiperSlide
            key={notice.title}
            className="text-sm hover:underline h-fit"
          >
            <Link
              href={ROUTES.BOARD.DETAIL(type, notice.noticeId)}
              className="flex flex-col group"
            >
              <div className="relative aspect-video rounded-md overflow-hidden ">
                <Image
                  src={notice.thumbnail_url}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300 ease-out"
                  alt={notice.title}
                />
              </div>
              <span className="flex-1 truncate">{notice.title}</span>
              <span className="text-gray-500 shrink-0 text-xs truncate text-center">
                {notice.text}
              </span>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div ref={paginationRef} />
    </div>
  )
}

export default NoticeThumbnailList
