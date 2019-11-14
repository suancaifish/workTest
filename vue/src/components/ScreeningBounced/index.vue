<!-- 用户筛选 -->
<template>
    <el-dialog
        class="diaiog"
        :title="dialogTitle"
        :visible.sync="dialogVisible"
        :width="'80%'"
        :before-close="handleBeforeClose"
        :close-on-click-modal="false"
        @close="handleClose">
        <div class="dialog-content">
            <el-form class="user-diaiog" label-position="left">
                <el-checkbox-group v-model="queryList">
                    <div class="flex-wrap-start">
                        <el-form-item v-for="item in modalDataFormat" :key="item.value"  v-if="!item.hide" class="el-form-item-user">
                            <template v-if="item.type == 'dateTimer'">
                                <div class="flex-start">
                                    <el-checkbox :label="item.value" :disabled="item.disabled" class="check_box_item" @change="dateTimeSelectChange(item)">{{item.label}}</el-checkbox>
                                    <time-range :dateTime.sync="item.selectValue" :disabled="item.disabled"></time-range>
                                </div>
                            </template>
                            <template v-else-if="item.type == 'selectMenu'">
                                <div class="flex-start">
                                    <el-checkbox :label="item.value" class="check_box_item" :disabled="item.disabled">
                                        {{item.label}}
                                    </el-checkbox>
                                    <select-menu
                                        size="mini" 
                                        :selectData.sync="item.selectValue" 
                                        :value="item.value"
                                        :disabled="item.disabled"
                                        :options="item.selectData">
                                    </select-menu>
                                </div>
                            </template>
                            <template v-else-if="item.type == 'cascader'">
                                <div class="flex-start">
                                    <el-checkbox 
                                        :disabled="item.disabled" 
                                        :label="item.value" class="check_box_item"
                                    >{{item.label}}
                                    </el-checkbox>
                                    <el-cascader
                                        v-model="item.selectValue"
                                        :options="item.selectData"
                                        :disabled="item.disabled"
                                        filterable
                                        change-on-select
                                    ></el-cascader>
                                </div>
                            </template>
                            <template v-else>
                                <div class="flex-start">
                                    <el-checkbox 
                                        :disabled="item.disabled" 
                                        :label="item.value" class="check_box_item"
                                    >{{item.label}}
                                    </el-checkbox>
                                    <el-input v-model="item.selectValue" class="search-input" :placeholder="item.placeholder ? item.placeholder : ''"></el-input>
                                </div>
                            </template>
                        </el-form-item>
                    </div>
                </el-checkbox-group>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSure">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import TimeRange from "_c/TimeRange";
    import SelectMenu from "_c/SelectMenu";
    export default {
        components: {
            TimeRange,
            SelectMenu
        },
        props: {
            // 显示隐藏
            dialogVisible: {
                type: Boolean,
                required: true,
                default: false
            },
            //标题
            dialogTitle: {
                type: String,
                required: false,
                default: "筛选条件"
            },
            modalData: {
                //列表数据
                type: Array,
                required: true,
                default: () => []
            },
            activityShow:{
                //活动筛选展示
                type: Boolean,
                required: false,
                default: true
            },
            orderTypeShow:{
                //订单类型展示
                type: Boolean,
                required: false,
                default: false
            },
            totalStation:{
                //全站筛选
                type: Array,
                required: false,
                default: () => []
            },
            activityFiltrate:{
                //活动筛选
                type: Array,
                required: false,
                default: () => []
            }
    },
    data() {
        return {
            queryList: []
        };
    },

    computed: {
        modalDataFormat(){
            let modalDataFormat = [];
            this.totalStation.forEach(item => {
                modalDataFormat.push(this.modalData.find(i => {
                    return i.value == item
                }))
            })
            return modalDataFormat
        },

    },

    methods: {
        //关闭前
        handleBeforeClose(done) {
            this.$emit("handleBeforeClose");
            done();
        },
        //关闭
        handleClose() {
            this.$emit("update:dialogVisible", false);
            this.$emit("handleClose");
        },
        //确认
        handleSure() {
            let tagData = [];
            let queryForm = [];
            let modalDataFormat = [...this.modalDataFormat];
            this.queryList.forEach(item => {
                let tag = modalDataFormat.find(i => {
                    return i.value == item;
                });
                if(!tag.selectData[0]) tag.selectData[0] = {value: ''};
                if (!tag.selectValue) tag.selectValue = tag.selectData[0].value;
                if (Array.isArray(tag.selectValue) && tag.selectValue.length == 0){
                    tag.selectValue = tag.selectData[0] ? [tag.selectData[0].value] : [''];
                }
                if (tag.type == "dateTimer") {
                    //日期
                    if (!tag.selectValue || tag.selectValue.length == 0) tag.selectValue = [new Date(), new Date()];
                    tag.selectName = new Date(tag.selectValue[0]).Format("yyyy/MM/dd") +  " -- " + new Date(tag.selectValue[1]).Format("yyyy/MM/dd");           
                } else if (tag.type == "cascader") {
                    let tagName = "";
                    if(!Array.isArray(tag.selectValue)) tag.selectValue = tag.selectData[0] ? [tag.selectData[0].value] : [''];
                    let parentData = tag.selectData.find(i => {return i.value == tag.selectValue[0]});
                    if(parentData){
                        tag.selectValue.forEach((item, index) => {
                            if (index > 0) {
                                parentData = parentData.children.find(i => {return i.value == item});
                                tagName += " / " + parentData.label;
                            } else {
                                tagName += parentData.label;
                            }
                        });
                    }
                    tag.selectName = tagName;
                } else {
                    tag.selectName = tag.selectData.find(i => { return i.value == tag.selectValue}).label;
                }
                tag.selectName =  tag.selectName ?  tag.selectName : '';
                queryForm[tag.value] = tag.selectValue;
                tagData.push(tag);
            });
            this.$emit("update:dialogVisible", false);
            this.$emit("handleSure", {
                tagData: tagData,
                queryForm: queryForm
            });
        },
        dateTimeSelectChange(item) {
            item.selectValue = [new Date(new Date().Format("yyyy/MM/dd")),new Date()];
        }
    }
    };
</script>
<style lang='scss'>
    @import "index";
</style>
