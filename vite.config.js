import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        // 기본 옵션
        icon: true, // SVG를 React 컴포넌트처럼 사용할 때 유용
        exportType: 'named', // named export 사용
      },
    }),
    tailwindcss(),
  ],
});
