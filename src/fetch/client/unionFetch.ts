// import axios from 'axios'
// import { Get } from './client'
// import Paths from './path'

// export interface ResponseDataType {
//   data?: UnionResponseType
//   status?: number
//   statusText?: string
//   name?: string
// }

// export interface UnionResponseType {
//   any: any
// }

// interface ResponseErrorDataType {
//   statusText: string
//   status: number
//   name: string
// }

// export const getUnion = async (ocid: string): Promise<ResponseDataType> => {
//   try {
//     const unionResponse = await Get<ResponseDataType>(Paths.union, {
//       params: {
//         ocid,
//       },
//     })
//     return unionResponse.data
//   } catch (error) {
//     if (axios.isAxiosError<ResponseErrorDataType, any>(error)) {
//       return {
//         status: error.response?.status ? error.response.status : 400,
//         statusText: error.response?.data.statusText
//           ? error.response.data.statusText
//           : '에러',
//         name: error.response?.data.name ? error.response.data.name : '에러',
//       }
//     }
//     return {
//       status: 400,
//       statusText: 'An unexpected error occurred',
//     }
//   }
// }
