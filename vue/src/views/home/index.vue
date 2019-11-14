<!-- 工作台 -->
<template>
  <div class="workbench flex-column" v-loading="loading"><img :src="workBenchImg" alt=""></div>
</template>

<script>
import home1 from "@/assets/image/home1.png";
import home2 from "@/assets/image/home2.png";
import home3 from "@/assets/image/home3.jpg";
import home4 from "@/assets/image/home4.jpg";
import home5 from "@/assets/image/home5.jpg";
import home6 from "@/assets/image/home6.jpg";
export default {
  data() {
    return {
      workBench: [home1,home2,home3,home4,home5,home6],
      loading: false,
      workBenchImg: '',
    };
  },
  computed: {

  },
  mounted(){
    this.init();
  },
  methods:{
    init(){
      this.workBenchImg = this.workBench[1];
    }
  },
  watch:{

  }

};
</script>
<style lang='scss' scoped>
	@import "index";
</style>	
