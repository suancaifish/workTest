<!-- 面包屑 -->
<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">{{ item.meta.title }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    ...mapActions([
      'setBreadCrumb',
    ]),
    getBreadcrumb() {
      const { params } = this.$route;
      let matched = this.$route.matched.filter(item => {
        if (item.name) {
          var toPath = pathToRegexp.compile(item.path);
          item.path = toPath(params);
          return true;
        }
      })
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== 'Home'.toLocaleLowerCase()) {
        matched = [{ path: '/home', meta: { title: '工作台' }}].concat(matched);
      }
      this.levelList = matched;
      this.setBreadCrumb(this.getBreadcrumbFormat(matched));
    },
    getBreadcrumbFormat(arr){
      let breadCrumb = '';
      arr.forEach(item => {
        breadCrumb += item.meta.title + '-';
      })
      breadCrumb = breadCrumb.substring(0,breadCrumb.length-1);
      return breadCrumb;
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "index";
</style>
