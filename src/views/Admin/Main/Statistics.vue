<template>
  <div id="Statistics">
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    >
      <el-table-column prop="eida" label="矩阵A书籍ID" width="342">
      </el-table-column>
      <el-table-column
        width="342"
        prop="eidb"
        label="矩阵B书籍ID"
      ></el-table-column>
      <el-table-column
        width="342"
        prop="counter"
        label="共现次数"
      ></el-table-column>
      <el-table-column
        width="342"
        prop="cossimilarity"
        label="余弦相似度矩阵"
      ></el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="fenyeInfo.current"
      :page-size="fenyeInfo.size"
      layout="prev, pager, next, jumper"
      :total="fenyeInfo.total"
    >
    </el-pagination>
    <div class="info" style="height:90px">
      <el-button type="primary" plain @click="cgongxian"
        >计算共现矩阵</el-button
      >
      <el-button type="primary" plain @click="cyuxian"
        >计算余弦相似度</el-button
      >
      <el-progress :percentage="0"></el-progress>
    </div>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  data() {
    return {
      tableData: [],
      loading: true,
      fenyeInfo: {
        size: 0,
        current: 0,
        total: 0
      }
    };
  },
  methods: {
    cgongxian() {
      console.log("test");
      this.$message("已发送计算共现矩阵请求");
    },
    cyuxian() {
      this.$message("已发送计算余弦相似度矩阵请求");
    },
    handleCurrentChange(val) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = val;
      this.$router.push({ path: this.$route.path, query });
    }
  },
  mounted: function() {
    this.$axios
      .get("/admin/getmatrixlist", {
        params: {
          page: this.$route.query.page
        }
      })
      .then(res => {
        for (let i = 0; i < res.data.data.records.length; i++)
          this.tableData.push(res.data.data.records[i]);
        this.fenyeInfo.size = res.data.data.size;
        this.fenyeInfo.current = res.data.data.current;
        this.fenyeInfo.total = res.data.data.total;
        this.loading = false;
        console.log(this.fenyeInfo);
      });
  },
  watch: {
    "$route.query": function() {
      this.loading = true;
      this.$axios
        .get("/admin/getmatrixlist", {
          params: {
            page: this.$route.query.page
          }
        })
        .then(res => {
          this.tableData = [];
          for (let i = 0; i < res.data.data.records.length; i++)
            this.tableData.push(res.data.data.records[i]);
          this.fenyeInfo.size = res.data.data.size;
          this.fenyeInfo.current = res.data.data.current;
          this.fenyeInfo.total = res.data.data.total;
          this.loading = false;
          console.log(this.tableData);
        });
    }
  }
};
</script>

<style>
#Statistics {
  height: 780px;
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
</style>
