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

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 200 && response.body.data === 'permission') {
      Vue.prototype.$alert('未登录或登录已超时,请重新登录.点击确定返回登录页面', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          window.location.replace(`http://${window.location.host}/login`)
        }
      })
    }
  })
})

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
