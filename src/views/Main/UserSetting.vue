<template>
  <div id="UserSetting">
    <el-tabs type="border-card">
      <el-tab-pane label="用户设置">
        <h2>喜好分类</h2>
        <el-divider></el-divider>
        <el-transfer
          :titles="['图书分类', '喜好分类']"
          v-model="FavoriteInfo.value"
          :data="FavoriteInfo.data"
          @change="changefavorite"
        ></el-transfer>
        <h2>修改个人信息</h2>
        <el-divider></el-divider>
        <el-form
          :model="NewPwdForm"
          status-icon
          :rules="rules"
          ref="NewPwdForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="新密码" prop="pass">
            <el-input
              type="password"
              v-model="NewPwdForm.pass"
              autocomplete="off"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input
              type="password"
              v-model="NewPwdForm.checkPass"
              autocomplete="off"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="sex">
            <el-input
              v-model="NewPwdForm.age"
              autocomplete="off"
              style="width:50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="age">
            <el-radio-group v-model="NewPwdForm.sex">
              <el-radio label="secret">保密</el-radio>
              <el-radio label="male">男</el-radio>
              <el-radio label="female">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('NewPwdForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('NewPwdForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="过往评论">
        <el-table
          :data="tableData"
          border
          style="width: 100%;box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)"
        >
          <el-table-column prop="ebook.ename" label="书名" width="180">
          </el-table-column>
          <el-table-column
            width="100"
            prop="ebook.classifymain"
            label="书籍分类"
          ></el-table-column>
          <el-table-column label="评分" width="180">
            <template slot-scope="scope">
              <el-rate
                v-model="scope.row.ratingvalue"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </template>
          </el-table-column>
          <el-table-column prop="rdescribe" label="评论" />
          <el-table-column fixed="right" label="操作" width="160">
            <template slot-scope="scope">
              <el-button
                @click="handleClickToBook(scope.row)"
                type="text"
                size="small"
                >查看该书</el-button
              >
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
        <el-card
          class="boxcard"
          style="margin-top:20px;"
          v-show="new_comment.state"
        >
          <div slot="header" class="clearfix">
            <span>{{ new_comment.edit_bookname }}</span>
            <el-button
              style="float: right; padding: 3px 0; margin-left:20px;"
              type="text"
              @click="cancel_edit"
              >收回</el-button
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              @click="send_describe"
              >修改评论</el-button
            >
          </div>
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
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "UserSetting",
  data() {
    // eslint-disable-next-line no-unused-vars
    const generateData = _ => {
      const data = [
        {
          key: "小说",
          label: "小说"
        },
        {
          key: "文学",
          label: "文学"
        },
        {
          key: "人文社科",
          label: "人文社科"
        },
        {
          key: "经济管理",
          label: "经济管理"
        },
        {
          key: "科技科普",
          label: "科技科普"
        },
        {
          key: "计算机与互联网",
          label: "计算机与互联网"
        },
        {
          key: "成功励志",
          label: "成功励志"
        },
        {
          key: "生活",
          label: "生活"
        },
        {
          key: "少儿",
          label: "少儿"
        },
        {
          key: "艺术设计",
          label: "艺术设计"
        },
        {
          key: "漫画绘本",
          label: "漫画绘本"
        },
        {
          key: "教育考试",
          label: "教育考试"
        },
        {
          key: "杂志",
          label: "杂志"
        }
      ];
      return data;
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.NewPwdForm.checkPass !== "") {
          this.$refs.NewPwdForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.NewPwdForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    return {
      FavoriteInfo: {
        data: generateData(),
        value: []
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }],
        sex: [{ required: true, message: "请输入性别", trigger: "change" }]
      },
      NewPwdForm: {
        pass: "",
        checkPass: "",
        uid: this.$store.state.userInfo.userid,
        age: 0,
        sex: "保密"
      },
      tableData: [],
      new_comment: {
        state: false,
        edit_bookname: ""
      },
      describeInfo: {
        user_comment: "",
        rate: 0,
        eid: "",
        uid: ""
      }
    };
  },
  methods: {
    handleClickToBook(row) {
      this.$router.push({
        path: "/main/bookinfo",
        query: { eid: row.eid, cpage: 1 }
      });
    },
    handleClickToEdit(row) {
      this.new_comment.state = true;
      this.new_comment.edit_bookname = row.ebook.ename;
      //新评论提交表单
      this.describeInfo.eid = row.eid;
      this.describeInfo.uid = row.uid;
    },
    send_describe() {
      console.log(this.describeInfo);
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
    cancel_edit() {
      this.new_comment.state = false;
    },
    handleClickToDelete(row) {
      this.$axios
        .get("/ratinglist/deletecomment", {
          params: {
            uid: this.$store.state.userInfo.userid,
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
          //全局刷新页面
          this.$router.go(0);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/account/changenewpwd", this.NewPwdForm)
            .then(res => {
              alert(res.data.data);
            });
        } else {
          console.log("错误的表单提交!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changefavorite(value, direction, movedKeys) {
      if (direction == "right") {
        for (let i = 0; i < movedKeys.length; i++) {
          let temp = movedKeys[i];
          this.$axios.get("/favorite/add", {
            params: {
              uid: this.$store.state.userInfo.userid,
              classifyMain: temp
            }
          });
        }
      } else {
        for (let i = 0; i < movedKeys.length; i++) {
          let temp = movedKeys[i];
          this.$axios.get("/favorite/delete", {
            params: {
              uid: this.$store.state.userInfo.userid,
              classifyMain: temp
            }
          });
        }
      }
    }
  },
  mounted: function() {
    //组件加载时的初始数据
    this.$axios
      .get("/favorite/query", {
        params: {
          uid: this.$store.state.userInfo.userid
        }
      })
      .then(res => {
        for (let i = 0; i < res.data.data.length; i++)
          this.FavoriteInfo.value.push(res.data.data[i].classifymain);
      });
    this.$axios
      .get("/ratinglist/listcomment", {
        params: {
          uid: this.$store.state.userInfo.userid
        }
      })
      .then(res => {
        for (let i = 0; i < res.data.data.length; i++)
          this.tableData.push(res.data.data[i]);
        console.log(this.tableData);
      });
    this.$axios
      .get("/account/getuserinfo", {
        params: {
          uid: this.$store.state.userInfo.userid
        }
      })
      .then(res => {
        this.NewPwdForm.sex = res.data.data.sex;
        this.NewPwdForm.age = res.data.data.age;
      });
  }
};
</script>

<style>
.boxcard {
  width: auto;
}
</style>
