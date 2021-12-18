import './sass/frontend.scss'
import '@mdi/font/css/materialdesignicons.css'

import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import store from './plugins/vuex'
import router from './plugins/router'
import i18n from './plugins/i18n'

import './plugins/echo'
import './plugins/externals'

Vue.config.productionTip = false

new Vue({
  vuetify,
  i18n,
  store,
  router,
  render: h => h(App),
}).$mount('#app')
