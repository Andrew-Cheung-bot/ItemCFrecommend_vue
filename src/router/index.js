import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import ForgetPassword from "../views/ForgetPassword.vue";
import RegistSuccess from "../components/Register/RegistSuccess.vue";
import Main from "../views/Main.vue";
import ChangePassword from "../views/ChangePassword.vue";
import ListByCfm from "../views/Main/ListByCfm.vue";
import Default from "../views/Main/Default.vue";
import SearchKeyword from "../views/Main/SearchKeyword.vue";
import Search from "../views/Main/Search.vue";
import ADSearch from "../views/Main/AdvanceSearch/ADSearch.vue";
import BookInfo from "../views/BookInfo.vue";
import UserSetting from "../views/Main/UserSetting.vue";
import Admin from "../views/Admin/Admin.vue";
import AdminMain from "../views/Admin/Main/Main.vue";
import BookManager from "../views/Admin/Main/BookManager.vue";
import AddBook from "../views/Admin/Main/AddBook.vue";
import UserManager from "../views/Admin/Main/UserManager.vue";
import Spider from "../views/Admin/Main/Spider.vue";
import Statistics from "../views/Admin/Main/Statistics.vue";

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/admin/main",
    name: "AdminMain",
    component: AdminMain,
    meta: {
      requireAuth: true
    },
    children:[
      {
        path: "bookmanager",
        name: "BookManager",
        component: BookManager
      },
      {
        path: "addbook",
        name: "AddBook",
        component: AddBook
      },
      {
        path: "usermanager",
        name: "UserManager",
        component: UserManager
      },
      {
        path: "spider",
        name: "Spider",
        component: Spider
      },
      {
        path: "statistics",
        name: "Statistics",
        component: Statistics
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    children: [
      {
        path: "listbycfm",
        name: "ListByCfm",
        component: ListByCfm
      },
      {
        path: "",
        name: "Default",
        component: Default
      },
      {
        path: "searchkeyword",
        name: "SearchKeyword",
        component: SearchKeyword
      },
      {
        path: "bookinfo",
        name: "BookInfo",
        component: BookInfo
      },
      {
        path: "usersetting",
        name: "UserSetting",
        component: UserSetting,
        meta: {
          requireAuth: true
        }
      },
      {
        path: "search",
        name: "Search",
        component: Search,
        children: [
          {
            path: "adsearch",
            name: "ADSearch",
            component: ADSearch
          }
        ]
      }
    ]
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    children: [
      {
        path: "registsuccess",
        component: RegistSuccess
      }
    ]
  },
  {
    path: "/forgetpwd",
    name: "forgetpwd",
    component: ForgetPassword
  },
  {
    path: "/changepwd",
    name: "changepwd",
    component: ChangePassword
  }
  /*
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about"  "../views/About.vue")
  },
  */
];

const router = new VueRouter({
  routes
});

export default router;
