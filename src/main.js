import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Vuelidate from 'vuelidate'
import VuePaginate from 'vue-paginate'

Vue.use(Vuelidate)
Vue.use(VuePaginate)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
