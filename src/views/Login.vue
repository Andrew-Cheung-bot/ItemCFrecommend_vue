<template>
  <div id="Login">
    <LoginIcon></LoginIcon>
    <div id="loginpage">
      <div style="margin-bottom:30px">
        <span style="font-size: 40px;">登录</span>
        <span style="float: right;line-height: 70px;"
          >没有账号？
          <el-link type="primary" href="#/signup" style="line-height: 20px"
            >立即注册</el-link
          >
        </span>
      </div>
      <el-alert v-show="tag.show" :title="tag.msg" type="error" effect="dark">
      </el-alert>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="uid">
          <el-input
            placeholder="请输入用户ID"
            v-model="ruleForm.uid"
            prop="uid"
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
        <el-form-item>
          <el-button
            type="primary"
            @click="loginForm('ruleForm')"
            style="width: 100%;font-size: 20px;margin-left: 0px;"
            >登录</el-button
          >
          <el-button
            plain
            @click="toMain"
            style="width: 100%;font-size: 20px;margin-left: 0px;margin-top: 20px;"
            >以游客身份登录</el-button
          >
        </el-form-item>
      </el-form>

      <div id="forgetpw">
        <el-link type="primary" href="#/forgetpwd" style="text-align:center"
          >已有账号，忘记密码？</el-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import LoginIcon from "../components/LoginIcon.vue";

export default {
  name: "Login",
  components: {
    LoginIcon
  },
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
    toMain() {
      this.$store.commit("SET_TOKEN", "");
      this.$store.commit("SET_USERINFO", "");
      this.$router.push("/main");
    },
    loginForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          this.$axios.post("/account/login", this.ruleForm).then(res => {
            //把数据共享到store
            const jwt = res.headers["authorization"];
            const userInfo = res.data.data;
            _this.$store.commit("SET_TOKEN", jwt);
            _this.$store.commit("SET_USERINFO", userInfo);
            //账户授权检测
            this.$axios.get("/account/checkroles").then(res => {
              console.log(res);
              //页面跳转
              this.$router.push("/main");
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
#loginpage {
  position: absolute;
  top: 60px;
  left: 810px;
  padding: 80px 50px;
  width: 480px;
  height: 480px;
  text-align: left;
  background: #e2e9e5;
  box-shadow: 0 0 25px #cac6c6;
}
.demo-ruleForm {
  text-align: center;
  margin-top: 20px;
}
#forgetpw {
  text-align: center;
  margin-top: 17px;
}
</style>
