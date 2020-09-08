<template>
    <view>
        <view class="f26">学习页面</view>
        <button @click="stop">停止下拉刷新</button>
        <StudyDate ></StudyDate>
    </view>
</template>

<script>
import StudyDate from 'pageA/studypages/StudyDate/StudyDate'
export default {
    data() {
        return {};
    },
    components: {  StudyDate},
    methods: {stop(){
        uni.stopPullDownRefresh()
    }}
};
</script>

<style>
</style>
