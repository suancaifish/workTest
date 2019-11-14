<!-- 模板页面 -->
<template>
    <div class="replace-name">
        <search-box ref="searchBox">
            <!--管理列表查询条件-->
            <template slot="search-box-form">
                <el-form :inline="true" :model="formData" label-width="100px" label-position="left" ref="searchBoxForm">
                    <el-form-item label="渠道" prop="channel" class="el-form-item-normal">
                        <el-input v-model="formData.channel"></el-input>
                    </el-form-item>
                    <el-form-item label="使用条件" class="el-form-item-normal">
                        <select-menu :selectData.sync="formData.condition" :options="conditionOption" placeholder="请选择使用条件"></select-menu>
                    </el-form-item>
                    <el-form-item label="日期" prop="dateTime" class="el-form-item-date">
                        <time-range :dateTime.sync="formData.dateTime" :clearable="true"></time-range>
                    </el-form-item>
                    
                </el-form>
            </template>
            <!--查询条件下方按钮-->
            <template slot="search-box-btn" slot-scope="scope">
                <button-list
                    :layout="['search','reset']"
                    :customButton="['addCustom']" 
                    :searchLoading="searchLoading"
                    @handleReset="handleReset"
                    @handleSearch="handleSearch"
                >
                    <!-- 自定义按钮 -->
                    <template slot="addCustom" slot-scope="scope">
                        <el-button size="mini" class="margin-right-10"  type="primary" icon="el-icon-circle-plus-outline">自定义</el-button>
                    </template>
                </button-list>
            </template>
        </search-box>

        <!-- 表格 -->
        <table-list
            class="table-list"
            ref="tableList"
            :operation="tableData.length ? true : false"
            :operationWidth="'100'"
            :tableData="tableData"
            :columns="columns"
            :tableTitle="tableTitle"
            :loading.sync="searchLoading"
            :tableFormat="formatting"
        >
            <!-- 操作按钮 -->
            <template slot="operation" slot-scope="scope">
                <button-list
                    :layout="['check']"
                    buttonSize="mini"
                    :tableData="tableData"
                    :buttonData="[scope.data.row,scope.data.$index]"
                    @handleCheck="handleCheck"
                ></button-list>
            </template>

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

        <!--查看详情-->
        <xm-dialog
            :dialogVisible.sync="detailDialog"
            :dialogTitle="detailDialogTitle"
            @handleSure="detailDialogSure"
            @handleClose="detailDialogClose"
        >
            <el-form :model="detailFormData" ref="detailDialog" label-width="100px" label-position="left" :rules="detailRules">
                <el-form-item label="审核结果" prop="process">
                    <select-menu :selectData.sync="detailFormData.process" :options="resultOption"></select-menu>
                </el-form-item>
                <el-form-item label="处理结果" prop="processDetail">
                    <el-input v-model="detailFormData.processDetail" placeholder="请输入处理原因"></el-input>
                </el-form-item>  
                <el-form-item label="补助金额"  prop="processMoney">
                    <el-input v-model="detailFormData.processMoney" type="number" placeholder="请输入补助金额"></el-input>
                </el-form-item>  
            </el-form>
        </xm-dialog>
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
    name: 'replace-upper-name',
    data() {
        return {
            //查询数据
            formData: {
                channel: '',
                dateTime: [],
                multiple: [],
                condition: '',
                page: {
                    page_no: 1,
                    page_size: 50
                },
                pageTotal: 0,
            },
            conditionOption: [{label: '使用条件1',value: 1},{label: '使用条件2',value: 2}],
            multipleOption: [{label: '使用条件1',value: 1},{label: '使用条件2',value: 2},{label: '使用条件3',value: 3}],

            // 按钮
            searchLoading: false, //查询loading

            //表格
            columns: columns, //表格列
            tableTitle: "表格",
            tableData: [], //表格数据

            // 详情弹窗
            detailDialogTitle: '查看详情',
            detailDialog: false, 
            detailFormData: {
                process: 0,
                processDetail: null,
                processMoney:  null
            },
            resultOption: resultOption,
            detailRules: {
                process: [
                    { required: true, message: '请选择审核结果', trigger: 'blur' }
                ],
                processDetail: [
                    { required: true, message: '请输入处理原因', trigger: 'blur' }
                ],
                processMoney:  [
                    { required: true, message: '请输入补助金额', trigger: 'blur' }
                ]
            },
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.pageQuery();
        },

        // 查询数据
        pageQuery() {
            // this.searchLoading = true;
            // let data = this.$util.CommonUtils.formatParams(this.formData);
            // return this.$api.envelope.page_query(data).then(res => {
            //     this.tableData = res.data.total_datas;
            //     this.formData.pageTotal = res.data.total_count;
            // }).finally(() => {
            //     this.searchLoading = false;
            // });
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

        resetDetailData() {
            this.detailFormData = {
                process: 0,
                processDetail: null,
                processMoney:  null
            }
        },
        
        formatting(scope, column){ //格式化
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

