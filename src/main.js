// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import apiConfig from '../config/api.config'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import   uploadFileStatic from './js/uploadFile'
Vue.use(VueAxios,Axios)
Vue.config.debug = true;
Vue.config.productionTip = false
Axios.defaults.baseURL = apiConfig.baseUrl
Axios.defaults.withCredentials=true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
