// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import jQuery from 'jquery'
import VueRouterPermissions from 'vue-router-permissions'
import store from './store'

global.$ = jQuery

let Bootstrap = require('bootstrap')
import 'bootstrap/dist/css/bootstrap.css'


Vue.use(require('vue-cookies'))

Vue.use(VueRouterPermissions, router)



import VueCookies from 'vue-cookies'

VueCookies.config('7d')

Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
     App
    },
  template: '<App/>'
})



// global register at main.js
import VueCountdownTimer from 'vuejs-countdown-timer'
import './registerServiceWorker'
Vue.use(VueCountdownTimer)


