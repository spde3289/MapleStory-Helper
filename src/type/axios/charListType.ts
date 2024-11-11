export interface CharListResponse {
  account_list: {
    account_id: string
    character_list: {
      ocid: string
      character_name: string
      world_name: string
      character_class: string
      character_level: number
    }[]
  }[]
}

export type CharList = {
  ocid: string
  character_name: string
  world_name: string
  character_class: string
  character_level: number
}[]
