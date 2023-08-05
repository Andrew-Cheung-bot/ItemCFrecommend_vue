<template>
  <div id="Search">
    <div class="info">
      <el-input
        class="inputbutton"
        placeholder="ISBN"
        prefix-icon="el-icon-document"
        v-model="Info.ISBN"
      />
      <el-divider direction="vertical"></el-divider>
      <el-input
        class="inputbutton"
        placeholder="书名"
        prefix-icon="el-icon-notebook-1"
        v-model="Info.ename"
      />
      <el-divider direction="vertical"></el-divider>
      <el-input
        class="inputbutton"
        placeholder="作者"
        prefix-icon="el-icon-user"
        v-model="Info.author"
      />
      <el-divider direction="vertical"></el-divider>
      <el-input
        class="inputbutton"
        placeholder="书籍分类"
        prefix-icon="el-icon-reading"
        v-model="Info.classifyMain"
      />
      <el-input
        class="inputbutton"
        placeholder="书籍ID"
        prefix-icon="el-icon-postcard"
        v-model="Info.eid"
      />
      <el-divider direction="vertical"></el-divider>
      <el-input
        class="inputbutton"
        placeholder="提供方"
        prefix-icon="el-icon-s-custom"
        v-model="Info.provider"
      />
      <el-divider direction="vertical"></el-divider>
      <el-input
        class="inputbutton"
        placeholder="出版社"
        prefix-icon="el-icon-house"
        v-model="Info.publishingHouse"
      />
      <el-divider direction="vertical"></el-divider>
      <el-input
        class="inputbutton"
        placeholder="译者"
        prefix-icon="el-icon-document-copy"
        v-model="Info.translator"
      />
      <br />
      <el-button
        class="searchbutton"
        type="primary"
        icon="el-icon-search"
        round
        @click="handleADSearch"
        >高级搜索</el-button
      >
    </div>
    <el-divider content-position="left">搜索结果</el-divider>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      Info: {
        ISBN: undefined,
        author: undefined,
        classifyMain: undefined,
        eid: undefined,
        ename: undefined,
        order: undefined,
        orderCondition: undefined,
        provider: undefined,
        publishingHouse: undefined,
        translator: undefined
      }
    };
  },
  methods: {
    handleADSearch() {
      this.$router.push({
        path: "/main/search/adsearch",
        query: {
          ISBN: this.Info.ISBN,
          author: this.Info.author,
          classifyMain: this.Info.classifyMain,
          eid: this.Info.eid,
          ename: this.Info.ename,
          order: this.Info.order,
          orderCondition: this.Info.orderCondition,
          provider: this.Info.provider,
          publishingHouse: this.Info.publishingHouse,
          translator: this.Info.translator,
          page: 1
        }
      });
    }
  }
};
</script>

<style scoped>
.info {
  width: 1190px;
  height: 180px;
  text-align: center;
}
.inputbutton {
  width: 260px;
  margin-top: 15px;
  margin-left: 10px;
  margin-right: 10px;
}
.searchbutton {
  margin-top: 20px;
  width: 45%;
  margin-left: 13px;
  margin-right: 13px;
}
</style>
