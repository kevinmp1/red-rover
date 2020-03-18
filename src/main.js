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
    { path: '/rovers/curiosity/images', name: 'curiosity', component: ImagePage, props: {rover: "curiosity", token: token, start: new Date(2012, 7, 6), end: new Date(2019, 8, 28) }},
    { path: '/rovers/spirit/images', name: 'spirit', component: ImagePage, props: {rover: "spirit", token: token, start: new Date(2004, 0, 4), end: new Date(2010, 2, 21) } },
    { path: '/rovers/opportunity/images', name: 'opportunity', component: ImagePage, props: {rover: "opportunity", token: token, start: new Date(2004, 0, 25), end: new Date(2018, 5, 11) }  }
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
