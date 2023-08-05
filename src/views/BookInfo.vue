<template>
  <div id="BookInfo" v-show="showInfo.data.imgaddress">
    <div class="infobox" v-if="showInfo.data.imgaddress">
      <el-page-header
        @back="Back"
        :content="showInfo.data.ename"
        style="margin-top: 15px;width:auto;"
      >
      </el-page-header>
      <el-divider></el-divider>
      <el-image
        class="bookimage"
        :src="'http://localhost:80/' + showInfo.data.imgaddress"
      >
      </el-image>
      <div class="bookmessage">
        <h3>作者：{{ showInfo.data.author }}</h3>
        <h3>类别：{{ showInfo.data.category }}</h3>
        <h3>出版社：{{ showInfo.data.publishinghouse }}</h3>
        <h3>提供方：{{ showInfo.data.provider }}</h3>
        <h3>字数：{{ showInfo.data.words }}</h3>
        <h3>ISBN：{{ showInfo.data.isbn }}</h3>
        <h3>分类：{{ showInfo.data.classifymain }}</h3>
      </div>
      <div class="ratingbox">
        <el-rate
          :value="showInfo.data.ratingvalue / 2"
          disabled
          text-color="#ff9900"
        >
        </el-rate>
        <p>
          综合评分：{{
            showInfo.data.ratingvalue == null ? 0 : showInfo.data.ratingvalue
          }}
        </p>
      </div>
    </div>
    <div class="infobox" style="height:auto">
      <h3>作品信息</h3>
      <el-divider></el-divider>
      <p class="description">{{ showInfo.data.description }}</p>
    </div>
    <div class="infobox" style="height:470px;">
      <h3>评分数据图表</h3>
      <el-divider></el-divider>
      <div
        id="pie_chart"
        style="padding-left:50px;width: 600px;height:370px;float:left;"
      ></div>
      <div
        id="radar_Chart"
        style="margin-left:730px;width: 600px;height:370px;floar:left;"
      ></div>
    </div>
    <div class="infobox" style="height:auto;" v-if="!similarity_book.is_show">
      <h3>喜欢这本书的人还喜欢...</h3>
      <el-divider></el-divider>
      <h2 style="color:red;">没有相似的图书</h2>
    </div>
    <div class="infobox" style="height:420px;" v-if="similarity_book.is_show">
      <h3>喜欢这本书的人还喜欢...</h3>
      <el-divider></el-divider>
      <div
        v-for="(num, indexnum) in similarity_book.data.length"
        :key="indexnum"
        class="re_book"
      >
        <el-image
          style="width:190px;height:230px;float:left"
          :src="
            'http://localhost:80/' + similarity_book.data[indexnum].imgaddress
          "
          @click="toInfo(similarity_book.data[indexnum].eid)"
        >
        </el-image>
        <h4 style="margin:0px 0px">
          书名：{{ similarity_book.data[indexnum].ename }}
        </h4>
        <h4 style="margin-bottom:0px;margin-top:10px;">
          作者:{{ similarity_book.data[indexnum].author }}
        </h4>
      </div>
    </div>
    <div>
      <h2>评论区</h2>
      <el-divider></el-divider>
      <div
        class="infobox"
        style="margin-bottom:20px;height:auto;padding-bottom: 20px;background-color:rgb(255,255,255)"
      >
        <h3>你的评论(Your Comment)</h3>
        <el-divider></el-divider>
        <h2
          v-show="this.$store.state.userInfo.username == null"
          style="color:red"
        >
          请登录后再进行评论
        </h2>
        <div v-show="this.$store.state.userInfo.username != null">
          <el-input
            style="width:70%"
            type="textarea"
            show-word-limit
            maxlength="300"
            :rows="13"
            v-model="describeInfo.user_comment"
          >
          </el-input>
          <div style="width: 375px;float: right;height:auto;">
            <el-rate
              v-model="describeInfo.rate"
              show-text
              style="float:right;width:372px"
            >
            </el-rate>

            <el-button style="margin-top:20px" plain @click="send_describe"
              >提交</el-button
            >
          </div>
        </div>
      </div>
      <div
        class="comment"
        v-for="(comment, index) in comment_data.records"
        :key="index"
      >
        <h4 class="title">{{ comment.user.uname }}</h4>
        <el-rate
          v-model="comment.ratingvalue"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
        >
        </el-rate>
        <el-divider></el-divider>
        <p>{{ comment.rdescribe }}</p>
      </div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="comment_data.current"
        :page-size="comment_data.size"
        layout="prev, pager, next, jumper"
        :total="comment_data.total"
      >
      </el-pagination>
    </div>
    <!--向上滚动按钮-->
    <el-backtop :visibility-height="60">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "BookInfo",
  data() {
    return {
      showInfo: {
        data: {}
      },
      comment_data: {},
      describeInfo: {
        user_comment: "",
        rate: 0,
        eid: this.$route.query.eid,
        uid: this.$store.state.userInfo.userid
      },
      similarity_book: {
        is_show: true,
        data: {}
      }
    };
  },
  methods: {
    pie_Echarts() {
      // 基于准备好的dom，初始化echarts实例
      //this.cgsJg=echarts.init(this.$refs.cgsJ);(自己联系的项目中)
      var pie_Chart = this.$echarts.init(document.getElementById("pie_chart"));
      //获取pie图数据
      this.$axios
        .get("/ratinglist/piechart", {
          params: {
            eid: this.$route.query.eid
          }
        })
        .then(res => {
          pie_Chart.setOption({
            // 指定图表的配置项和数据
            title: {
              text: "各个评分占比",
              subtext: "饼图"
            },
            legend: {
              data: ["较差", "失望", "一般", "满意", "惊喜"],
              x: "200px",
              y: "5px"
            },
            //提示框，鼠标悬浮交互时的信息提示
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
              {
                name: "评分比例",
                type: "pie",
                radius: "70%",
                center: ["50%", "50%"],
                itemStyle: {
                  borderRadius: 8
                },
                data: res.data.data //赋值
              }
            ]
          });
        });
    },
    radar_Echarts() {
      var radar_Chart = this.$echarts.init(
        document.getElementById("radar_Chart")
      );
      //获取pie图数据
      this.$axios
        .get("/ratinglist/radarchart", {
          params: {
            eid: this.$route.query.eid
          }
        })
        .then(res => {
          var max_value = -1;
          for (let k = 0; k < 2; k++) {
            for (let i = 0; i < res.data.data[k].value.length; i++) {
              if (res.data.data[k].value[i] > max_value) {
                max_value = res.data.data[k].value[i];
              }
            }
          }
          //定义雷达图的最大值，使其与最大值自适应，防止图像溢出
          var max = 10 - (max_value % 10) + max_value;
          //console.log(res.data.data);
          radar_Chart.setOption({
            // 指定图表的配置项和数据
            title: {
              text: "各个评分人数比例",
              subtext: "雷达图"
            },
            legend: {
              data: ["本书各评分人数", "本分类中热门图书各评分人数均值"],
              x: "360px",
              y: "5px"
            },
            //提示框，鼠标悬浮交互时的信息提示
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            radar: {
              // shape: 'circle',
              name: {
                textStyle: {
                  color: "#fff",
                  backgroundColor: "#999",
                  borderRadius: 3,
                  padding: [3, 5]
                }
              },
              indicator: [
                { name: "1(极差)", max: max },
                { name: "2(失望)", max: max },
                { name: "3(一般)", max: max },
                { name: "4(满意)", max: max },
                { name: "5(惊喜)", max: max }
              ]
            },
            series: [
              {
                name: "value vs avg",
                type: "radar",
                // areaStyle: {normal: {}},
                data: res.data.data //赋值
              }
            ]
          });
        });
    },
    Back() {
      this.$router.go(-1);
    },
    handleCurrentChange(val) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      query.cpage = val;
      this.$router.push({ path: this.$route.path, query });
    },
    send_describe() {
      this.$axios.post("/ratinglist/insert", this.describeInfo).then(res => {
        const h = this.$createElement;
        //提示评论消息
        this.$notify({
          title: "消息提示",
          message: h("i", { style: "color: teal" }, res.data.data),
          position: "bottom-right"
        });
        //全局刷新页面
        this.$router.go(0);
      });
    },
    toInfo: function(val) {
      this.$router.push({
        path: "/main/bookinfo",
        query: { eid: val, cpage: 1 }
      });
    }
  },
  mounted: function() {
    this.pie_Echarts();
    this.radar_Echarts();
    //组件加载时的初始数据
    this.$axios
      .get("/book/getinfo", {
        params: {
          eid: this.$route.query.eid
        }
      })
      .then(res => {
        this.showInfo.data = res.data.data;
        //console.log(this.showInfo.data);
      });
    this.$axios
      .get("/ratinglist/list", {
        params: {
          eid: this.$route.query.eid,
          cpage: this.$route.query.cpage
        }
      })
      .then(res => {
        this.comment_data = res.data.data;
        //console.log(this.comment_data);
      });
    this.$axios
      .get("/book/similaritybook", {
        params: {
          eid: this.$route.query.eid
        }
      })
      .then(res => {
        if (res.data.data == "没有相似的图书") {
          this.similarity_book.is_show = false;
        } else this.similarity_book.data = res.data.data;
        //console.log(this.similarity_book.data);
      });
  },
  watch: {
    "$route.query": function() {
      this.pie_Echarts();
      this.radar_Echarts();
      this.$axios
        .get("/ratinglist/list", {
          params: {
            eid: this.$route.query.eid,
            cpage: this.$route.query.cpage
          }
        })
        .then(res => {
          console.log(res);
          this.comment_data = res.data.data;
          console.log(this.comment_data);
        });
      this.$axios
        .get("/book/getinfo", {
          params: {
            eid: this.$route.query.eid
          }
        })
        .then(res => {
          this.showInfo.data = res.data.data;
          //console.log(this.showInfo.data);
        });
      this.$axios
        .get("/book/similaritybook", {
          params: {
            eid: this.$route.query.eid
          }
        })
        .then(res => {
          if (res.data.data == "没有相似的图书") {
            this.similarity_book.is_show = false;
          } else this.similarity_book.data = res.data.data;
          console.log(this.similarity_book.data);
        });
    }
  }
};
</script>

<style>
#BookInfo {
  width: 1355px;
  height: auto;
}
.re_book {
  height: auto;
  width: 190px;
  margin: 0px 35px;
  float: left;
  box-shadow: 0 0 25px #cac6c6;
}
.backbutton {
  width: 20%;
  float: right;
}
.bookimage {
  margin-right: 55px;
  width: 230px;
  height: 270px;
  float: left;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.infobox {
  border: 1px rgba(222, 225, 232) solid;
  width: 1330px;
  height: 385px;
  padding: 0px;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.bookmessage {
  float: left;
  width: 500px;
  height: 290px;
  margin-left: -35px;
  margin-top: -20px;
}
.ratingbox {
  float: left;
  width: 290px;
  height: 280px;
}
.description {
  font-size: 16px;
}
.comment {
  width: 1330px;
  height: 230px;
  border: 1px rgba(222, 225, 232) solid;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 2px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.title {
  margin-bottom: 10px;
}
</style>
