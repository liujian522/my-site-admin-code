<template>
  <div class="setting-container">
    <el-form
      :model="form"
      ref="form"
      label-width="100px"
      class="demo-ruleForm"
      hide-required-asterisk
      style="width: 100%"
    >
      <h3 class="title">网站基本-信息</h3>
      <el-form-item label="网站标题">
        <el-input
          v-model="form.siteTitle"
          placeholder="请输网站标题"
          class="input"
        />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input placeholder="请输入邮箱" v-model="form.mail" class="input" />
      </el-form-item>
      <el-form-item label="备案号">
        <el-input placeholder="请输入备案号" v-model="form.icp" class="input" />
      </el-form-item>
      <hr />
      <h3 class="title">网站头像-信息</h3>
      <el-form-item label="头像地址">
        <el-input
          placeholder="请输入头像地址"
          v-model="form.avatar"
          class="input"
        />
      </el-form-item>
      <el-image
        style="width: 100px; height: 100px; margin: 0 0 20px 300px"
        :src="form.avatar"
        :fit="fit"
      ></el-image>
      <hr />
      <h3 class="title">网址图标-信息</h3>
      <el-form-item label="网站图标地址">
        <el-input
          placeholder="请输入网站图标地址"
          v-model="form.favicon"
          class="input"
        />
      </el-form-item>
      <el-image
        style="width: 25px; height: 25px; margin: 0 0 20px 337px"
        :src="form.favicon"
        :fit="fit"
      ></el-image>
      <hr />
      <h3 class="title">github-信息</h3>
      <el-form-item label="github名字">
        <el-input
          placeholder="请输入github名字"
          v-model="form.githubName"
          class="input"
        />
      </el-form-item>
      <el-form-item label="github地址">
        <el-input
          placeholder="请输入github地址"
          v-model="form.github"
          class="input"
        />
      </el-form-item>
      <hr />
      <h3 class="title">QQ-信息</h3>
      <el-form-item label="QQ号码">
        <el-input placeholder="请输入QQ号码" v-model="form.qq" class="input" />
      </el-form-item>
      <el-form-item label="QQ二维码">
        <el-input
          placeholder="请输入QQ二维码地址"
          v-model="form.qqQrCode"
          class="input"
        />
      </el-form-item>
      <el-image
        style="width: 100px; height: 100px; margin: 0 0 20px 300px"
        :src="form.qqQrCode"
        :fit="fit"
      ></el-image>
      <hr />
      <h3 class="title">微信-信息</h3>
      <el-form-item label="微信号码">
        <el-input
          placeholder="请输入微信号码"
          v-model="form.weixin"
          class="input"
        />
      </el-form-item>
      <el-form-item label="微信二维码">
        <el-input
          placeholder="请输入QQ二维码地址"
          v-model="form.weixinQrCode"
          class="input"
        />
      </el-form-item>
      <el-image
        style="width: 100px; height: 100px; margin: 0 0 20px 300px"
        :src="form.weixinQrCode"
        :fit="fit"
      ></el-image>
      <hr />
    </el-form>
    <el-row type="flex" justify="center">
      <el-button type="primary" @click="handleClick" style="margin:50px;" >设置</el-button>
    </el-row>
  </div>
</template>

<script>
import { getSettings ,putSettings} from "@/api/setting";
// avatar: "http://www.duyiedu.com/source/img/logo.png"
// favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f"
// github: "https://github.com/DuYi-Edu"
// githubName: "DuYi-Edu"
// icp: "黑ICP备17001719号"
// id: "624592fdc116e648308379f0"
// mail: "duyi@gmail.com"
// qq: "3263023350"
// qqQrCode: "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png"
// siteTitle: "我的个人空间"
// weixin: "yh777bao"
// weixinQrCode:
export default {
  data() {
    return {
      fit:'fit',
      form: {},
    };
  },
  methods: {
    handleClick(){
      putSettings(this.form).then(res=>{
        if(res){
          this.$success('设置成功')
        }
      })
    },
    feachData() {
      getSettings().then(({ data }) => {
        this.form = data;
      });
    },
  },
  created() {
    this.feachData();
  },
};
</script>

<style>
.setting-container {
  padding: 20px;
}
.title {
  margin: 20px 0;
}
.input {
  width: 70%;
}
</style>