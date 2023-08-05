<template>
  <div id="ForgetPassword">
    <LoginIcon></LoginIcon>
    <div id="changepwdpage">
      <div style="margin-bottom:30px">
        <span style="font-size: 40px;">忘记密码</span>
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
            <el-form-item prop="uid">
              <el-input
                placeholder="请输入注册用户ID"
                v-model="ruleForm.uid"
              ></el-input>
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                placeholder="请输入注册邮箱"
                v-model="ruleForm.email"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="submitForm('ruleForm')"
                style="margin-top:20px;width:100%"
                type="warning"
                >确认重置密码</el-button
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
  name: "ForgetPassword",
  components: {
    LoginIcon
  },
  data() {
    return {
      ruleForm: {
        uid: "",
        email: ""
      },
      rules: {
        uid: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/account/changepassword", this.ruleForm)
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
