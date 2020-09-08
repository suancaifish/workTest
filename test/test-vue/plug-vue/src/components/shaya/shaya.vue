<template>
    <div>
        <van-button type="default" @click="dianjixiaoshi">默认按钮</van-button>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="info">信息按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>
    </div>
</template>

<script>
import { Notify } from 'vant';


export default {
    name: "shaya",
    data() {
        return {};
    },
    created() {},
    methods: {
        dianjixiaoshi(){
            this.$toast('欢迎')
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
