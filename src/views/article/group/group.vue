<template>
  <div class="group-container">
    <el-dialog title="修改/编辑" :visible.sync="dialogFormVisible">
      <el-form label-width="100px">
        <el-form-item label="分类">
          <el-input v-model="form.name" style="width: 300px"></el-input>
        </el-form-item>
        <el-form-item label="分类等级">
          <el-select
            v-model="form.order"
            placeholder="请选择"
            style="width: 300px"
          >
            <el-option label="1" :value="1"></el-option>
            <el-option label="2" :value="2"></el-option>
            <el-option label="3" :value="3"></el-option>
            <el-option label="4" :value="4"></el-option>
            <el-option label="5" :value="5"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
    <div>
      <el-input
        placeholder="请输入要添加的分类，左边选择分类等级"
        v-model="input"
        class="input-with-select blogInput"
      >
        <el-select v-model="select" slot="prepend" placeholder="请选择">
          <el-option label="1" :value="1"></el-option>
          <el-option label="2" :value="2"></el-option>
          <el-option label="3" :value="3"></el-option>
          <el-option label="4" :value="4"></el-option>
          <el-option label="5" :value="5"></el-option>
        </el-select>
      </el-input>
      <el-button type="primary" style="margin-left: 20px" @click="setBlogType">
        添加
      </el-button>
    </div>
    <template>
      <el-table :data="data" stripe style="width: 80%" v-loading="listLoading">
        <el-table-column prop="order" label="排序" align="center">
        </el-table-column>
        <el-table-column prop="name" label="分类名称" align="center">
        </el-table-column>
        <el-table-column prop="articleCount" label="分类数量" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="edit(scope.row)"
              >编辑</el-button
            >

            <el-button
              style="margin-left: 20px"
              slot="reference"
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
import {
  setBlogType,
  editBlogType,
  delBlogType,
  getBlogType,
  // findBlogType,
} from "@/api/blog";
export default {
  data() {
    return {
      input: "",
      select: 1,
      data: [],
      listLoading: false,
      dialogFormVisible: false,
      form: {},
    };
  },
  created() {
    this.feachData();
  },
  methods: {
    setBlogType() {
      //添加
      if (this.input === "") {
        this.$error("请输入分类标题");
        return;
      }
      setBlogType({
        name: this.input,
        order: this.select,
      }).then((res) => {
        this.$success("添加成功");
        this.select = 1;
        this.input = "";
        this.feachData();
      });
    },
    handleDelete({ id }) {
      //删除
      this.$confirm(
        "删除该分类后，该分类下面的所有文章将变成为分类状态，是否继续删除此分类",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$success("删除成功", () => {
            delBlogType(id).then(() => {
              this.feachData();
            });
          });
        })
        .catch();
    },
    edit(row) {
      this.dialogFormVisible = true;
      this.form = row;
    },
    handleEdit() {
      editBlogType({
        id: this.form.id,
        data: {
          name: this.form.name,
          order: this.form.order,
        },
      })
        .then((res) => {
          this.$message.success({
            offset: 300,
            message: "修改成功",
            duration: 1000,
          });
          this.feachData();
          this.dialogFormVisible = false;
        })
        .catch(() => {
          this.$message.error({
            offset: 300,
            message: "修改失败",
            duration: 1000,
          });
          this.feachData();
          this.dialogFormVisible = false;
        });

      //修改
    },
    feachData() {
      this.listLoading = true;
      getBlogType().then((res) => {
        //获取
        this.listLoading = false;
        this.data = res.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.group-container {
  padding: 10px;
  .blogInput {
    width: 500px;
    margin: 10px 0;
  }
  .el-select {
    width: 130px;
  }
}
</style>