import { NoticeItem } from '@/types/domain/notice'
import { formatEventPeriod } from '@/utils/setDate'

export interface NoticeSimple {
  title: string
  noticeId: number
  date: string
}

export const mapNoticesToSimpleList = (
  notices: NoticeItem[],
): NoticeSimple[] => {
  return notices.map(({ title, date, noticeId }) => ({
    title,
    noticeId,
    date: date.split('T')[0],
  }))
}

export interface ThumbnailNoticeSimple {
  title: string
  noticeId: number
  thumbnail_url: string
  text: string
}

export const mapThumbnailNoticesToSimpleList = (
  notices: NoticeItem[],
): ThumbnailNoticeSimple[] => {
  return notices
    .map(({ title, noticeId, event, sale }) => {
      if (sale) {
        return {
          title,
          noticeId,
          text: sale.ongoing
            ? '상시판매'
            : formatEventPeriod(sale.start, sale.end),
          thumbnail_url: sale.thumbnail_url,
        }
      }

      if (event) {
        return {
          title,
          noticeId,
          text: formatEventPeriod(event.start, event.end),
          thumbnail_url: event.thumbnail_url,
        }
      }

      return null
    })
    .filter((v): v is ThumbnailNoticeSimple => v !== null)
}
