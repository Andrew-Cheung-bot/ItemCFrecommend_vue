import Vue from "vue"; //在页面中引入vue.js
import App from "./App.vue"; //引入自定义组件
import router from "./router"; //引入vue route js
import store from "./store";
import Element from "element-ui";
import axios from "axios";
import "element-ui/lib/theme-chalk/index.css";
import "./axios.js";
import echarts from 'echarts';
import "./Permission.js";

Vue.prototype.$echarts=echarts

Vue.use(Element);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  //vue全局实例
  router, //注册路由对象
  store,
  render: h => h(App)
}).$mount("#app"); //绑定Vue实例全局作用范围
