import type { NoticeDetail, NoticeType } from '@/types/domain/notice'

import type {
  CashshopNoticeDetailResponse,
  EventNoticeDetailResponse,
  NoticeDetailResponse,
} from '@/types/nexon/notice'
import {
  getCashshopDetailNotice,
  getDetailNotice,
  getEventDetailNotice,
  getUpdateDetailNotice,
} from '../nexonApi/noticeApi'

export const normalizeNoticeDetail = (
  type: NoticeType,
  noticeId: number,
  data:
    | NoticeDetailResponse
    | EventNoticeDetailResponse
    | CashshopNoticeDetailResponse,
): NoticeDetail => {
  switch (type) {
    case 'notice':
    case 'update': {
      const d = data as NoticeDetailResponse
      return {
        type,
        noticeId,
        title: d.title,
        url: d.url,
        contents: d.contents,
        date: d.date,
      }
    }

    case 'event': {
      const d = data as EventNoticeDetailResponse
      return {
        type,
        noticeId,
        title: d.title,
        url: d.url,
        contents: d.contents,
        date: d.date,
        event: {
          start: d.date_event_start,
          end: d.date_event_end,
        },
      }
    }

    case 'cashshop': {
      const d = data as CashshopNoticeDetailResponse
      return {
        type,
        noticeId,
        title: d.title,
        url: d.url,
        contents: d.contents,
        date: d.date,
        sale: {
          start: d.date_sale_start,
          end: d.date_sale_end,
          ongoing: d.ongoing_flag === 'true',
        },
      }
    }

    default: {
      const exhaustive: never = type
      return exhaustive
    }
  }
}

export const getNoticeByType = (type: NoticeType, noticeId: number) => {
  switch (type) {
    case 'notice':
      return getDetailNotice(noticeId)
    case 'update':
      return getUpdateDetailNotice(noticeId)
    case 'event':
      return getEventDetailNotice(noticeId)
    case 'cashshop':
      return getCashshopDetailNotice(noticeId)
    default: {
      const exhaustive: never = type
      return exhaustive
    }
  }
}

export const buildNotice = async (
  type: NoticeType,
  noticeId: number,
): Promise<NoticeDetail> => {
  const data = await getNoticeByType(type, noticeId)

  return normalizeNoticeDetail(type, noticeId, data)
}
