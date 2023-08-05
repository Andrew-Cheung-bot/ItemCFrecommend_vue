<template>
  <div id="Main">
    <el-container>
      <el-header
        style="height: 61px;margin-left:0px;padding:0px 0px"
        class="f-nav"
      >
        <el-menu
          default-active="true"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item
            index="/main"
            @click="goBack"
            style="padding-right:35px;padding-left:35px;width:225px;"
            >ACProject 管理员系统</el-menu-item
          >
          <el-menu-item index="4" style="float:right" @click="LoginOut"
            >登出</el-menu-item
          >
          <el-menu-item index="5" style="float:right"
            ><i class="el-icon-user"></i
            >{{ this.$store.state.userInfo.username }}</el-menu-item
          >
        </el-menu>
      </el-header>
      <el-container style="margin-top:60px;">
        <el-aside
          width="225px"
          style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
        >
          <el-col :span="23">
            <el-menu
              class="el-menu-vertical-demo"
              default-active="true"
              router
              style="border-right:solid 0px;width:225px;"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>图书管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="bookmanager?page=1"
                    >编辑图书</el-menu-item
                  >
                  <el-menu-item index="addbook">新增图书</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="usermanager?page=1">
                <i class="el-icon-menu"></i>
                <span slot="title">用户管理</span>
              </el-menu-item>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>推荐系统</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="spider">爬虫模块</el-menu-item>
                  <el-menu-item index="statistics?page=1"
                    >统计模块</el-menu-item
                  >
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {};
  },
  methods: {
    goBack() {
      this.$router.push("/admin/main/bookmanager");
    },
    LoginOut() {
      this.$axios.get("/account/loginout", {
        headers: {
          Authorization: this.$store.state.token
        }
      });
      this.$store.commit("REMOVE_INFO");
      this.$router.push("/admin");
    }
  }
};
</script>

<style>
.f-nav {
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9989;
  position: fixed;
}
.el-page-header {
  width: 290px;
}
.el-aside {
  text-align: center;
  line-height: 200px;
}
.el-main {
  color: #333;
  text-align: left;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
