import Vue from 'vue';
import App from './App.vue';
import vuetify from "@/plugins/vuetify";
import router from "./router/router";
import axios from 'axios';
import jsPDF from 'jspdf'
// import 'toastr/build/toastr.min.css'
// import 'toastr/build/toastr.min.js'
// import Toastr from 'toastr/build/toastr.min.js';

// import VueToast from 'vue-toastification';



import 'mdi-icons/css/materialdesignicons.min.css';

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';

new Vue({
  vuetify,
  router,
  jsPDF,
  // Toastr,
  render: (h) => h(App),
}).$mount('#app')
