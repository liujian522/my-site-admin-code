<template>
  <div class="penson-container">
    <el-row type="flex" justify="center">
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="70px"
        class="demo-ruleForm"
        hide-required-asterisk
        style="width: 50%"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="登录ID" prop="loginId">
          <el-input v-model="form.loginId" placeholder="请输入登录用的ID" />
        </el-form-item>
        <el-form-item label="旧密码" prop="oldLoginPwd">
          <el-input
            v-model="form.oldLoginPwd"
            type="password"
            placeholder="请输入旧密码"
          />
        </el-form-item>
        <el-form-item label="新密码" prop="loginPwd">
          <el-input
            type="password"
            v-model="form.loginPwd"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="form.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-row type="flex" justify="center">
          <el-button
            type="primary"
            @click="handleClick"
            style="margin-right: 20px"
            >修改</el-button
          >
          <router-link :to="{ path: '/' }">
            <el-button type="danger">返回</el-button>
          </router-link>
        </el-row>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { putAdmin } from "@/api/admin";
import {removeToken} from "@/utils/auth";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.loginPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "超级管理员",
        loginId: "liujian",
        loginPwd: "", //新密码
        checkPass: "", //第二次密码
        oldLoginPwd: "", //旧密码
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "change" }],
        loginId: [
          { required: true, message: "请输入登录ID", trigger: "change" },
        ],
        oldLoginPwd: [
          { required: true, message: "请输入旧密码", trigger: "change" },
        ],
        loginPwd: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleClick() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          putAdmin(this.form).then((res) => {
            if (typeof res === "string") {
              this.$error("旧密码错误，请再次输入", () => {
                this.$refs.form.resetFields();
              });
            } else {
              this.$success("新密码修改成功，返回登录", () => {
                this.$refs.form.resetFields();
                removeToken();
                this.$router.push({ path: "/login" });
              });
            }
          });
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style>
.penson-container {
  padding: 20px;
  margin-top: 100px;
}
</style>