import {
  getCharacterBasic,
  getCharacterOcid,
  getCharacterStat,
} from '@/lib/nexonApi/characterApi'

export interface CharacterFullInfo {
  ocid: string
  userInfo: Awaited<ReturnType<typeof getCharacterBasic>>
  userStat: Awaited<ReturnType<typeof getCharacterStat>>
}

export const fetchCharacterFullInfo = async (characterName: string) => {
  try {
    const { ocid } = await getCharacterOcid(characterName)
    const basicData = await getCharacterBasic(ocid)
    const userStat = await getCharacterStat(ocid)

    return {
      ocid,
      userInfo: basicData,
      userStat,
    }
  } catch (err) {
    throw {
      characterName,
      error: err,
    }
  }
}
