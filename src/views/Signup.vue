<template>
  <div id="Signup">
    <LoginIcon></LoginIcon>
    <div id="signuppage">
      <div style="margin-bottom:30px">
        <span style="font-size: 40px;">注册</span>
        <span style="float: right;line-height: 70px;"
          >有账号？
          <el-link type="primary" href="#/login" style="line-height: 20px"
            >立即登录</el-link
          >
        </span>
      </div>
      <div v-show="tag">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <el-form-item prop="uid">
            <el-input placeholder="用户ID" v-model="ruleForm.uid"></el-input>
          </el-form-item>
          <el-form-item prop="uname">
            <el-input
              placeholder="昵称/用户名"
              v-model="ruleForm.uname"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              show-password
              v-model="ruleForm.password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="邮箱" v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item prop="age">
            <el-input
              placeholder="年龄"
              v-model.number="ruleForm.age"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="secret">保密</el-radio>
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              style="width: 100%;font-size: 20px;margin-left: 0px;"
              @click="submitForm('ruleForm')"
              >注册</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
import LoginIcon from "../components/LoginIcon.vue";

export default {
  name: "Signup",
  components: {
    LoginIcon
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      ruleForm: {
        uid: "",
        uname: "",
        email: "",
        password: "",
        age: "",
        sex: ""
      },
      tag: true,
      rules: {
        uid: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        uname: [
          { required: true, message: "请输入昵称/用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        age: [{ validator: checkAge, trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "change" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const _this = this;
          this.$axios.post("/account/regist", this.ruleForm).then(res => {
            console.log(res);
            _this.tag = false;
            _this.$router.push("/signup/registsuccess");
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
#signuppage {
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
  text-align: left;
  margin-top: 20px;
}
</style>
