<!--  -->
<template>
    <div class="box-layout freight-rule">
        <div class="freight-rule-wrap">
            <p class="freight-rule-title">店铺计费规则说明：</p>
            <p class="freight-rule-txt">目前仅支持商家选择并默认使用【按商品累加运费】</p>
        </div>
        
        <div class="freight-rule-wrap">
            <p class="freight-rule-title">按商品累加运费：</p>
            <div class="flex-start freight-rule-detail">
                <p class="freight-rule-txt">规则：</p>
                <div>
                    <p class="freight-rule-txt">分别计算出商品使用模板的运费，再进行累加。</p>
                    <p class="freight-rule-txt">1）不同或相同的商品，设置同一运费模板：按该模板设置的规则计算；不足续件的数目的时候，仍然按照续件的数目进行计算。
    例如商品A，B都是用模板M（首1件10元，续2件5元），如果购买商品A和B，各一件，则一共购买两件，运费=10+5=15元。</p>
                    <p class="freight-rule-txt">2）不同的商品，设置不同的运费模板：分别计算每个运费模板规则应收运费，再累加计算合计运费；
        例如： 例如商品A使用用模板M（首1件10元，续1件5元），商品B使用模板N（首2件12元，续1件5元），如果购买商品A和B，各2件，则运费=模板M的运费+模板N的运费=（10+5）+（12）=27元。</p>
                </div>
            </div>
        </div>

        <div class="flex-center">
            <el-button plain @click="handleBack">返回</el-button>
        </div>
        
    </div>
</template>

<script>
export default {
    components: {},

    data() {
        return {};
    },

    computed: {},

    mounted() {},

    methods: {
        handleBack() {
            this.$emit('handleBack', 1);
        }
    }
};
</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>