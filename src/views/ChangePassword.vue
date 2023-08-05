<template>
  <div id="ChangePassword">
    <LoginIcon></LoginIcon>
    <div id="changepwdpage">
      <div style="margin-bottom:30px">
        <span style="font-size: 40px;">设置新密码</span>
        <span style="float: right;line-height: 70px;"
          >想起密码？
          <el-link type="primary" href="#/login" style="line-height: 20px"
            >立即登录</el-link
          >
        </span>
        <div>
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="password">
              <el-input
                show-password
                placeholder="请输入新密码"
                v-model="ruleForm.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="submitForm('ruleForm')"
                style="margin-top:20px;width:100%"
                type="warning"
                >重置密码</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginIcon from "../components/LoginIcon.vue";

export default {
  name: "ChangePassword",
  components: {
    LoginIcon
  },
  data() {
    return {
      ruleForm: {
        password: ""
      },
      rules: {
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/account/change", this.ruleForm, {
              params: { code: this.$route.query.code }
            })
            .then(res => {
              console.log(res);
              this.$router.push("/login");
            });
        } else {
          console.log("错误的提交表单!!");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
#changepwdpage {
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
</style>
