import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'

import { bulmaConfig } from '@oruga-ui/theme-bulma'
import '@oruga-ui/theme-bulma/dist/bulma.css'

import JsonExcel from "vue-json-excel";
Vue.component("downloadExcel", JsonExcel);

Vue.use(Oruga, bulmaConfig)
Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
