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
            style="padding-right:60px;padding-left:60px;width:225px;"
            >ACProject主页</el-menu-item
          >
          <el-menu-item index="2">模糊查询</el-menu-item>
          <el-menu-item index="2">
            <el-input
              placeholder="输入关键词"
              v-model="keyword"
              prefix-icon="el-icon-search"
              style="margin-bottom:4px"
            ></el-input>
          </el-menu-item>
          <el-menu-item index="2">
            <el-button @click="toSearchKeyword" type="info" plain
              >搜索</el-button
            >
          </el-menu-item>
          <el-menu-item index="3" @click="toSearch">高级查询</el-menu-item>
          <el-menu-item index="4" style="float:right" @click="LoginOut"
            >登出</el-menu-item
          >
          <el-submenu index="5" style="float:right">
            <template slot="title">
              <i class="el-icon-user"></i
              >{{
                this.$store.state.userInfo.username != null
                  ? this.$store.state.userInfo.username
                  : "游客"
              }}
            </template>
            <el-menu-item
              @click="toSetting"
              :disabled="this.$store.state.userInfo.username == null"
              >设置中心</el-menu-item
            >
          </el-submenu>
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
              <el-submenu
                v-for="(item, item_index) in classifyMain.booklist"
                :key="item_index"
                :index="String(item_index)"
              >
                <span slot="title">{{ item }}</span>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(sub, sub_index) in classifyMain.subclassify[
                      item_index
                    ]"
                    :index="
                      classifyMain.url +
                        '?classifyMain=' +
                        item +
                        '&subclassify=' +
                        sub +
                        '&page=1'
                    "
                    :key="sub_index"
                  >
                    <i class="el-icon-reading"></i>
                    {{ sub }}
                  </el-menu-item>
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
    return {
      fullscreenLoading: false,
      classifyMain: {
        booklist: [
          "小说",
          "文学",
          "人文社科",
          "经济管理",
          "科技科普",
          "计算机与互联网",
          "成功励志",
          "生活",
          "少儿",
          "艺术设计",
          "漫画绘本",
          "教育考试",
          "杂志"
        ],
        subclassify: [
          [
            "世界名著",
            "影视原著",
            "推理悬疑",
            "科幻",
            "言情",
            "青春",
            "都市",
            "幻想",
            "武侠",
            "历史",
            "官场",
            "军事战争",
            "中国古典",
            "中国现代",
            "中国当代",
            "外国现当代",
            "中短篇集",
            "其他"
          ],
          [
            "文学经典",
            "散文随笔",
            "日记书信",
            "演讲访谈",
            "纪实文学",
            "传记回忆",
            "诗歌及赏析",
            "戏剧曲艺",
            "寓言童话",
            "文学史",
            "文学理论与批评",
            "其他"
          ],
          [
            "经典著作",
            "心理学",
            "社会学",
            "人类学",
            "历史",
            "哲学",
            "文化",
            "宗教",
            "政治",
            "法律",
            "教育学",
            "新闻传播",
            "编辑出版",
            "考古",
            "人文地理",
            "语言文学",
            "军事",
            "其他"
          ],
          [
            "经典畅销",
            "创新创业",
            "市场营销",
            "企业经营",
            "投资理财",
            "领导力",
            "财务会计",
            "经济",
            "金融",
            "管理",
            "其他"
          ],
          [
            "科普百科",
            "数学",
            "物理",
            "化学",
            "天文",
            "生物",
            "医学",
            "自然地理",
            "城市建设",
            "工业技术",
            "农业技术",
            "其他"
          ],
          [
            "行业趋势",
            "云计算与大数据",
            "移动互联网",
            "互联网营销",
            "办公软件指南",
            "编程语言",
            "软件开发与应用",
            "硬件开发",
            "网络安全",
            "人工智能",
            "其他"
          ],
          [
            "成功学",
            "离职",
            "情商与自我提升",
            "思维治理",
            "演讲口才",
            "职场",
            "人脉与人际关系",
            "其他"
          ],
          [
            "两性情感",
            "旅行",
            "美食与厨艺",
            "时尚美妆",
            "孕产育儿",
            "养生保健",
            "医学常识",
            "家庭医学",
            "体育健身",
            "星座占卜",
            "游戏娱乐",
            "宠物园艺",
            "其他"
          ],
          ["家庭教育", "亲子阅读", "儿童文学", "启蒙读本", "少儿科普", "其他"],
          ["设计", "摄影", "电影", "音乐", "美术", "建筑", "其他"],
          ["漫画", "绘本", "其他"],
          ["外语学习", "教材教辅", "国外教材", "其他"],
          ["小说视界", "新闻人物", "文艺小赏", "生活休闲", "百科万象"]
        ],
        url: "/main/listbycfm"
      },
      keyword: "",
      button_state: false
    };
  },
  methods: {
    goBack() {
      this.$router.push("/main");
    },
    toSearchKeyword() {
      this.$router.push({
        path: "/main/searchkeyword",
        query: { keyword: this.keyword, page: 1 }
      });
    },
    toSearch() {
      this.$router.push("/main/search");
    },
    LoginOut() {
      if (this.$store.state.userInfo.username == undefined) {
        //console.log("游客身份下线");
        this.$store.commit("REMOVE_INFO");
        this.$router.push("/login");
      } else {
        //用于更新在线人数
        this.$axios.get("/account/signloginout", {
          params: {
            uid: this.$store.state.userInfo.userid
          }
        });
        //console.log(this.$store.state.token);
        this.$axios.get("/account/loginout", {
          headers: {
            Authorization: this.$store.state.token
          }
        });
        this.$store.commit("REMOVE_INFO");
        this.$router.push("/login");
      }
    },
    toSetting() {
      this.$router.push("/main/usersetting");
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
