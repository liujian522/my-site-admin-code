<template>
  <div class="list-container">
    <el-table
      :data="data"
      border
      stripe
      style="width: 100%"
      v-loading="listLoading"
    >
      <el-table-column prop="" label="序号" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="文章标题" align="center" />
      <el-table-column prop="scanNumber" label="浏览量" align="center" />
      <el-table-column prop="description" label="描述" align="center" />
      <el-table-column prop="category.name" label="所属分类" align="center" />
      <el-table-column prop="" label="创建日期" align="center" width="93">
        <template slot-scope="scope">
          {{ $moment(scope.row.createDate).format("YYYY-MM-DD HH:mm:ss") }}
          星期:{{ getWeek($moment(scope.row.createDate).day()) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="midImg"
        label="文章头图"
        width="150"
        align="center"
      >
        <template slot-scope="scope">
          <el-tooltip class="item" content="点击预览大图" placement="top">
            <el-image
              style="width: 100px; height: 70px"
              :src="scope.row.thumb === '' ? defaultUrl : url + scope.row.thumb"
              :preview-src-list="srcList"
              fit="fit"
            ></el-image>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="操作"
        align="center"
        width="225"
      >
        <template slot-scope="scope">
          <el-tooltip
            class="item"
            effect="light"
            content="点击跳转查看"
            placement="top"
          >
            <el-button type="success" size="small" @click="look(scope.row)"
              >查看</el-button
            >
          </el-tooltip>
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
              >编辑</el-button
            >
          </el-tooltip>
          <el-button type="danger" size="small" @click="handleDel(scope.row)"
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
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import { findBlog, delBlog } from "@/api/blog";
import port from "@/utils/port";
import url from "@/utils/URL_IMG";
import getWeek from '@/utils/getWeek'
export default {
  data() {
    return {
      defaultUrl:
        "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ee7a5adb39ada80120927b128064.jpg%401280w_1l_2o_100sh.jpg&refer=http%3A%2F%2Fimg.zcool.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1651590934&t=6f6f5322ac38e4ec2642f2de55f9857c",
      url,
      listLoading: false,
      page: 1,
      limit: 4,
      total: 0,
      data: new Array(),
      srcList: new Array(),
    };
  },
  created() {
    this.findBlog(this.page, this.limit);
  },
  methods: {
    changePage(page) {
      //改变页码
      this.page = page;
      this.findBlog(this.page, this.limit);
    },
    look({ id }) {
      //跳转查看
      // console.log(id);
      window.open(`${port}/article/${id}`);
    },
    getWeek,
    handleEdit({ id }) {
      //修改

      this.$router.push({
        name: "ArticleEdit",
        params: {
          id,
        },
      });
    },
    handleDel({ id }) {
      //删除
      this.$confirm("确定删除此文章，此操作不可恢复。", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(
        () => {
          delBlog(id).then(() => {
            this.$success("删除成功", () => {
              this.findBlog(this.page, this.limit);
            });
          });
        },
        (err) => {}
      );
    },
    async findBlog(page, limit) {
      this.listLoading = true;
      return findBlog(page, limit).then((res) => {
        this.listLoading = false;
        const { data } = res;
        this.total = data.total;
        this.data = data.rows;
        const bigPage = Math.ceil(this.total / this.limit);
        if (this.page > bigPage) {
          //总页码数不足会重新请求
          this.page = bigPage;
          this.changePage(this.page);
        }
        this.srcList = data.rows.map((item) => {
          return item.thumb === "" ? this.defaultUrl : this.url + item.thumb;
        });
        return this.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>