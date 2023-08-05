<template>
  <div id="Admin">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">后台管理系统登录</h3>
      <el-form-item prop="uid">
        <el-input
          type="text"
          v-model="ruleForm.uid"
          prop="uid"
          placeholder="请输入用户ID"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          show-password
          placeholder="请输入用户密码"
          v-model="ruleForm.password"
          prop="password"
        ></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click="loginForm('ruleForm')"
          >登录</el-button
        >
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
//import NProgress from 'nprogress'
export default {
  name: "Admin",
  data() {
    return {
      tag: {
        show: false,
        msg: ""
      },
      ruleForm: {
        uid: "",
        password: ""
      },
      rules: {
        uid: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    loginForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          this.$axios.post("/admin/login", this.ruleForm).then(res => {
            //把数据共享到store
            const jwt = res.headers["authorization"];
            const userInfo = res.data.data;
            _this.$store.commit("SET_TOKEN", jwt);
            _this.$store.commit("SET_USERINFO", userInfo);
            //账户授权检测
            this.$axios.get("/admin/checkroles").then(res => {
              console.log(res);
              //页面跳转
              this.$router.push("/admin/main/bookmanager?page=1");
            });
          });
        } else {
          this.tag.msg = "输入不完全!!";
          this.tag.show = true;
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.remember {
  margin: 0px 0px 35px 0px;
}
</style>
