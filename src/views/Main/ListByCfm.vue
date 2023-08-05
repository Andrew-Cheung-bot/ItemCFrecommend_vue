<template>
  <div id="ListByCfm" v-if="showInfo.data.records">
    <div class="yihang" v-if="famousbook.records">
      <h2>热门书籍</h2>
      <el-divider></el-divider>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item
          v-for="(num, indexnum) in famousbook.records.length"
          :key="indexnum"
        >
          <el-image
            style="width:240px;height:300px;float:left"
            :src="
              'http://localhost:80/' + famousbook.records[indexnum].imgaddress
            "
            @click="toInfo(famousbook.records[indexnum].eid)"
          >
          </el-image>
          <div
            style="float:left;margin-left:10px;padding-top:20px"
            @click="toInfo(famousbook.records[indexnum].eid)"
          >
            <h4>书名：{{ famousbook.records[indexnum].ename }}</h4>
            <h4>作者：{{ famousbook.records[indexnum].author }}</h4>
            <h4>出版社：{{ famousbook.records[indexnum].publishinghouse }}</h4>
            <h4>提供方：{{ famousbook.records[indexnum].provider }}</h4>
            <h4>字数：{{ famousbook.records[indexnum].words }}</h4>
            <h4>ISBN：{{ famousbook.records[indexnum].isbn }}</h4>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div
      class="book_box"
      v-for="(num, indexnum) in showInfo.data.records.length"
      :key="num.id"
      @click="toInfo(showInfo.data.records[indexnum].eid)"
    >
      <el-image
        class="image"
        style="width:175px;height:220px;float:left"
        :src="
          'http://localhost:80/' + showInfo.data.records[indexnum].imgaddress
        "
      ></el-image>
      <div class="book_info">
        <h3>书名：{{ showInfo.data.records[indexnum].ename }}</h3>
        <h3>作者：{{ showInfo.data.records[indexnum].author }}</h3>
        <h3>出版社：{{ showInfo.data.records[indexnum].publishinghouse }}</h3>
        <h3>提供方：{{ showInfo.data.records[indexnum].provider }}</h3>
        <h3>字数：{{ showInfo.data.records[indexnum].words }}</h3>
      </div>
      <div class="ratingbox">
        <el-rate
          :value="showInfo.data.records[indexnum].ratingvalue / 2"
          disabled
          text-color="#ff9900"
        >
        </el-rate>
        <p>
          综合评分：{{
            showInfo.data.records[indexnum].ratingvalue == null
              ? 0
              : showInfo.data.records[indexnum].ratingvalue
          }}
        </p>
      </div>
    </div>
    <div class="fenye">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="showInfo.data.current"
        :page-size="showInfo.data.size"
        layout="prev, pager, next, jumper"
        :total="showInfo.data.total"
      >
      </el-pagination>
      <br />
      <el-select
        @change="handleChangeOrderCondition"
        @clear="handleClearOrderCondition"
        class="anniu"
        v-model="showInfo.ordercondition"
        clearable
        placeholder="排序类别"
      >
        <el-option
          v-for="item in ordercondition"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-select
        @change="handleChangeOrder"
        @clear="handleClearOrder"
        class="anniu"
        v-model="showInfo.order"
        clearable
        placeholder="排序顺序"
      >
        <el-option
          v-for="item in order"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!--向上滚动按钮-->
    <el-backtop :visibility-height="60">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "ListByCfm",
  data() {
    return {
      famousbook: {},
      showInfo: {
        data: {},
        ordercondition: "",
        order: ""
      },
      ordercondition: [
        {
          value: "words",
          label: "字数"
        },
        {
          value: "ratingvalue",
          label: "评分值"
        },
        {
          value: "reviewcount",
          label: "评分人数"
        }
      ],
      order: [
        {
          value: "ASC",
          label: "顺序"
        },
        {
          value: "DESC",
          label: "倒序"
        }
      ]
    };
  },
  methods: {
    toInfo: function(val) {
      this.$router.push({
        path: "/main/bookinfo",
        query: { eid: val, cpage: 1 }
      });
    },
    handleCurrentChange(val) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = val;
      this.$router.push({ path: this.$route.path, query });
    },
    handleChangeOrderCondition(val) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      this.showInfo.ordercondition = val;
      this.showInfo.order = "DESC";
      query.orderCondition = this.showInfo.ordercondition;
      query.order = this.showInfo.order;
      this.$router.push({ path: this.$route.path, query });
    },
    handleChangeOrder(val) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      this.showInfo.order = val;
      query.order = this.showInfo.order;
      this.$router.push({ path: this.$route.path, query });
    },
    handleClearOrderCondition() {
      //不传额外排序
      this.$router.push({
        path: this.$route.path,
        query: {
          classifyMain: this.$route.query.classifyMain,
          subclassify: this.$route.query.subclassify,
          page: this.$route.query.page
        }
      });
      //清空排序,否则会出错
      this.showInfo.order = "";
    },
    handleClearOrder() {
      //不传额外排序
      this.$router.push({
        path: this.$route.path,
        query: {
          classifyMain: this.$route.query.classifyMain,
          subclassify: this.$route.query.subclassify,
          page: this.$route.query.page
        }
      });
      //清空排序,否则会出错
      this.showInfo.ordercondition = "";
    }
  },
  mounted: function() {
    //组件加载时的初始数据
    this.$axios
      .get("/book/listbycfm", {
        params: {
          classifyMain: this.$route.query.classifyMain,
          subclassify: this.$route.query.subclassify,
          page: this.$route.query.page
        }
      })
      .then(res => {
        console.log(res);
        this.showInfo.data = res.data.data;
      });
    this.$axios
      .get("/book/queryfamouslist", {
        params: {
          classifyMain: this.$route.query.classifyMain,
          subclassify: this.$route.query.subclassify
        }
      })
      .then(res => {
        this.famousbook = res.data.data;
        console.log(this.famousbook);
      });
  },
  watch: {
    //当切换分类时通过axios获取新分类的书籍
    "$route.query": function() {
      this.$axios
        .get("/book/listbycfm", {
          params: {
            classifyMain: this.$route.query.classifyMain,
            subclassify: this.$route.query.subclassify,
            page: this.$route.query.page,
            orderCondition: this.showInfo.ordercondition,
            order: this.showInfo.order
          }
        })
        .then(res => {
          console.log(res);
          this.showInfo.data = res.data.data;
        });
      this.$axios
        .get("/book/queryfamouslist", {
          params: {
            classifyMain: this.$route.query.classifyMain,
            subclassify: this.$route.query.subclassify
          }
        })
        .then(res => {
          this.famousbook = res.data.data;
          console.log(this.famousbook);
        });
    }
  }
};
</script>

<style>
.book_box {
  width: auto;
  height: 220px;
  padding: 20px 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.book_info {
  float: left;
  margin-left: 20px;
  width: 500px;
}
.fenye {
  height: 100px;
  margin-top: 30px;
  padding-top: 30px;
  text-align: center;
}
.anniu {
  margin-left: 20px;
  margin-right: 20px;
}
.image {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
</style>
