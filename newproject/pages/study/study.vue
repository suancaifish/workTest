<template>
    <view>
        <view class="f26">学习页面</view>
        <button @click="btn">学习按钮</button>
    </view>
</template>

<script>
import log from "../../common/log.js";
export default {
    data() {
        return {};
    },
    async created() {
        const error = new Error("test error");
        error.code = -1;
        throw error;
    },
    onShow() {},
    methods: {
        doIt() {
            return X;
        },
        btn() {
			let err = new Error("好好学习，天天向上");
			 throw err
        }
    }
};
</script>

<style>
</style>
