export const getCharacterName = (): string | null => {
  return localStorage.getItem('characterName')
}

export const setCharacterName = (character_name: string) => {
  localStorage.setItem('characterName', character_name)
}

export const removeCharacterName = () => {
  localStorage.removeItem('characterName')
}
