import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
  },
  //及时修改state中的数据，不能直接修改state中的数据
  mutations: {
    //set方法
    CHANGE_TO_TRUE(state) {
      state.stopbtn = true;
    },
    CHANGE_TO_FALSE(state) {
      state.stopbtn = false;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    SET_USERINFO(state, userInfo) {
      state.userInfo = userInfo;
      sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
    },
    REMOVE_INFO(state) {
      state.token = "";
      state.userInfo = {};
      localStorage.setItem("token", "");
      sessionStorage.setItem("userInfo", JSON.stringify(""));
    }
  },
  getters: {
    //get方法,但可以直接从state里面获取数据
  },
  //异步处理，例如要延迟5秒再修改等，不能直接在mutations改
  actions: {}
});
