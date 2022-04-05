<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-form label-width="100px" class="demo-ruleForm">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="文字描述">
            <el-input
              type="textarea"
              v-model="form.description"
              placeholder="请输入文章描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="选择文章分类">
            <el-select
              v-model="form.categoryId"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in blogType"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="22">
        <Editor
          ref="editor"
          :initialValue="editText"
          height="600px"
          :options="{
            language: 'zh-CN',
          }"
        />
        <UpLoad title="文章头图" v-model="form.thumb" />
        <el-row type="flex" justify="center" style="margin-top: 20px">
          <el-button type="primary" @click="feachBlog" :loading="btnLoading"
            >{{ mapTitle }}<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Editor } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/zh-cn";
import UpLoad from "@/components/UpLoad";
import { getBlogType, postBlog, getBlog, putBlog } from "@/api/blog";

export default {
  props: ["title"],
  computed: {
    mapTitle() {
      return this.title === "add" ? "发布文章" : "修改文章";
    },
  },
  components: {
    Editor,
    UpLoad,
  },
  data() {
    return {
      id: null,
      btnLoading: false,
      editText: "", //文本
      form: {
        title: "", //标题
        description: "", //描述
        htmlContent: "", //html
        thumb: "", //文章头图
        markdownContent: "", //markdown
        categoryId: "", //分类id
      },
      blogType: [],
    };
  },
  methods: {
    feachFun(res) {
      if (typeof res === "string") {
        this.$message.error({
          message: "发布文章失败，请再试一次",
          offset: 300,
          duration: 2000,
          onClose: () => {
            this.btnLoading = false;
          },
        });
      } else {
        this.$message.success({
          message: "添加成功",
          offset: 300,
          duration: 1000,
          onClose: () => {
            this.form = {
              title: "", //标题
              description: "", //描述
              thumb: "", //文章头图
              categoryId: "", //分类id
            };
            this.editText = ""; //文本
            this.btnLoading = false;
            this.$router.push({ name: "Article" });
          },
        });
      }
    },
    feachBlog() {
      this.btnLoading = true;
      const html = this.$refs.editor.invoke("getHTML");
      const markDown = this.$refs.editor.invoke("getMarkdown");
      this.form.htmlContent = html;
      this.form.markdownContent = markDown;
      this.form.createDate = Date.now();
      this.form.toc = [];
      if (this.title === "add") {
        postBlog(this.form).then((res) => {
          this.feachFun(res);
        });
      } else {
        putBlog(this.id, this.form).then((res) => {
          this.feachFun(res);
        });
      }
    },
  },
  created() {
    getBlogType().then(({ data }) => {
      this.blogType = data;
    });
    if (this.title !== "add") {
      this.id = this.$route.params.id;
      if (!this.id) {
        this.$router.push({ name: "Article" });
        return;
      }
      getBlog(this.id).then(({ data }) => {
        this.form = {
          ...data,
          categoryId: data.category === null ? "" : data.category.id,
        };
        this.$refs.editor.invoke("setHTML", data.htmlContent);
      });
    }
  },
};
</script>

<style scoped>
</style>