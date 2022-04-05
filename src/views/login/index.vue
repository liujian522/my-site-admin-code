<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">个人博客管理系统</h3>
      </div>

      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="请输入管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="loginPwd"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="请输入密码"
          name="loginPwd"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>
      <div class="yanzheng">
        <el-checkbox v-model="remember"> 七天免登录 </el-checkbox>
        <div v-html="svg" @click="changeSvg"></div>
      </div>

      <el-form-item prop="captcha">
        <span class="svg-container">
          <svg-icon icon-class="example" />
        </span>
        <el-input
          ref="captcha"
          v-model="loginForm.captcha"
          placeholder="请输入验证码"
          name="captcha"
          type="text"
          tabindex="3"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getCaptcha } from "@/api/captcha";
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        loginId: "",
        loginPwd: "",
        captcha: "",
      },
      remember: true,
      loginRules: {
        loginId: [{ required: true, trigger: "blur", message: "请输入密账号" }],
        loginPwd: [{ required: true, trigger: "blur", message: "请输入密码" }],
        captcha: [{ required: true, trigger: "blur", message: "请输入密码" }],
      },
      loading: false,
      passwordType: "password",
      redirect: undefined,
      svg: "",
    };
  },
  created() {
    this.changeSvg();
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    changeSvg() {
      this.getCaptcha().then((res) => {
        this.svg = res;
      });
    },
    getCaptcha,
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.loginPwd.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.remember) {
            this.loginForm.remember = 7;
          }
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$success("登录成功，正在跳转页面", () => {
                this.$router.push({ path: this.redirect || "/" });
                this.loading = false;
              });
            })
            .catch((err) => {
              this.loading = false;
              if (typeof err === "string") {
                this.$error("验证码错误");
                this.changeSvg();
                this.loginForm.captcha = "";
              } else {
                //账号密码错误
                this.$error("账号密码错误");
                this.changeSvg();
                this.loginForm.loginPwd = "";
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

<style lang="scss">
$bg: #9bb8db;
$light_gray: #fff;
$cursor: #fff;
.yanzheng {
  display: flex;
  margin: 20px 0;
  align-items: center;
  justify-content: space-between;
  div {
    height: 50px;
    width: 150px;
    border: 1px solid #fff;
  }
}
@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 100px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
