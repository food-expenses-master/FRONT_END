import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'], // 경로는 프로젝트 구조에 맞게 조정
  theme: {
    extend: {
      transitionProperty: {
        nav: 'color, background-color, transform',
      },
      transitionTimingFunction: {
        'nav-ease': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'nav-fast': '200ms',
      },
    },
  },
  plugins: [],
}
export default config