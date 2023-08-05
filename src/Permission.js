import router from "./router";

//路由判断登录，根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    //判断该路由是否需要登录权限
    const token = localStorage.getItem("token");
    //console.log("==========" + token);

    if (token) {
      //判断当前的token是否存在 ； 登录存入的token
      if (to.path === "/login") {
        //console.log("通过");
      } else {
        //console.log("==========1");
        next();
      }
    } else {
      if (to.path === "main/usersetting") {
        next({
          path: "/login"
        });
      } else {
        next({
          path: "/admin"
        });
      }
    }
  } else {
    next();
  }
});
