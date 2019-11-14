<!-- 自定义超出的滚动条 -->
<template>
  <div>
    <div class="xm-scroll" v-loading="loading" :element-loading-text="loadingText" :style="{height: scrollHeight ? scrollHeight : '100%'}">
      <el-scrollbar ref='elScroll' wrap-class="el-select-dropdown__wrap" view-class="el-select-dropdown__list" style="height:100%;">
        <slot></slot>
      </el-scrollbar>
    </div>
    <transition :name="transitionName">
      <div v-show="visible && backToTopShow" :style="customStyle" class="back-to-ceiling" @click="backToTop">
        <svg width="16" height="16" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" class="Icon Icon--backToTopArrow" aria-hidden="true" :style="{height: '16px', width: '16px',transform: rotate ? 'rotate(180deg)' : 'rotate(0deg)'}">
          <title>回到顶部</title>
          <g>
            <path d="M12.036 15.59c0 .55-.453.995-.997.995H5.032c-.55 0-.997-.445-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29c.39-.39 1.026-.385 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z" fill-rule="evenodd"/>
          </g>
        </svg>
      </div>
    </transition>
  </div>
  
</template>

<script>
export default {
  name: "XmScroll",
  props: {
    scrollHeight: {
      // 最大高度
      type: String,
      default: "100%",
      required: false
    },
    loading: { 
      // 是否内部需要loading
      type: Boolean,
      default: false,
      required: false
    },
    loadingText:{
      // loading文字
      type: String,
      default: "加载中",
      required: false
    },
    visibilityHeight: {
      type: Number,
      default: 20,
    },
    backPosition: {
      type: Number,
      default: 0
    },
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '20px',
          bottom: '20px',
          width: '40px',
          height: '40px',
          'border-radius': '4px',
          'line-height': '45px',
          background: '#545c64'
        }
      }
    },
    transitionName: {
      type: String,
      default: 'fade'
    },
    backToTopShow:{
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      interval: null,
      isMoving: false,
      lastScrollTop: 0,
      rotate: false,
    }
  },
  mounted() {
    if(this.backToTopShow) this.$refs.elScroll.wrap.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    if(this.backToTopShow) this.$refs.elScroll.wrap.removeEventListener('scroll', this.handleScroll);
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    handleScroll() {
      this.visible = this.$refs.elScroll.wrap.scrollTop > this.visibilityHeight;
      if(this.lastScrollTop > this.$refs.elScroll.wrap.scrollTop) {
        this.rotate = false;
      }else{
        this.rotate = true;
      }
      this.lastScrollTop = this.$refs.elScroll.wrap.scrollTop;
    },
    backToTop() {
      if (this.isMoving) return
      const start = this.$refs.elScroll.wrap.scrollTop;
      const end = this.rotate ? this.$refs.elScroll.wrap.scrollHeight : this.backPosition;
      const step = this.rotate ? start : -start;
      let i = 0;
      this.isMoving = true;
      this.interval = setInterval(() => {
        const next = Math.floor(this.easeInOutQuad(50 * i, start, step, 500));
        if(!this.rotate) {
          if (next <= end) {
            this.$refs.elScroll.wrap.scrollTo(0, end)
            clearInterval(this.interval)
            this.isMoving = false
          }else {
            this.$refs.elScroll.wrap.scrollTo(0, next)
          }
        }else{
           if (next >= end) {
            this.$refs.elScroll.wrap.scrollTo(0, end)
            clearInterval(this.interval)
            this.isMoving = false
          }else {
            this.$refs.elScroll.wrap.scrollTo(0, next)
          }
        }
        i++
      }, 16.7)
    },
    backToZero() {
      this.$refs.elScroll.wrap.scrollTo(0, 0);
    },
    easeInOutQuad(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }
  }
};
</script>
<style lang='scss'>
  @import "index";
</style>

