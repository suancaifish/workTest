<template>
    <view>
        <view class="f26">我的页面</view>
    </view>
</template>

<script>
import log from "../../common/log.js";
export default {
    components: {},
    data() {
        return {
            isok: true,
            data: ["ps", "css"]
        };
	},
	created(){
		
	},

    onShow() {},
    methods: {}
};
</script>

<style>
.aa {
    height: 400rpx;
    overflow: auto;
}

.dd {
    height: 100rpx;
}
.cjw {
    height: 300rpx;
    width: 400rpx;
    background: pink;
}
.input-placeholder {
    position: relative;
    top: 0;
    left: 0;
    color: #007aff;
}
</style>
