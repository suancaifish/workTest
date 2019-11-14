<!-- 下拉选择菜单 -->
<template>
    <el-select
        v-model="selectData"
        filterable
        collapse-tags
        :placeholder="placeholder"
        :multiple="multiple"
        :disabled="disabled"
        :clearable="clearable"
        :remote="remote"
        :remote-method="remoteMethod"
        :reserve-keyword="reserveKeyword"
        @change="handleSelect"
        :loading="loading"
    >
        <el-option
            v-for="item in options"
            :key="item[customParam[1]]"
            :label="item[customParam[0]]"
            :value="item[customParam[1]]">
        </el-option>
    </el-select>
</template>

<script>
    export default {
        name: 'selectMenu',
        props: {
            placeholder: { //占位
                type: String,
                default: '请选择',
                required: false
            },
            multiple: { //是否多选
                type: Boolean,
                default: false,
                required: false
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false
            },
            clearable: {
                type: Boolean,
                default: false,
                required: false
            },
            options: { //选项数据 [{label: '',value: ''}]
                type: Array,
                required: true,
                default: function () {
                    return [];
                },
            },
            selectData: { //多选时传入数组
                validator: function (value) {
                    // 允许任何类型
                    return true;
                },
                required: true,
                default: ''
            },
            //自定义label value
            customParam:{
                type: Array,
                required: false,
                default: function () {
                    return ['label','value'];
                },
            },
            // 是否开启远程搜索
            remote:{
                type: Boolean,
                default: false,
                required: false
            },
            // 远程搜索方法
            remoteMethod:{
                type: Function,
                required: false
            },
            // 是否保留搜索关键字
            reserveKeyword:{
                type: Boolean,
                default: false,
                required: false
            },
            loading:{
                type: Boolean,
                default: false,
                required: false
            }

        },
        data() {
            return {};
        },

        computed: {},

        methods: {
            filterMethod(val) { //搜索处理

            },
            handleSelect(val) { //选择回调
                this.$emit('update:selectData', val);
                this.$emit('handleSelect', val);
            }
        },
        watch: {
            selectData: {
                immediate: true,
                deep: true,
                handler(val) {
                    this.$emit('update:selectData', val);
                }
            }
        }
    };
</script>
<style lang='scss' scoped>
    @import 'index';
</style>
