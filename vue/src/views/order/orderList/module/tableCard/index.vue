<!--  -->
<template>
    <div class="table-card">
        <div class="flex-between table-title">
			<!-- 表格标题 -->
			<slot name="titleHeader"></slot>
			<div class="flex-start header-button">
				<!-- 表格右上角增加自定义的按钮 -->
				<slot name="header"></slot>
			</div>
		</div>
        <div class="table-content">
            <el-row class="table-card-header">
                <el-col class="table-card-header-list" v-for="(item,index) in columns" :key="index" :span="item.width">
                    <el-checkbox class="check-all" :title="checkAll ? '取消当前页全部数据' : '勾选当前页全部数据'" v-if="index == 0 && selection && tableData.length > 0" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">{{''}}</el-checkbox>
                    <p>{{item.label}}</p>
                </el-col>
                <el-col class="table-card-header-list" v-if="operation" :span="operationWidth"><p>{{operationLabel}}</p></el-col>
            </el-row>
            <div class="table-card-content" v-loading="loading">
                <el-checkbox-group v-model="checkedList" @change="handleCheckedChange" v-if="tableData.length > 0">
                    <ul class="table-card-list">
                        <li  v-for="(item,index) in tableData" :key="index">
                            <div class="table-card-list-title" :class="selection ? 'p-left' : ''">
                                <el-checkbox v-if="selection" class="check-list" :label="item[keyId]" :key="item[keyId]">{{''}}</el-checkbox>
                                <slot name="listTitle" :data="{data: item, $index: index}"></slot>
                            </div>

                            <div class="table-card-list-content">
                                <slot name="listContent" :data="{data: item, $index: index}"></slot>
                            </div>

                            <div class="table-card-list-footer">
                                <slot name="listFooter" :data="{data: item, $index: index}"></slot>
                            </div>
                        </li>
                    </ul>
                </el-checkbox-group>
                <div v-else class="flex-center no-table-data">
                    <p>暂无数据</p>
                </div>
            </div>
            <slot name="footer"></slot>
        </div>
    </div>
</template>

<script>

export default {

    components: {},

    props: {
        tableData: {
			type: Array,
			required: true,
			default: () => []
        },

		//列数据
		columns: {
			type: Array,
			required: true,
			default: () => []
        },

        loading: {
            type: Boolean,
            required: false,
            default: false
        },

        //是否启用操作栏
		operation: {
			type: Boolean,
			default: false,
			required: false
        },

		operationFixed: {
		//操作栏是否固定 String: 'left' || 'right'
			type: [String, Boolean],
			default: "right",
			required: false
        },

		//操作栏的宽度
		operationWidth: {
			type: [String, Number],
			default: "145"
        },

        // 操作栏名字
		operationLabel: {
			type: String,
			default: '操作',
			required: false
        },
        
        selection: {
            type: [Boolean, String],
			default: false,
			required: false
        },

        keyId: {
            type: String,
			default: 'id',
			required: false
        }
    },

    data () {
        return {
            isIndeterminate: false,
            checkAll: false,
            checkedList: []
        };
    },

    computed: {},

    mounted() {},

    methods: {
        handleCheckAllChange(val) {
            let checkedList = [...this.checkedList];
            if(val) {
                this.tableData.forEach(item => {
                    if(!checkedList.includes(item[this.keyId])) {
                        checkedList.push(item[this.keyId])
                    }
                })
            }else{
                let allKey = [];
                this.tableData.forEach(item => {
                    allKey.push(item[this.keyId])
                })
                checkedList = checkedList.filter(item => {
                    if(!allKey.includes(item)) {
                        return item
                    }
                })
            }
            this.checkedList = checkedList;
            this.$emit('selectionChange', checkedList);
            this.isIndeterminate = false;
        },

        judgeIndeterminate(arr) {
            let checkPresent = [];
            let allKey = [];
            this.tableData.forEach(item => {
                allKey.push(item[this.keyId])
            });
            checkPresent = allKey.filter(item => {
                if(arr.includes(item)) {
                    return item
                }
            })
            let checkedCount = checkPresent.length;
            this.checkAll = checkedCount === this.tableData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData.length;
        },

        handleCheckedChange(value) {
            this.judgeIndeterminate(value);
            this.$emit('selectionChange', value);
        },

        upDateChecked(checkedList) {
            this.$nextTick().then(() => {
                this.checkedList = checkedList;
                this.judgeIndeterminate(checkedList);
            })
           
        }
    }
}

</script>
<style lang='scss' scoped>
@import 'index.scss';
</style>
