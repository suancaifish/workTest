<template>
    <view>
        <view class>index</view>
        <!-- <view
            class="br10 shadow pt60 pr30 pb30 pl30 rel mt30"
            v-for="item in currentModuleData"
            :key="item.name"
        >
            <view class="title f26" @click="tips">{{item.name}}</view>
        </view>-->
        <!-- <view class>{{name}}</view> -->
        <view class>hello,{{name2}}</view>
        <button @click="doIt">doIt</button>
    </view>
</template>

<script>
import BaseButton from "components/base-button/base-button";
export default {
    components: {},
    data() {
        return {
            currentModuleData: ""
        };
    },
    components: {
        BaseButton //基础按钮组件：传text按钮值进去，点击事件clickBtn
    },
   
    onShow() {
        this.update();
    },
    computed: {
        name2() {
            return y;
        }
    },
    methods: {
      
        doIt() {
            return cjw
        },
        update() {
            this.$http
                .get(
                    `${this.$api.course.getCoursePlanList}?page=${
                        this.page
                    }&size=${3}&tagID=${7}`,
                    { "Content-Type": "application/json;charset=UTF-8" }
                )
                .then(res => {
			
                    this.currentModuleData = res.data.list;
                });
        },
        tips() {
            uni.showActionSheet({
                itemList: ["huahua", "fafa", "baba"],
                itemColor: "#59bc58",
                success: res => {
                    console.log("选中了第" + (res.tapIndex + 1) + "个按钮");
                },
                fail: res => {
                    console.log(res.errMsg);
                }
            });
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
