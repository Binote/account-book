import Vue from 'vue'
// import axios from 'axios'
import iview from 'iview'
import Components from './components'
import 'iview/dist/styles/iview.css'

import App from './App'
import router from './router'
import store from './store'
const send = require('@/../utils/ipc').send
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
// Vue.http = Vue.prototype.$http = axios
Vue.prototype.$send = send
Vue.config.productionTip = false

Vue.use(iview)
Vue.use(Components)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
