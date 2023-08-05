<template>
  <div id="RegistSuccess">
    <el-tag style="width:100%; margin-top:20px;font-size:20px" type="success"
      >已发送激活邮件,请注意查收！</el-tag
    >
    <el-button
      type="primary"
      @click="back"
      style="width:100%;text-align:center;margin-top:20px"
      >返回登录界面</el-button
    >
  </div>
</template>

<script>
export default {
  name: "RegistSuccess",
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
#RegistSuccess {
  text-align: center;
  background: #e2e9e5;
  box-shadow: 0 0 25px #cac6c6;
}
</style>
