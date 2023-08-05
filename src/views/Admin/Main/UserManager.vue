<template>
  <div id="UserManager">
    <div class="info">
      <p>当前实时在线人数为：{{ loginnum }}</p>
    </div>
    <div style="margin-bottom:10px">
      <el-input
        style="width:1300px"
        prefix-icon="el-icon-search"
        v-model="search"
        placeholder="请输入用户ID进行查询"
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
      element-loading-text="用户数据较多，请耐心等待"
      :data="tableData"
      border
      style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
    >
      <el-table-column prop="uname" label="用户名" width="250">
      </el-table-column>
      <el-table-column width="200" prop="uid" label="用户ID"></el-table-column>
      <el-table-column
        width="200"
        prop="email"
        label="用户邮箱"
      ></el-table-column>
      <el-table-column
        width="200"
        prop="sex"
        label="用户性别"
      ></el-table-column>
      <el-table-column
        width="200"
        prop="status"
        label="激活状态"
      ></el-table-column>
      <el-table-column
        width="129"
        prop="login"
        label="登录状态"
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
          <el-button
            @click="handleClickToAutho(scope.row)"
            type="text"
            size="small"
            >授权</el-button
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
    <el-dialog title="修改账户信息" :visible.sync="dialogFormVisible_info">
      <el-form :model="info">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="info.uname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="info.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" :label-width="formLabelWidth">
          <el-radio-group v-model="info.sex" size="medium">
            <el-radio label="secret" border>保密</el-radio>
            <el-radio label="male" border>男</el-radio>
            <el-radio label="female" border>女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="激活状态" :label-width="formLabelWidth">
          <el-radio-group v-model="info.status" size="medium">
            <el-radio label="Y" border>激活</el-radio>
            <el-radio label="N" border>未激活</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible_info = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit_info()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="修改权限" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-checkbox-group v-model="form.roles">
          <el-checkbox label="user">普通用户</el-checkbox>
          <el-checkbox label="eadmin">图书管理员</el-checkbox>
          <el-checkbox label="sadmin">超级管理员</el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit_auth()">确 定</el-button>
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
      dialogFormVisible_info: false,
      formLabelWidth: "120px",
      form: {
        uid: "",
        roles: []
      },
      info: {
        uid: "",
        uname: "",
        email: "",
        sex: "",
        status: ""
      },
      loginnum: 0,
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
    onSubmit_info() {
      this.dialogFormVisible_info = false;
      this.$axios.post("/admin/updateaccount", this.info).then(res => {
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
    onSubmit_auth() {
      this.dialogFormVisible = false;
      this.$axios.post("/admin/updateroles", this.form).then(res => {
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
    handleClickToDelete(row) {
      this.$axios
        .get("/admin/deleteaccount", {
          params: {
            uid: row.uid
          }
        })
        .then(res => {
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
      console.log(row);
      this.info.uid = row.uid;
      this.info.uname = row.uname;
      this.info.email = row.email;
      this.info.sex = row.sex;
      this.info.status = row.status;
      this.dialogFormVisible_info = true;
    },
    handleClickToAutho(row) {
      console.log(row);
      this.form.uid = row.uid;
      this.$axios
        .get("/admin/getroles", {
          params: {
            uid: row.uid
          }
        })
        .then(res => {
          this.form.roles = res.data.data;
          //console.log(this.form.roles);
        });
      this.dialogFormVisible = true;
    },
    handleCurrentChange(val) {
      const query = JSON.parse(JSON.stringify(this.$route.query));
      query.page = val;
      this.$router.push({ path: this.$route.path, query });
    },
    searchid() {
      this.$axios
        .get("/admin/searchuid", {
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
      .get("/admin/getuserlist", {
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
        console.log(this.tableData);
      });
    this.$axios.get("/admin/getloginnum").then(res => {
      this.loginnum = res.data.data;
    });
  },
  watch: {
    "$route.query": function() {
      this.loading = true;
      this.$axios
        .get("/admin/getuserlist", {
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
#UserManager {
  height: 780px;
}
.info {
  margin-bottom: 10px;
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
