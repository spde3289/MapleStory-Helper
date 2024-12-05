import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // fontFamily: {
      //   mapleStory: ["var(--font-MapleStory)"],
      // },
      screens: {
        xs: { max: '1023px' }, // 1023px 이하에서만 적용
        xxs: { max: '880px' }, // 900px 이하에서만 적용
        xxxs: { max: '650px' }, // 790px 이하에서만 적용
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
}
export default config
