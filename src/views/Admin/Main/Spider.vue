<template>
  <div id="Spider">
    <div class="info" style="height:auto">
      <p>当前爬取的用户总数：{{ maininfo.usercount }}</p>
      <p>当前爬取的图书总数：{{ maininfo.bookcount }}</p>
      <el-divider></el-divider>
      <div style="overflow:hidden">
        <el-card class="box-card" style="float:left">
          <p
            v-for="(item, index) in booklist"
            :key="item.id"
            @click="show(item)"
          >
            {{ item }} （爬取数：{{ maininfo.classifyMainmap[index] }}）
          </p>
        </el-card>
        <el-card class="box-card" style="float:left;margin-left:20px">
          <p v-for="(item, index) in subclassify[cmindex]" :key="item.id">
            {{ item }} （爬取数：{{ subinfo.Subclassifymap[index] }}）
          </p>
        </el-card>
      </div>
    </div>
    <div class="info" style="height:90px">
      <el-button type="primary" plain @click="openspider">开启爬虫</el-button>
      <el-progress :percentage="0"></el-progress>
    </div>
    <el-dialog title="数据爬取进度" :visible.sync="dialogVisible" width="70%">
      <div class="spider_info">
        <span id="message"></span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closespider">中 止</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
var socket;
export default {
  name: "Spider",
  data() {
    return {
      dialogVisible: false,
      cmindex: -1,
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
      maininfo: {},
      subinfo: {}
    };
  },
  methods: {
    show(val) {
      for (let i = 0; i < this.booklist.length; i++) {
        if (val == this.booklist[i]) {
          this.cmindex = i;
        }
      }
      this.$axios
        .get("/admin/getspiderinfobysubclassify", {
          params: {
            id: this.cmindex
          }
        })
        .then(res => {
          this.subinfo = res.data.data;
          //console.log(res.data.data);
        });
    },
    openspider() {
      this.dialogVisible = true;
      //实现化WebSocket对象
      //指定要连接的服务器地址与端口建立连接
      //注意ws、wss使用不同的端口。我使用自签名的证书测试，
      //无法使用wss，浏览器打开WebSocket时报错
      //ws对应http、wss对应https。
      socket = new WebSocket("ws://localhost:8080/ws/asset");
      //连接打开事件
      socket.onopen = function() {
        console.log("Socket 已打开");
      };
      //收到消息事件
      socket.onmessage = function(msg) {
        document.getElementById("message").innerHTML += msg.data + "</br>";
      };
      //连接关闭事件
      socket.onclose = function() {
        console.log("Socket已关闭");
      };
      //发生了错误事件
      socket.onerror = function() {
        alert("Socket发生了错误");
      };
      //窗口关闭时，关闭连接
      window.unload = function() {
        socket.close();
      };
      this.$axios.get("/admin/spiderinfo").then(res => {
        console.log(res);
      });
    },
    closespider() {
      this.dialogVisible = false;
      socket.close();
    }
  },
  mounted: function() {
    this.$axios.get("/admin/getspiderinfo").then(res => {
      this.maininfo = res.data.data;
      //console.log(res.data.data);
    });
  }
};
</script>

<style>
#Spider {
  height: 780px;
}
.box-card {
  width: 350px;
  height: auto;
}
.info {
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 10px;
  width: 1310px;
  height: auto;
  border: 1px rgba(222, 225, 232) solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.el-message {
  top: 100px !important;
}
.spider_info {
  border: 1px rgba(222, 225, 232) solid;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
