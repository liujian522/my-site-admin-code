<template>
  <el-form :model="form" label-width="120px" style="width: 80%">
    <el-form-item label="项目名称">
      <el-input v-model="form.name" placeholder="请输入项目名称" />
    </el-form-item>
    <el-form-item label="项目描述">
      <el-input
        type="textarea"
        v-model="form.description"
        placeholder="请输入项目描述，每一项用英文逗号分隔开。"
      />
    </el-form-item>
    <el-form-item label="项目链接">
      <el-input v-model="form.url" placeholder="请输入项目链接" />
    </el-form-item>
    <el-form-item label="github">
      <el-input v-model="form.github" placeholder="请输入项目github源码地址" />
    </el-form-item>
    <el-form-item label="预览图">
      <UpLoad v-model="form.thumb" />
    </el-form-item>
    <el-form-item label="排序等级">
      <el-select v-model="form.order">
        <el-option :value="1">1</el-option>
        <el-option :value="2">2</el-option>
        <el-option :value="3">3</el-option>
        <el-option :value="4">4</el-option>
        <el-option :value="5">5</el-option>
      </el-select>
    </el-form-item>
    <el-row type="flex" justify="center" style="margin-top: 20px">
      <el-button type="primary" @click="postProject" :loading="btnLoading"
        >确定添加<i class="el-icon-upload el-icon--right"></i
      ></el-button>
    </el-row>
  </el-form>
</template>

<script>
import { postProject } from "@/api/project";
import UpLoad from "@/components/UpLoad";
const FORM = {
        name: "", // 项目名称
        description: "", // 项目描述段落
        url: "", // 项目效果请求地址
        github: "", // 项目github地址
        thumb: "", // 缩略图，项目截图
        order: 1, // 排序
      };
export default {
  components: { UpLoad },
  data() {
    return {
      btnLoading: false,
      form: {},
    };
  },
  created(){
    this.resetForm();
  },
  methods: {
    resetForm(){
      this.form = FORM;
    },
    postProject() {
      this.btnLoading = true;
      postProject({
        ...this.form,
        description: this.form.description.split(","),
      }).then((res) => {
        console.log(res);
        if (typeof res === "string") {
          this.$error("添加失败，请再试一次", () => {
            this.btnLoading = false;
            this.dailogFormVisible = false;
          });
        } else {
          this.$success("添加成功", () => {
            this.resetForm()
            this.btnLoading = false;
            this.dailogFormVisible = false;
            this.$router.push({ name: "Project" });
          });
        }
      });
    },
  },
};
</script>

<style>
</style>