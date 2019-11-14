<template>
  <section class="app-main">
    <transition :name="transitionName" mode="out-in">
      <!-- 页面缓存 需要缓存的页面加上Name -->
      <keep-alive :include="cachedViews" > 
        <router-view :key="key" class="child-view"/>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  data() {
    return {
      transitionName: '',
    }
  },
  computed: {
    cachedViews() { //缓存
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    }
  },
  watch:{
    cachedViews:function(val){
      
    },
    '$route' (to, from) {
      if(to.path == '/home'){
        this.transitionName = 'slide-right';
      }else if(from.path == '/home'){
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  position: relative;
  background: #f0f2f5;
  box-sizing: border-box;
  padding: 0px 10px; 
  .child-view {
    
  }
}
</style>

