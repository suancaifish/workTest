<!-- 模板页面 -->
<template>
    <div class="batchTask">
        <search-box ref="searchBox">
            <!--管理列表查询条件-->
            <template slot="search-box-form">
                <el-form :inline="true" :model="formData" label-width="100px" label-position="left" ref="searchBoxForm">
					<el-form-item label="任务状态" class="el-form-item-normal">
						<select-menu :selectData.sync="formData.taskStatus" :options="conditionOption" :clearable="true"></select-menu>
					</el-form-item>
                    <el-form-item label="备注" prop="remark" class="el-form-item-normal">
                        <el-input v-model="formData.remark"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <!--查询条件下方按钮-->
            <template slot="search-box-btn" slot-scope="scope">
                <button-list
                    :layout="['search','reset']"
                    :searchLoading="searchLoading"
                    @handleReset="handleReset"
                    @handleSearch="handleSearch"
                >
                </button-list>
            </template>
        </search-box>

        <!-- 表格 -->
        <table-list
            class="table-list"
            ref="tableList"
            :operation="false"
            :operationWidth="'100'"
            :tableData="tableData"
            :columns="columns"
            :tableTitle="tableTitle"
            :loading.sync="searchLoading"
            :tableFormat="formatting"
        >

            <!-- 分页 -->
            <template slot="footer">
                <pagination 
                    class="pagination" 
                    :currentPage="formData.page.page_no" 
                    :total="formData.pageTotal"
                    @currentChange="currentChange" 
                    @sizeChange="sizeChange"
                ></pagination>
            </template>
        </table-list>

    </div>
</template>

<script>
import SearchBox from "_c/SearchBox";
import TableList from "_c/TableList";
import Pagination from "_c/Pagination";
import ButtonList from '_c/ButtonList';
import TimeRange from "_c/TimeRange";
import SelectMenu from "_c/SelectMenu";
import XmDialog from "_c/XmDialog";
import { columns, resultOption} from "./defaultData";

export default {
    components: {
        SearchBox,
        TableList,
        ButtonList,
        Pagination,
        TimeRange,
        SelectMenu,
        XmDialog
    },
    name: 'batchTask',
    data() {
        return {
            //查询数据
            formData: {
                remark: '',
                taskStatus: null,
                page: {
                    page_no: 1,
                    page_size: 50
                },
                pageTotal: 0,
            },
            conditionOption: [{label: '待执行',value: 0},{label: '执行中',value: 3},{label: '已完成',value: 4}],

            // 按钮
            searchLoading: false, //查询loading

            //表格
            columns: columns, //表格列
            tableTitle: "表格",
            tableData: [], //表格数据

        };
    },
    mounted() {
        // this.init();
    },
    methods: {
        init() {
            this.pageQuery();
        },

        // 查询数据
        pageQuery() {
            this.searchLoading = true;
            let data = this.$util.CommonUtils.formatParams(this.formData);
			this.searchLoading = false;
            return this.$api.batchTask.listForPage(data).then(res => {
                this.tableData = res.data.total_datas;
                this.formData.pageTotal = res.data.total_count;
            }).finally(() => {
                this.searchLoading = false;
            });
        },

        // 查询按钮
        handleSearch() {
            this.formData.page = {
                page_no: 1,
                page_size: 50
            }
            this.pageQuery();
        },

        // 重置
        handleReset() {
            this.$refs.searchBoxForm.resetFields();
            this.pageQuery();
        },

        //查看
        handleCheck(rowArr) {
            console.log(rowArr);
            this.detailDialog = true;
        },

        sizeChange(page_size) { //每页条数选项变化
            this.formData.page.page_size = page_size;
            this.pageQuery();
        },

        currentChange(page) { //页数变化
            this.formData.page.page_no = page;
            this.pageQuery();
        },

        detailDialogSure() {

        },

        detailDialogClose() {

        },

        formatting(scope, column){ //格式化
			if(column.value == 'taskType'){
				if(scope.row[column.value] == 1){
					return '铺货(单品链接)';
				}else if(scope.row[column.value] == 2){
					return '铺货(多品链接)';
				}
			}else if(column.value == 'taskStatus'){
				if(scope.row[column.value] == -1){
					return '爬虫执行失败';
				}else if(scope.row[column.value] == -2){
					return '创建商品失败';
				}else if(scope.row[column.value] == 0){
					return '爬虫待执行';
				}else if(scope.row[column.value] == 1){
					return '爬虫执行中';
				}else if(scope.row[column.value] == 2){
					return '爬虫已完成';
				}else if(scope.row[column.value] == 3){
					return '创建商品待执行';
				}else if(scope.row[column.value] == 4){
					return '创建商品已完成';
				}
			}
			return scope.row[column.value]
		},
    },
    watch: {
        detailDialog(val) {
            if (!val){
                this.$refs.detailDialog.resetFields();
                this.resetDetailData();
            }
        },
    }
};
</script>
<style lang='scss' scoped>
    @import "index";
</style>

