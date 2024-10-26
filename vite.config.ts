import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(() => {
  // const rootPath = path.resolve(process.cwd());
  // const srcPath = `${rootPath}/src`;
  return {
    plugins: [react()],
    resolve: {
      // alias: {
      //   "~": srcPath,
      //   "@": rootPath,
      // },
      alias: { '@': path.resolve(__dirname, './src') },
    },
  };
});
