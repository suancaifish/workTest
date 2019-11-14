<template>
  <div class="navbar flex-between">
    <div class="flex-start">
      <div class="navbar-logo flex-start">
        <img :src="Logo" alt=" ">
        <p>电商中台系统</p>
      </div>
      <div class="beyond-ellipsis" style="maxWidth: 350px;">
        <breadcrumb class="breadcrumb-container"/>
      </div>
    </div>
    
    <div class="right-menu flex-start">
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item"/>
      </template>
      <p class="welcome-tips">电商中台系统欢迎您： <span>{{userInfo.name}}</span></p>
      <el-dropdown placement="bottom-start" trigger="click" @command="menuCommand">
        <div class="option"><i class="iconfont icon-xuanxiang"></i></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">修改密码</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <xm-dialog :dialogVisible.sync="dialogVisible" :loading="loading" dialogTitle="修改密码" dialogWidth="50%" sureText="修改" :sureClose="false" @handleSure="handleSure" @handleClose="handleClose">
      <el-form ref="userform" :model="userForm" class="password-form" label-width="80px" label-position="left">
        <el-form-item label="账号:">
          <el-input v-model="userForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="原密码:" class="password-item" prop="password">
          <el-input v-model="userForm.password" :type="passwordType" ></el-input>
          <span class="svg-container-right" @click="showPwd(1)">
            <i class="iconfont" :class=" passwordType ? 'icon-yanjing1' : 'icon-yanjing'"></i>
          </span>
        </el-form-item>
        <el-form-item label="新密码:" class="password-item" prop="new_password">
          <el-input v-model="userForm.new_password" :type="newPasswordType" ></el-input>
          <span class="svg-container-right" @click="showPwd(2)">
            <i class="iconfont" :class=" newPasswordType ? 'icon-yanjing1' : 'icon-yanjing'"></i>
          </span>
        </el-form-item>
      </el-form>
    </xm-dialog>
  </div>
</template>

<script>
import crypto from "crypto"; // 加密
import { mapGetters } from "vuex";
import Breadcrumb from "_c/Breadcrumb";
import Hamburger from "_c/Hamburger";
import ErrorLog from "_c/ErrorLog";
import XmDialog from "_c/XmDialog";
import Logo from "@/assets/image/XM_logo.png";
export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    XmDialog
  },
  data() {
    return {
      userInfo: this.$util.getUserInfo() || { name: "super admin" },
      dialogVisible: false,
      userForm: {
        username: this.$util.getUserInfo().username,
        password: "",
        new_password: "",
        id: this.$util.getUserInfo().id
      },
      passwordType: "password",
      newPasswordType: "password",
      rules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" }
        ]
      },
      loading: false,
      Logo: Logo,
      colorSelect: [
        {
          normal: "#545c64",
          active: "#267AFA"
        },
        {
          normal: "#545c64",
          active: "#FE5B63"
        },
        {
          normal: "#545c64",
          active: "#FF8830"
        },
        {
          normal: "#545c64",
          active: "#A988FF"
        },
        {
          normal: "#545c64",
          active: "#1AD49F"
        }
      ],
      screenBol: false,
      screenTimer: false
    };
  },
  computed: {
    ...mapGetters(["name", "device"]),
  },
  methods: {
    showPwd(num) {
      //是否明文密码
      if (num == 1) {
        this.passwordType = this.passwordType === "password" ? "" : "password";
      } else {
        this.newPasswordType =
          this.newPasswordType === "password" ? "" : "password";
      }
    },
    logout() {
      this.$store.dispatch("LogOut").then(() => {
        if (window.self != window.top) {
          //嵌入iframe
          window.parent.loginOut();
        } else {
          location.reload();
        }
      });
    },
    handleSure() {
      //确定
      this.loading = true;
      let params = JSON.parse(JSON.stringify(this.userForm));
      params.password = this.$util.getmd5(params.password);
      params.new_password = this.$util.getmd5(params.new_password);
      this.$api.login
        .update_password(params)
        .then(() => {
          let loginForm = this.$util.Storage.getObj("loginInfo");
          if (loginForm) {
            loginForm.password = this.cipher(this.userForm.new_password, "XM");
            this.$util.Storage.setObj("loginInfo", loginForm);
          }
          this.reset();
        })
        .catch(err => {
          this.loading = false;
          console.log(err);
        });
    },
    cipher(mainText, subText) {
      // 加密
      const cipher = crypto.createCipher("aes192", subText);
      let encrypted = cipher.update(mainText, "utf8", "hex");
      encrypted += cipher.final("hex");
      return encrypted;
    },
    handleClose() {
      // 取消
      this.reset();
    },
    reset() {
      this.dialogVisible = false;
      this.loading = false;
      this.$refs["userform"].resetFields();
      this.passwordType = "password";
      this.newPasswordType = "password";
    },
    menuCommand(val) {
      switch (val) {
        case "1":
          this.dialogVisible = true;
          break;
        case "2":
          this.logout();
          break;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
$bg: #1c1a21;
$dark_gray: #889aa4;
$font-color: #676a6c;
.navbar {
  height: 40px;
  line-height: 40px;
  border-radius: 0px !important;
  background: $bg;
  .navbar-logo {
    width: 230px;
    img {
      width: 48px;
      height: 32px;
    }
    p {
      color: #fff;
    }
  }
  .prdid-tag {
    cursor: pointer;
    li {
      padding: 0 18px;
      line-height: 40px;
      color: #fff;
      opacity: 0.6;
      transition: 0.3s;
      .product_name {
        position: relative;
        transition: 0.2s all linear;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          top: -7px;
          left: 0;
          width: 0;
          height: 100%;
          border-bottom: 2px solid #fff;
          transition: 0.2s all linear;
        }
        &:hover::before {
          width: 100%;
          top: -7px;
          left: 0;
        }
      }
      &:hover {
        opacity: 1;
      }
    }
    .selected {
      opacity: 1;
      .product_name {
        &::before {
          width: 100%;
          top: -7px;
          left: 0;
        }
      }
    }
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    padding-right: 10px;
    .welcome-tips {
      margin-left: 28px;
      span {
        color: #fff;
        font-weight: 900;
      }
    }
    .option {
      font-weight: bold;
      cursor: pointer;
      padding-left: 10px;
      i {
        color: #ff4338;
      }
    }
  }
  .password-form {
    width: 60%;
    margin: 0 auto;
    .el-input__inner {
      padding: 0 20px;
    }
    .password-item {
      position: relative;
      .svg-container {
        color: $dark_gray;
        vertical-align: middle;
        display: inline-block;
      }

      .svg-container-right {
        position: absolute;
        right: 5px;
        top: 2px;
        @extend .svg-container;
      }
    }
  }
}
</style>
