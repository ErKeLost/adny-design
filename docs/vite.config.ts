import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vueJsx()],
    server: {
        fs: {
            // 可以为项目根目录的上一级提供服务
            allow: ['../']
        }
    }
})
