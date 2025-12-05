const woridIcons: { [key: string]: string } = {}

export const KOR_TO_ENG = {
  노바: 'noba',
  레드: 'red',
  루나: 'luna',
  리부트: 'reboot',
  버닝: 'burning',
  베라: 'bera',
  스카니아: 'scania',
  아케인: 'arcane',
  에오스: 'eos',
  엘리시움: 'elysium',
  오로라: 'aurora',
  유니온: 'union',
  이노시스: 'inosys',
  제니스: 'zenith',
  챌린저스: 'challengers',
  크로아: 'croa',
  핼리오스: 'helios',
  스페셜: 'special',
}

declare const require: {
  context(
    path: string,
    deep?: boolean,
    filter?: RegExp,
  ): {
    keys(): string[]
    <T>(id: string): T
  }
}

function importAll(r: ReturnType<typeof require.context>) {
  r.keys().forEach((fileName: string) => {
    const key = fileName.replace('./', '').replace(/\.[^/.]+$/, '') // 파일명만 추출
    woridIcons[key] = (r(fileName) as { default: string }).default
  })
}

// woridIcons 폴더 내 모든 png 파일을 import
importAll(require.context('./', false, /\.png$/))

export default woridIcons
