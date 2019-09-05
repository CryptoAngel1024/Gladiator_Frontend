import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from './router/router'
import AppLayout from '@/layouts/AppLayout.vue'
import AppLayoutMain from '@/layouts/AppLayoutMain.vue'
import AppLayoutDefault from '@/layouts/AppLayoutDefault.vue'
import SvgIcon from '@/components/utils/SvgIcon.vue'
import 'vite-plugin-svg-icons/register'
import VueGtag from 'vue-gtag-next'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

registerSW()

const GA_ID = import.meta.env.VITE_GA_ID

globalThis.vueRouter = router
window.appVersion = import.meta.env.VITE_APP_VERSION

createApp(App)
  .use(router)
  .use(store)
  .use(VueGtag, {
    property: {
      id: GA_ID,
    },
  })
  .component('AppLayout', AppLayout)
  .component('layout-main', AppLayoutMain)
  .component('SvgIcon', SvgIcon)
  .component('layout-default', AppLayoutDefault)
  .mount('#app')
