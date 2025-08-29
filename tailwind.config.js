// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        // 기본 sans 폰트를 Pretendard로 설정
        // defaultTheme.fontFamily.sans를 뒤에 추가하면 Pretendard 폰트가 없을 때 기본 sans 폰트로 fallback 됩니다.
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
