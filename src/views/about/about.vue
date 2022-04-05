<template>
  <div class="about-container">
    <el-row type="flex" justify="center">
      <el-input
        v-model="url"
        placeholder="请输入关于我页面url地址"
        style="width: 500px"
      />
    </el-row>

    <el-row type="flex" justify="center">
      <el-button type="primary" @click="handleClick" style="margin-top: 20px"
        >设置</el-button
      >
    </el-row>
  </div>
</template>

<script>
import { postAbout, getAbout } from "@/api/about";
export default {
  data() {
    return {
      url: "",
    };
  },
  created() {
    getAbout().then(({ data }) => {
      this.url = data;
    });
  },
  methods: {
    handleClick() {
      postAbout({ url: this.url }).then(
        (res) => {
          if (res) {
            this.$success( "设置成功");
          }
        },
        (err) => {}
      );
    },
  },
};
</script>

<style>
.about-container {
  margin-top: 100px;
}
</style>