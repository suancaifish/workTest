<template>
  <view class>
    <view>
      11111
      <button @click="clickBtn">提交</button>
    </view>
  </view>
</template>this

<script>
import log from "../../common/log.js";

export default {
  components: {},
  data() {
    return {};
  },
  onShow() {
    // console.log(1)
    // log.info('index') // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
    // log.warn('index')
    // log.error('index')
    // log.setFilterMsg('filterkeyword')
    // log.setFilterMsg('addfilterkeyword')
  },
  methods: {
	  clickBtn(){
		  console.log('点击了按钮');
	  }
  }
};
</script>

<style>
uni-page-body {
  background-color: #f4f4f4;
}

.p10 {
  padding: 10px;
  font-size: 16px;
}
</style>
