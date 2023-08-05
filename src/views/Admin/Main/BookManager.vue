<template>
  <div id="BookManager">
    <div style="margin-bottom:10px">
      <el-input
        style="width:1300px"
        prefix-icon="el-icon-search"
        v-model="search"
        placeholder="请输入书籍ID进行查询"
      ></el-input>
      <el-button
        style="float:right"
        icon="el-icon-search"
        circle
        @click="searchid"
      ></el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    >
      <el-table-column prop="ename" label="书名" width="180"> </el-table-column>
      <el-table-column width="150" prop="eid" label="书籍ID"></el-table-column>
      <el-table-column
        width="100"
        prop="classifymain"
        label="书籍分类"
      ></el-table-column>
      <el-table-column
        width="100"
        prop="reviewcount"
        label="评分人数"
      ></el-table-column>
      <el-table-column width="180" prop="isbn" label="ISBN"></el-table-column>
      <el-table-column label="评分" width="180">
        <template slot-scope="scope">
          <el-rate
            :value="scope.row.ratingvalue / 2"
            disabled
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        prop="translator"
        label="译者"
      ></el-table-column>
      <el-table-column width="100" prop="words" label="字数"></el-table-column>
      <el-table-column
        width="150"
        prop="provider"
        label="提供方"
      ></el-table-column>
      <el-table-column
        width="180"
        prop="publishinghouse"
        label="出版社"
      ></el-table-column>
      <el-table-column fixed="right" label="操作" width="190">
        <template slot-scope="scope">
          <el-button
            @click="handleClickToEdit(scope.row)"
            type="text"
            size="small"
            >编辑</el-button
          >
          <el-button
            @click="handleClickToDelete(scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="fenyeInfo.current"
      :page-size="fenyeInfo.size"
      layout="prev, pager, next, jumper"
      :total="fenyeInfo.total"
    >
    </el-pagination>
    <el-dialog title="修改书籍信息" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="书名" :label-width="formLabelWidth">
          <el-input v-model="form.ename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍ID" :label-width="formLabelWidth">
          <el-input disabled v-model="form.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="书籍分类" :label-width="formLabelWidth">
          <el-input v-model="form.classifymain" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="ISBN" :label-width="formLabelWidth">
          <el-input v-model="form.isbn" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-input v-model="form.ratingvalue" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="字数" :label-width="formLabelWidth">
          <el-input v-model="form.words" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提供方" :label-width="formLabelWidth">
          <el-input v-model="form.provider" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="出版社" :label-width="formLabelWidth">
          <el-input
            v-model="form.publishinghouse"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "BookManager",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        ename: "",
        author: "",
        eid: "",
        classifymain: "",
        isbn: "",
        ratingvalue: "",
        words: "",
        provider: "",
        publishinghouse: ""
      },
      formLabelWidth: "120px",
      fullscreenLoading: false,
      search: "",
      loading: true,
      tableData: [],
      fenyeInfo: {
        size: 0,
        current: 0,
        total: 0
      }
    };
  },
  methods: {
    onSubmit() {
      this.dialogFormVisible = false;
      this.$axios.post("/book/updatebook", this.form).then(res => {
        console.log(res);
        const h = this.$createElement;
        //提示评论消息
        this.$notify({
          title: "消息提示",
          message: h("i", { style: "color: teal" }, res.data.data),
          position: "bottom-right"
        });
      });
    },
    handleClickToEdit(row) {
      this.dialogFormVisible = true;
      console.log(row);
      this.form.ename = row.ename;
      this.form.author = row.author;
      this.form.eid = row.eid;
      this.form.classifymain = row.classifymain;
      this.form.isbn = row.isbn;
      this.form.ratingvalue = row.ratingvalue;
      this.form.words = row.words;
      this.form.provider = row.provider;
      this.form.publishinghouse = row.publishinghouse;
    },
    handleClickToDelete(row) {
      this.$axios
        .get("/book/deletebook", {
          params: {
            eid: row.eid
          }
        })
        .then(res => {
          const h = this.$createElement;
          //提示评论消息
          this.$notify({
            title: "消息提示",
            message: h("i", { style: "color: teal" }, res.data.data),
            position: "bottom-right"
          });
          this.$router.go(0);
        });
    },
    handleCurrentChange(val) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = val;
      this.$router.push({ path: this.$route.path, query });
    },
    searchid() {
      this.$axios
        .get("/admin/searcheid", {
          params: {
            searchid: this.search
          }
        })
        .then(res => {
          this.tableData = [];
          this.tableData.push(res.data.data);
        });
    }
  },
  mounted: function() {
    this.$axios
      .get("/admin/getbooklist", {
        params: {
          page: this.$route.query.page
        }
      })
      .then(res => {
        console.log(res);
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
        .get("/admin/getbooklist", {
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
#BookManager {
  height: 780px;
}
</style>
