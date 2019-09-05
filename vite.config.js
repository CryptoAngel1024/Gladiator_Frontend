/*eslint-env node*/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteSvgIcons from 'vite-plugin-svg-icons'
import apiConstants from './src/api/apiConstants'
import { VitePWA } from 'vite-plugin-pwa'

const aliases = {
  mock: [
    { find: '@/api/httpClient.js', replacement: './src/api/httpClient.js' },
    { find: '@/api/support.api', replacement: './src/api/support.api.js' },
    { find: '@/api', replacement: './src/api/__mocks__' },
    {
      find: 'aws-amplify',
      replacement: './tests/__mocks__/aws-amplify.mock.js',
    },
    {
      find: /^@aws-amplify\/(.*)$/,
      replacement: './tests/__mocks__/@aws-amplify/$1.mock.js',
    },
  ],
}

const pkg = require('./package.json')
process.env.VITE_APP_VERSION = pkg.version

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteSvgIcons({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), './src/assets/svgIcons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    VitePWA(),
  ],
  resolve: {
    alias: [
      ...[
        ...(aliases[process.env.VITE_STAGE] || []),
        { find: '@', replacement: './src' },
        { find: '@tests', replacement: './tests' },
      ].map(({ find, replacement }) => ({
        find,
        replacement: path.resolve(__dirname, replacement),
      })),
      { find: './runtimeConfig', replacement: './runtimeConfig.browser' },
    ],
  },
  server: {
    clearScreen: false,

    proxy: {
      '/api/ga': {
        target: apiConstants(process.env.VITE_STAGE).VITE_GA_ENDPOINT,
        changeOrigin: true,
        secure: true,
        // configure: (proxy) => {
        //   proxy.on('proxyRes', function (proxyRes) {
        //     // eslint-disable-next-line no-console
        //     console.log('proxyRes', proxyRes)
        //   })
        // },
      },
      '/api': {
        target: apiConstants(process.env.VITE_STAGE).VITE_API_ENDPOINT,
        changeOrigin: true,
        secure: true,
        // configure: (proxy) => {
        //   proxy.on('proxyRes', function (proxyRes) {
        //     // eslint-disable-next-line no-console
        //     console.log('proxyRes', proxyRes)
        //   })
        // },
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
})
