import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/App.vue';
import Vuetify from 'vuetify';
import router from './router';
import 'vuetify/dist/vuetify.css';
import store from './store';

Vue.use(Vuetify);
Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
