import { WorldType } from '@/type/character/world'

export interface ResponseErrorType {
  statusText: string
  status: number
  error: {
    name: string
    message: string
  }
}

export interface MainCharacterResponse {
  date: string
  character_name: string
  world_name: WorldType
  character_gender: string
  character_class: string
  character_class_level: string
  character_level: number
  character_exp: number
  character_exp_rate: string
  character_guild_name: string
  character_image: string
  character_date_create: string
  access_flag: string
  liberation_quest_clear_flag: string
  ocid: string
  final_stat: {
    stat_name: string
    stat_value: number
  }[]
  remain_ap: number
}

export interface CharacterIdResponse {
  ocid: string
}

export interface BasicResponse {
  date: string
  character_name: string
  world_name: WorldType
  character_gender: string
  character_class: string
  character_class_level: string
  character_level: number
  character_exp: number
  character_exp_rate: string
  character_guild_name: string
  character_image: string
  character_date_create: string
  access_flag: string
  liberation_quest_clear_flag: string
}

export interface StatResponse {
  date: string
  character_class: string
  final_stat: {
    stat_name: string
    stat_value: string
  }[]
  remain_ap: number
}
