<template>
  <div class="tube-container">
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%"
      v-loading="listLoading"
    >
      <el-table-column prop="" label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="头像" width="60" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="url + scope.row.avatar"
            fit="fit"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        align="center"
        width="100"
      />
      <el-table-column prop="content" label="留言内容" align="center" />
      <el-table-column label="评论日期" align="center" width="83">
        <template slot-scope="scope">
          {{ $moment(scope.row.createDate).format("YYYY-MM-DD HH:mm:ss") }}
          星期:{{ getWeek($moment(scope.row.createDate).day()) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="操作"
        align="center"
        width="110"
      >
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="small"
            icon="el-icon-delete"
            @click="handleDel(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center">
      <el-pagination
        style="margin: 20px auto"
        background
        layout="total ,prev, pager, next,jumper"
        :total="total"
        hide-on-single-page
        @current-change="changePage"
        :page-size="limit"
      />
    </el-row>
  </div>
</template>

<script>
//  getMessage(page = 1, limit = 10, keyword = '')
import { getMessage, delMessage } from "@/api/message";
import url from "@/utils/URL_IMG";
import getWeek from "@/utils/getWeek";
export default {
  data() {
    return {
      url,
      data: [],
      total: 0,
      listLoading: false,
      limit: 6,
      page: 1,
    };
  },
  methods: {
    handleDel(id) {
      //删除
      this.$confirm("确定删除此评论，此操作不可恢复。", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          this.listLoading = true;
          delMessage(id).then(() => {
            this.$success("删除成功", () => {
              this.feachData();
              this.listLoading = false;
            });
          });
        },
        (err) => {
          this.listLoading = false;
        }
      );
    },
    getWeek,
    changePage(page) {
      this.page = page;
      this.feachData();
    },
    feachData() {
      this.listLoading = true;
      getMessage(this.page, this.limit).then(({ data }) => {
        this.total = data.total;
        this.data = data.rows;
        const bigPage = Math.ceil(this.total / this.limit);
        if (this.page > bigPage) {
          //总页码数不足会重新请求
          this.page = bigPage;
          this.changePage(this.page);
        }
      });
      this.listLoading = false;
    },
  },
  created() {
    this.feachData();
  },
};
</script>

<style>
</style>