import Vue from 'vue';
import App from './App.vue';
import vuetify from "@/plugins/vuetify";
import router from "./router/router";
import axios from 'axios';
import jsPDF from 'jspdf'


import 'mdi-icons/css/materialdesignicons.min.css';

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';

new Vue({
  vuetify,
  router,
  jsPDF,
  render: (h) => h(App),
}).$mount('#app')
