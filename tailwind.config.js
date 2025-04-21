import tailwindcssAnimate from 'tailwindcss-animate'

module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',
  ],
  // * 다크모드 활성화 여부
  // - false: 다크모드 비활성화 / media: OS/브라우저 설정에 따른 다크모드 자동 적용 / class: 직접 클래스(dark)를 추가해서 다크모드 적용
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [tailwindcssAnimate],
}
