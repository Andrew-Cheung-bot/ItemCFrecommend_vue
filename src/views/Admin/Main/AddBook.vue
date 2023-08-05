<template>
  <div id="AddBook">
    <el-form ref="form" :model="sizeForm" label-width="80px">
      <el-form-item label="书籍Id" style="width:80%;">
        <el-input v-model="sizeForm.upload.eid"></el-input>
      </el-form-item>
      <el-form-item label="书名" style="width:80%;">
        <el-input v-model="sizeForm.upload.ename"></el-input>
      </el-form-item>
      <el-form-item label="ISBN码" style="width:80%;">
        <el-input v-model="sizeForm.upload.isbn"></el-input>
      </el-form-item>
      <el-form-item label="作者" style="width:80%;">
        <el-input v-model="sizeForm.upload.author"></el-input>
      </el-form-item>
      <el-form-item label="译者" style="width:80%;">
        <el-input v-model="sizeForm.upload.translator"></el-input>
      </el-form-item>
      <el-form-item label="出版社" style="width:80%;">
        <el-input v-model="sizeForm.upload.publishinghouse"></el-input>
      </el-form-item>
      <el-form-item label="提供商" style="width:80%;">
        <el-input v-model="sizeForm.upload.provider"></el-input>
      </el-form-item>
      <el-form-item label="书籍简介" style="width:80%;">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入简介内容"
          v-model="sizeForm.upload.description"
        >
        </el-input>
      </el-form-item>
      <div style="width:auto;height:220px;">
        <el-form-item label="分类" style="float:left">
          <el-select
            @change="cmindex"
            v-model="sizeForm.upload.classifyMain"
            placeholder="请选择主分类"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, item_index1) in sizeForm.booklist"
              :key="item_index1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="副分类" style="float:left">
          <el-select
            v-model="sizeForm.upload.subClassify"
            placeholder="请选择副分类"
          >
            <el-option
              :label="item"
              :value="item"
              v-for="(item, item_index2) in sizeForm.subclassify[
                sizeForm.cmindex
              ]"
              :key="item_index2"
            ></el-option>
          </el-select>
        </el-form-item>
        <!--上传upload表单-->
        <el-upload
          ref="img"
          class="avatar-uploader"
          style="margin-left:660px;"
          :auto-upload="false"
          :data="sizeForm.upload"
          list-type="picture"
          name="picture"
          action="http://localhost:8080/book/getnewbookimg"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            style="height:220px;"
            class="avatar"
          />
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
            style="line-height:6;"
          ></i>
        </el-upload>
      </div>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "AddBook",
  methods: {
    cmindex(val) {
      for (let i = 0; i < this.sizeForm.booklist.length; i++) {
        if (val == this.sizeForm.booklist[i]) {
          this.sizeForm.cmindex = i;
        }
      }
    },
    onSubmit() {
      //手动上传图片与表单
      var vm = this;
      vm.$refs.img.submit();
      setTimeout(() => {
        //设定延时3秒后跳回初始页面
        this.$router.push("/admin/main/bookmanager?page=1");
      }, 3000);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(this.imageUrl);
      const h = this.$createElement;
      //提示评论消息
      this.$notify({
        title: "消息提示",
        message: h("i", { style: "color: teal" }, res.data.data),
        position: "bottom-right"
      });
    },
    beforeAvatarUpload(file) {
      //const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  },
  data() {
    return {
      imageUrl: "",
      sizeForm: {
        upload: {
          eid: "",
          ename: "",
          isbn: "",
          author: "",
          translator: "",
          publishinghouse: "",
          provider: "",
          classifyMain: "",
          subClassify: "",
          description: ""
        },
        cmindex: -1,
        classifyMain: "",
        subClassify: "",
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
        ]
      }
    };
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
