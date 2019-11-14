<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      
      <!-- <div class="denglu-logo">
        <img :src="denglu_logo" alt=" ">
      </div> -->

      <div class="title-container">
        <h3 class="title">用户登录</h3>
      </div>

      <el-form-item prop="username" class="login-input-bg">
        <span class="svg-container">
          <i class="iconfont icon-yonghu"></i>
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
        />
      </el-form-item>

      <el-form-item prop="password" class="login-input-bg">
        <span class="svg-container">
          <i class="iconfont icon-mima-copy-copy"></i>
        </span>
        <el-input
          :type="passwordType"
          v-model="loginForm.password"
          placeholder="密码"
          name="password"
          @keyup.enter.native="handleLogin" />
        <span class="svg-container-right" @click="showPwd">
          <i class="iconfont" :class=" passwordType ? 'icon-yanjing1' : 'icon-yanjing'"></i>
        </span>
      </el-form-item>
      <div class="flex-between">

        <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>

        <el-button :loading="loading" type="info" class="login-btn" @click.native.prevent="handleLogin" @keyup.enter="handleLogin">登录</el-button>

      </div>
      

    </el-form>
  </div>
</template>

<script>
import denglu_logo from '@/assets/image/denglu-logo.png';
import crypto from 'crypto'; // 加密
// import { isvalidUsername } from '@/utils/validate';

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => { //用户名验证规则
      if(this.$util.CommonUtils.isEmptyOrNull(value)) {
        callback(new Error('请输入用户名'));
      }else{
        callback();
      }
      
    }
    const validatePassword = (rule, value, callback) => { //密码验证规则
      if(this.$util.CommonUtils.isEmptyOrNull(value)) {
        callback(new Error('请输入密码'));
      }else{
        callback();
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      denglu_logo: denglu_logo
    }
  },
  mounted(){
    this.init();
  },
  beforeDestroy(){
    window.removeEventListener('keydown', this.handerEnter);
  },
  methods: {
    showPwd() { //是否明文密码
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() { // 登录
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: this.redirect || '/' });
            
            if(this.loginForm.remember){
              this.loginForm.password = this.cipher(this.loginForm.password, "XM"); //密码加密保存
              this.$util.Storage.setObj('loginInfo',this.loginForm); //记住密码
            }else{
              this.$util.Storage.remove('loginInfo');
            }
          }).catch((err) => {
            this.loading = false;
            console.log(err);
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    init(){
      window.addEventListener('keydown', this.handerEnter);
      let loginForm = this.$util.Storage.getObj('loginInfo');
      if(loginForm){
        loginForm.password = this.decipher(loginForm.password,"XM");
        this.loginForm = Object.assign({},loginForm);
      }
    },
    handerEnter(e){
      if(e.keyCode == 13){
        this.handleLogin();
      }
    },
    cipher(mainText, subText) {
      // 加密
      const cipher = crypto.createCipher("aes192", subText);
      let encrypted = cipher.update(mainText, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    },
    //解密
    decipher(mainText, subText) {
      const decipher = crypto.createDecipher("aes192", subText);
      let decrypted = decipher.update(mainText, "hex", "utf8");

      decrypted += decipher.final("utf8");
      return decrypted;
    },
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      vertical-align: middle;
      width: 85%;
      input {
        background: #2d3a4b;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #2d3a4b inset !important;
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

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "index";
</style>
