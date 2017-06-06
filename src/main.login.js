import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'

import Login from './Login'
import BaseButton from './components/BaseButton'

// import './styles/icon.css'
// import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)
Vue.use(VueResource)
Vue.component('exButton', BaseButton)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  http: {
    root: '/'
  },
  template: '<login/>',
  components: { Login }
})
