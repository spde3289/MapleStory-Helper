import { MAPLESTORY_NOTICE_API } from '@/constants/routers/mapleEndpoints'
import {
  CashshopNoticeDetailResponse,
  CashshopNoticeListResponse,
  EventNoticeDetailResponse,
  EventNoticeListResponse,
  NoticeDetailResponse,
  NoticeListResponse,
  UpdateNoticeListResponse,
} from '@/types/nexon/notice'
import { nexonClient } from './nexonClient'

/** 일반 공지 리스트 */
export const getNoticeList = async (): Promise<NoticeListResponse> => {
  const response = await nexonClient.get<NoticeListResponse>(
    MAPLESTORY_NOTICE_API.NOTICE.LIST,
  )

  return response.data
}

/** 일반 공지 상세보기 */
export const getDetailNotice = async (
  notice_id: string,
): Promise<NoticeDetailResponse> => {
  const response = await nexonClient.get<NoticeDetailResponse>(
    MAPLESTORY_NOTICE_API.NOTICE.DETAIL,
    { params: { notice_id } },
  )

  return response.data
}

/** 업데이트 공지 리스트 */
export const getUpdateNoticeList =
  async (): Promise<UpdateNoticeListResponse> => {
    const response = await nexonClient.get<UpdateNoticeListResponse>(
      MAPLESTORY_NOTICE_API.UPDATE.LIST,
    )

    return response.data
  }

/** 업데이트 공지 상세보기 */
export const getUpdateDetailNotice = async (
  notice_id: string,
): Promise<NoticeDetailResponse> => {
  const response = await nexonClient.get<NoticeDetailResponse>(
    MAPLESTORY_NOTICE_API.UPDATE.DETAIL,
    { params: { notice_id } },
  )

  return response.data
}

/** 이벤트 공지 리스트 */
export const getEventNoticeList =
  async (): Promise<EventNoticeListResponse> => {
    const response = await nexonClient.get<EventNoticeListResponse>(
      MAPLESTORY_NOTICE_API.EVENT.LIST,
    )

    return response.data
  }

/** 이벤트 공지 상세보기 */
export const getEventDetailNotice = async (
  notice_id: string,
): Promise<EventNoticeDetailResponse> => {
  const response = await nexonClient.get<EventNoticeDetailResponse>(
    MAPLESTORY_NOTICE_API.EVENT.DETAIL,
    { params: { notice_id } },
  )

  return response.data
}

/** 캐시샵 공지 리스트 */
export const getCashshopNoticeList =
  async (): Promise<CashshopNoticeListResponse> => {
    const response = await nexonClient.get<CashshopNoticeListResponse>(
      MAPLESTORY_NOTICE_API.CASHSHOP.LIST,
    )

    return response.data
  }

/** 캐시샵 공지 상세보기 */
export const getCashshopDetailNotice = async (
  notice_id: string,
): Promise<CashshopNoticeDetailResponse> => {
  const response = await nexonClient.get<CashshopNoticeDetailResponse>(
    MAPLESTORY_NOTICE_API.CASHSHOP.DETAIL,
    { params: { notice_id } },
  )

  return response.data
}
