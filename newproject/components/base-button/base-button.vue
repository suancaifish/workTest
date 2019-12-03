<!--
 * @Desc: 基础逐渐按钮
 * @props {backgroundColor  按钮颜色   text 按钮文字   disabled 禁用状态}
 * @Author: suancaifish
 * @Date: 2019-11-11 09:28:38
 * @LastEditTime: 2019-11-19 09:49:28
 -->
<template>
    <button
        class=" f24 br2000 tc h44 lh44"
        :class="[backgroundColor=='gray'||disabled==true?'gray-status-btn':'orange-status-btn']"
        @click="clickBtn"
        :data-text="text"
        type="primary"
        :disabled="disabled"
    >{{text}}</button>
</template>

<script>
export default {
    props: {
        text: {
            // 按钮文字
            type: String,
            default: "做作业"
        },
        backgroundColor: {
            //用来判断按钮背景色的颜色，orange就是ff6c00渐变 gray就是灰色渐变
            type: String,
            default: "orange"
        },
        disabled:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        clickBtn(e) {
            // 点击事件传递
            this.$emit("clickBtn", e.currentTarget.dataset.text);
        }
    }
};
</script>

<style lang="scss" scoped>
$orange: #ff6c00;
$blue: #65a6fe;
$success: #2bcca0;
$error: #fc5257;
.orange-status-btn {
    display: inline-block;
    box-sizing: border-box;
    width: 140rpx;
    // padding:0 30rpx;
    color: #fff;
    background: linear-gradient(135deg, $orange, #fe7f02, #fc9103);
}
.gray-status-btn {
    display: inline-block;
    box-sizing: border-box;
    width: 140rpx;
    // padding:0 30rpx;
    color: #fff;
    background: linear-gradient(135deg, #999999, #bbbbbb);
}
button{
    padding-left: 0;
    padding-right: 0;
   &::after{
    border: none;
} 
}

</style>