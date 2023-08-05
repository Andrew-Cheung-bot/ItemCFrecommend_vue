<template>
  <div id="ADSearch" v-if="showInfo.data.records">
    <h1 v-show="showInfo.data.pages == 0">没有查询到相关图书...</h1>
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
  name: "ADSearch",
  data() {
    return {
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
          ISBN: this.$route.query.ISBN,
          author: this.$route.query.author,
          classifyMain: this.$route.query.classifyMain,
          eid: this.$route.query.eid,
          ename: this.$route.query.ename,
          orderCondition: this.$route.query.orderCondition,
          provider: this.$route.query.provider,
          publishingHouse: this.$route.query.publishingHouse,
          translator: this.$route.query.translator,
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
          ISBN: this.$route.query.ISBN,
          author: this.$route.query.author,
          classifyMain: this.$route.query.classifyMain,
          eid: this.$route.query.eid,
          ename: this.$route.query.ename,
          order: this.$route.query.order,
          orderCondition: this.$route.query.orderCondition,
          provider: this.$route.query.provider,
          publishingHouse: this.$route.query.publishingHouse,
          translator: this.$route.query.translator,
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
      .get("/book/search", {
        params: {
          ISBN: this.$route.query.ISBN,
          author: this.$route.query.author,
          classifyMain: this.$route.query.classifyMain,
          eid: this.$route.query.eid,
          ename: this.$route.query.ename,
          order: this.$route.query.order,
          orderCondition: this.$route.query.orderCondition,
          provider: this.$route.query.provider,
          publishingHouse: this.$route.query.publishingHouse,
          translator: this.$route.query.translator,
          page: this.$route.query.page
        }
      })
      .then(res => {
        this.showInfo.data = res.data.data;
        console.log(res.data.data);
      });
  },
  watch: {
    //当输入变化时通过axios获取新分类的书籍
    "$route.query": function() {
      this.$axios
        .get("/book/search", {
          params: {
            ISBN: this.$route.query.ISBN,
            author: this.$route.query.author,
            classifyMain: this.$route.query.classifyMain,
            eid: this.$route.query.eid,
            ename: this.$route.query.ename,
            order: this.$route.query.order,
            orderCondition: this.$route.query.orderCondition,
            provider: this.$route.query.provider,
            publishingHouse: this.$route.query.publishingHouse,
            translator: this.$route.query.translator,
            page: this.$route.query.page
          }
        })
        .then(res => {
          console.log(res);
          this.showInfo.data = res.data.data;
        });
    }
  }
};
</script>

<style>
.fenye {
  height: 100px;
  margin-top: 30px;
  padding-top: 60px;
  text-align: center;
}
</style>
