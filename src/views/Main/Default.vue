<template>
  <div id="Default">
    <div class="yihang" v-if="coldbook.data.records">
      <h2>新书推荐</h2>
      <el-divider></el-divider>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item
          v-for="(num, indexnum) in coldbook.data.records.length"
          :key="indexnum"
        >
          <el-image
            style="width:240px;height:300px;float:left"
            :src="
              'http://localhost:80/' +
                coldbook.data.records[indexnum].imgaddress
            "
            @click="toInfo(coldbook.data.records[indexnum].eid)"
          >
          </el-image>
          <div
            style="float:left;margin-left:10px;padding-top:20px"
            @click="toInfo(coldbook.data.records[indexnum].eid)"
          >
            <h4>书名：{{ coldbook.data.records[indexnum].ename }}</h4>
            <h4>作者：{{ coldbook.data.records[indexnum].author }}</h4>
            <h4>
              出版社：{{ coldbook.data.records[indexnum].publishinghouse }}
            </h4>
            <h4>提供方：{{ coldbook.data.records[indexnum].provider }}</h4>
            <h4>字数：{{ coldbook.data.records[indexnum].words }}</h4>
            <h4>ISBN：{{ coldbook.data.records[indexnum].isbn }}</h4>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="yihang" v-if="!recommend_book.is_show">
      <h2>
        猜你喜欢
      </h2>
      <el-divider></el-divider>
      <h2 style="color:red;">请登录</h2>
    </div>
  
    <div class="yihang" v-if="recommend_book.data && recommend_book.is_show">
      <h2>猜你喜欢</h2>
      <el-divider></el-divider>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item
          v-for="(num, indexnum) in recommend_book.data.length"
          :key="indexnum"
        >
          <el-image
            style="width:240px;height:300px;float:left"
            :src="
              'http://localhost:80/' + recommend_book.data[indexnum].imgaddress
            "
            @click="toInfo(recommend_book.data[indexnum].eid)"
          >
          </el-image>
          <div
            style="float:left;margin-left:10px;padding-top:20px"
            @click="toInfo(recommend_book.data[indexnum].eid)"
          >
            <h4>书名：{{ recommend_book.data[indexnum].ename }}</h4>
            <h4>作者：{{ recommend_book.data[indexnum].author }}</h4>
            <h4>出版社：{{ recommend_book.data[indexnum].publishinghouse }}</h4>
            <h4>提供方：{{ recommend_book.data[indexnum].provider }}</h4>
            <h4>字数：{{ recommend_book.data[indexnum].words }}</h4>
            <h4>ISBN：{{ recommend_book.data[indexnum].isbn }}</h4>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="yihang" v-if="classifymian_book.is_show == -1">
      <h2>
        来自你感兴趣的分区
      </h2>
      <el-divider></el-divider>
      <h2 style="color:red;">请登录</h2>
    </div>
  <div class="yihang" v-if="classifymian_book.is_show == 0">
      <h2>
        来自你感兴趣的分区
      </h2>
      <el-divider></el-divider>
      <h2 style="color:red;">请前往设置中心添加书籍分类</h2>
    </div>
    <div
      class="yihang"
      v-if="classifymian_book.data.records && classifymian_book.is_show"
    >
      <h2>
        来自你感兴趣的分区 -->({{
          classifymian_book.data.records[0].classifymain
        }})
      </h2>
      <el-divider></el-divider>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item
          v-for="(num, indexnum) in classifymian_book.data.records.length"
          :key="indexnum"
        >
          <el-image
            style="width:240px;height:300px;float:left"
            :src="
              'http://localhost:80/' +
                classifymian_book.data.records[indexnum].imgaddress
            "
            @click="toInfo(classifymian_book.data.records[indexnum].eid)"
          >
          </el-image>
          <div
            style="float:left;margin-left:10px;padding-top:20px"
            @click="toInfo(classifymian_book.data.records[indexnum].eid)"
          >
            <h4>书名：{{ classifymian_book.data.records[indexnum].ename }}</h4>
            <h4>作者：{{ classifymian_book.data.records[indexnum].author }}</h4>
            <h4>
              出版社：{{
                classifymian_book.data.records[indexnum].publishinghouse
              }}
            </h4>
            <h4>
              提供方：{{ classifymian_book.data.records[indexnum].provider }}
            </h4>
            <h4>字数：{{ classifymian_book.data.records[indexnum].words }}</h4>
            <h4>ISBN：{{ classifymian_book.data.records[indexnum].isbn }}</h4>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "Default",
  data() {
    return {
      coldbook: {
        data: {}
      },
      classifymian_book: {
        is_show: 1,
        data: {}
      },
      recommend_book: {
        is_show: true,
        data: {}
      }
    };
  },
  methods: {
    toInfo: function(val) {
      this.$router.push({
        path: "/main/bookinfo",
        query: { eid: val, cpage: 1 }
      });
    }
  },
  mounted: function() {
    //组件加载时的初始数据
    this.$axios.get("book/coldbooksrecommend").then(res => {
      this.coldbook.data = res.data.data;
      //console.log(this.coldbook);
    });
    if (this.$store.state.userInfo.username != null) {
      //登录用户
      this.$axios
        .get("book/getlistbyuid", {
          params: {
            uid: this.$store.state.userInfo.userid
          }
        })
        .then(res => {
          if (res.data.data == "用户没有喜爱分类")
            this.classifymian_book.is_show = 0;
          else this.classifymian_book.data = res.data.data;
        });

      this.$axios
        .get("book/recommendbook", {
          params: {
            uid: this.$store.state.userInfo.userid
          }
        })
        .then(res => {
          this.recommend_book.data = res.data.data;
          //console.log(this.recommend_book);
        });

    } else {
      //游客身份
      this.classifymian_book.is_show = -1;
      this.recommend_book.is_show = false;
    }
  }
};
</script>

<style>
.yihang {
  width: 1290px;
  height: auto;
  margin: 20px 20px;
  padding: 20px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.img {
  width: 155px;
  height: 235px;
  float: left;
  margin-right: 40px;
  margin-left: 40px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #edf0f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #edf0f3;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
