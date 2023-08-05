import axios from "axios";
import Element from "element-ui";
//import router from "./router";
//import store from "./store";

axios.defaults.baseURL = "http://localhost:8080";

//给所有axios请求添加请求头Authorization
axios.interceptors.request.use(
  function(config) {
    var token = localStorage.getItem("token");
    //每次发送请求都需要将jwt放在请求头部，用以认证
    config.headers.common["Authorization"] = token;
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

//前置拦截S
axios.interceptors.request.use(config => {
  return config;
});

axios.interceptors.response.use(
  response => {
    let res = response.data;

    if (res.code === 200) {
      return response;
    } else {
      Element.Message.error(response.data.msg, { duration: 3 * 1000 });
      return Promise.reject(response.data.msg);
    }
  },
  error => {
    if (error.response.data) {
      error.Message = error.response.data.msg;
    }

    //401即没有授权,得跳转到登录页面
    /*
    if (error.response.status == 401) {
      store.commit("REMOVE_INFO");
      router.push("/login");
    }
    */

    Element.Message.error(error.message, { duration: 3 * 1000 });
    return Promise.reject(error);
  }
);
