<template>
  <div class="list-container">
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%"
      v-loading="listLoading"
      element-loading-text="加载数据中"
    >
      <el-table-column prop="" label="序号" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="项目标题" align="center" />
      <el-table-column prop="description" label="项目描述" align="center" />
      <el-table-column prop="url" label="项目地址" align="center">
        <template slot-scope="scope">
          <a class="a" :href="scope.row.url" target="_black">{{
            scope.row.url
          }}</a>
        </template>
      </el-table-column>
      <el-table-column
        prop="bigImg"
        label="大图预览"
        width="120"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 70px"
            :src="url + scope.row.thumb"
            fit="fit"
            :preview-src-list="srcList"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="操作"
        align="center"
        width="200"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="light"
            content="点击查看github源码"
            placement="top"
          >
            <el-button
              type="success"
              size="small"
              @click="handleLook(scope.row)"
              >查看</el-button
            >
          </el-tooltip>
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="handleEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDel(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="请编辑该项目"
      :visible="dailogFormVisible"
      fullscreen
      @close="
        () => {
          dailogFormVisible = false;
        }
      "
    >
      <el-form :model="form" label-width="80px">
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
          <el-input
            v-model="form.github"
            placeholder="请输入项目github源码地址"
          />
        </el-form-item>
        <el-form-item label="预览图">
          <UpLoad v-model="form.thumb" :value="form.thumb" />
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
          <el-button type="primary" @click="feachPut" :loading="btnLoading"
            >确定编辑<i class="el-icon-upload el-icon--right"></i
          ></el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getProject, delProject, putProject } from "@/api/project";
import url from "@/utils/URL_IMG";
import UpLoad from "@/components/UpLoad";
const FORM = {
  description: "", // 项目描述段落
  name: "", // 项目名称
  url: "", // 项目效果请求地址
  github: "", // 项目github地址
  thumb: "", // 缩略图，项目截图
  order: 1, // 排序
  id: "",
};
export default {
  components: { UpLoad },
  data() {
    return {
      url,
      srcList: [],
      dailogFormVisible: false,
      form: {},
      data: [],
      listLoading: false,
      btnLoading: false,
    };
  },
  methods: {
    feachPut() {
      this.btnLoading = true;
      const newId = this.form.id;
      putProject(newId, {
        ...this.form,
        description: this.form.description.split(","),
      }).then((res) => {
        if (typeof res === "string") {
          this.$error("编辑失败，请再试一次", () => {
            this.btnLoading = false;
          });
        } else {
          this.$success("编辑成功", () => {
            this.form = FORM;
            this.btnLoading = false;
            this.dailogFormVisible = false;
            this.feachList();
          });
        }
      });
    },
    handleLook({ github }) {
      window.open(github);
    },
    handleDel({ id }) {
      //删除
      this.$confirm("确定删除此项目，此操作不可恢复。", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          delProject(id).then(() => {
            this.$success("删除成功", () => {
              this.feachList();
            });
          });
        },
        (err) => {}
      );
    },
    handleEdit(row) {
      this.form = { ...row, description: row.description.join(",") };
      this.dailogFormVisible = true;
    },
    feachList() {
      this.listLoading = true;
      getProject().then(({ data }) => {
        this.data = data;
        this.srcList = this.data.map((item) => {
          return this.url + item.thumb;
        });
        this.listLoading = false;
      });
    },
  },
  created() {
    this.feachList();
  },
};
</script>

<style>
.a:hover {
  color: aqua;
}
</style>