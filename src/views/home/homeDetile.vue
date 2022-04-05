<template>
  <div>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      v-loading="listLoading"
    >
      <el-table-column prop="" label="序号" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column
        prop="bigImg"
        label="大图预览"
        width="250"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 70px"
            :src="url + scope.row.bigImg"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="midImg"
        label="小图预览"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 100px; height: 70px"
            :src="url + scope.row.midImg"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="操作" align="center">
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="light"
            content="点击可编辑"
            placement="top"
          >
            <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改" :visible.sync="dialogVisible">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="50px"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入描述内容"
            v-model="form.description"
          />
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <UpLoad title="首页大图" :value="bigImg" @input="handleInput" />
          </el-col>
          <el-col :span="12">
            <UpLoad title="首页中图" :value="midImg" @input="handleInput" />
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { getBanner, setBanner } from "@/api/banner";
import url from "@/utils/URL_IMG";
import UpLoad from "@/components/UpLoad";
export default {
  components: {
    UpLoad,
  },
  data() {
    return {
      url,
      tableData: [],
      dialogVisible: false,
      listLoading: false,
      form: {
        description: "",
        id: "",
        title: "",
      },
      bigImg: "",
      midImg: "",
      rules: {
        bigImg: [
          { required: true, message: "请输入大图地址", trigger: "change" },
        ],
        description: [
          {
            required: true,
            message: "请输入描述",
            trigger: "change",
          },
        ],
      },
    };
  },
  computed: {},
  created() {
    this.getBanner();
  },
  methods: {
    getBanner() {
      getBanner().then((res) => {
        if (res.data.length === 0) {
          // 初始化一条数据
          const params = [
            {
              bigImg: "/static/upload/2022-4-1-16-55-24-720-9cecc.jpg",
              description: "兰尼斯特有债必偿",
              id: `6246bf215b68474af43442a${Math.floor(Math.random() * 9)}`,
              midImg: "/static/upload/2022-4-1-16-55-37-615-9cb66.jpg",
              title: "听我怒吼",
            },
          ];
          setBanner(params).then((res) => {});
        }
        this.tableData = res.data;
      });
    },
    handleInput(data, title) {
      if (title === "首页大图") {
        this.form.bigImg = data;
        this.bigImg = data;
      } else {
        this.form.midImg = data;
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.listLoading = true;
          const params = this.tableData.map((item) => {
            if (item.id === this.form.id) {
              return { ...this.form };
            } else {
              return { ...item };
            }
          });
          if (params.length < 3) {
            //避免不可修改
            params.push({
              bigImg: "/static/upload/2022-4-1-16-55-24-720-9cecc.jpg",
              description: "兰尼斯特有债必偿",
              id: `6246bf215b68474af43442a${Math.floor(Math.random() * 9)}`,
              midImg: "/static/upload/2022-4-1-16-55-37-615-9cb66.jpg",
              title: "听我怒吼",
            });
          }
          setBanner(params).then((res) => {
            if (!res.code && res.data) {
              this.$success("修改成功");
              this.getBanner();
            } else {
              this.$error("修改失败，服务器错误");
            }
          });
          this.listLoading = false;
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    },

    handleEdit(scope) {
      this.form = { ...scope };
      this.bigImg = scope.bigImg;
      this.midImg = scope.midImg;
      this.dialogVisible = true;
    },
  },
};
</script>

<style>
</style>