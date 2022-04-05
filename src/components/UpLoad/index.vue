<template>
  <el-row>
    <div class="title" style="text-align: center">{{ title }}</div>
    <el-row type="flex" justify="center">
      <el-upload
        class="avatar-uploader"
        action="/api/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :headers="headers"
      >
        <img v-if="imgUrl" :src="imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-row>
  </el-row>
</template>

<script>
import url from "@/utils/URL_IMG";
import { getToken } from "@/utils/auth";
export default {
  props: ["title", "value"],
  data() {
    return {
      url,
      newValue:undefined,
    };
  },
  watch:{
    value:{
      handler(newVal){
        this.newValue = newVal
      },
    },
  },
  computed: {
    headers() {
      return { Authorization: "Bearer " + getToken() }; //从本地拿token，封装请求头，是一个独立的请求
    },
    imgUrl(){
        if(this.newValue){
            return this.url + this.newValue;
        }
        // else{
        //     return this.url + this.value;
        // }
    }
  },
  methods: {
    handleAvatarSuccess(res) {
      if (!res.code && res.data) {
        //收到上传后的地址 
        this.newValue = res.data //由于父级传递的数据延迟 所以上传后用回掉封装
        this.$emit("input", res.data, this.title);
      }
    },
  },
};
</script>

<style lang="scss">
.title {
  margin: 10px;
}
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
  height: 125px;
  line-height: 125px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 125px;
  display: block;
}
</style>