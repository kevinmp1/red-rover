import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ImagePage from "./components/ImagePage";
import HomePage from "./components/HomePage";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const token = "v3AqJhzni7HLy5MJ8rUQGAx61xCyxbCySRcIzgsC";

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/rovers/curiosity/images', name: 'curiosity', component: ImagePage, props: {rover: "curiosity", token: token} },
    { path: '/rovers/spirit/images', name: 'spirit', component: ImagePage, props: {rover: "spirit", token: token} },
    { path: '/rovers/opportunity/images', name: 'opportunity', component: ImagePage, props: {rover: "opportunity", token: token}  }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
