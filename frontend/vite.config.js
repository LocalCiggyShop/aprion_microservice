import { fileURLToPath, URL } from 'node:url'
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// const plugins = [];

// if(process.env.NODE_ENV === 'production') {
//     const {join} = require('path')
//     const PrerenderSPAPlugin = require('prerender-spa-plugin')
//     const renderer = PrerenderSPAPlugin.PuppeteerRenderer;
    
//     plugins.unshift(
//         new PrerenderSPAPlugin({
//         staticDir: join(__dirname, 'dist'),
//         routes: ['/', '/register'],
//         renderer: new renderer({})
//     })
//     )
// }

// https://vitejs.dev/config/
export default defineConfig({
  // configureWebpack(config) {
  //   config.plugins = [
  //       ...config.plugins,
  //       ...plugins
  //   ]
  // },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000
  }
  //publicDir: "",
  // devServer: {
  //   // proxy: "http://localhost:3001",
  //   https: false,
  //   host: "0.0.0.0",
  //   public: "localhost:3001",
  //   port: 3001
  // }
})
