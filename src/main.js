import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

import App from './App'
import router from './router'
import timeFilter from './libs/timeFilter'
import PlaceHolder from './components/PlaceHolder'
import Loading from './components/Loading'
import 'animate.css'
import './styles/icon.css'
import '../theme/index.css'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.component('PlaceHolder', PlaceHolder)
Vue.component('Loading', Loading)
Vue.filter('timeFilter', timeFilter)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  http: {
    root: '/'
  },
  template: '<App/>',
  components: { App }
})
