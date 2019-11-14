<!-- 模板页面 -->
<template>
    <div class="replace-name">
        <search-box :boxTitle="null" ref="searchBox">
            <!--管理列表查询条件-->
            <!--查询条件下方按钮-->
            <template slot="search-box-btn" slot-scope="scope">
                <button-list
                    :layout="['search']"
                    :customButton="['addCustom']" 
                    :searchLoading="searchLoading"
                    @handleSearch="handleSearch"
                >
                    <!-- 自定义按钮 -->
                    <template slot="addCustom" slot-scope="scope">
                        <el-button size="mini" class="margin-right-10"  type="primary" icon="el-icon-circle-plus-outline" @click="handleSyncCoupon">同步拉取</el-button>
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
			:tableTitle="null"
            :loading.sync="searchLoading"
            :tableFormat="formatting"
        >
            <!-- 操作按钮 -->
            <template slot="operation" slot-scope="scope">
                <button-list
					:customButton="['sync']"
                    buttonSize="mini"
                    :tableData="tableData"
                    :buttonData="[scope.data.row,scope.data.$index]"
                >
					<template slot="sync" slot-scope="scope">
						<el-button size="mini" type="primary" @click="handleSync(scope.buttonData)">同步</el-button>
					</template>
				</button-list>
            </template>

        </table-list>

		<!--同步拉取优惠券-->
		<xm-dialog
			:dialogVisible.sync="detailDialog"
			:dialogTitle="detailDialogTitle"
			@handleSure="detailDialogSure"
			@handleClose="detailDialogClose"
		>
			<el-form :model="detailFormData" ref="detailDialog" label-width="100px" label-position="left" :rules="detailRules">
				<el-form-item label="优惠券id"  prop="ids">
					<el-input v-model="detailFormData.ids"  placeholder="请输入优惠券id, 输入多个id时,请用 ‘,’ 分开"></el-input>
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
import { columns } from "./defaultData";

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
    name: 'coupon',
    data() {
        return {

            // 按钮
            searchLoading: false, //查询loading

            //表格
            columns: columns, //表格列
            tableData: [], //表格数据

            // 详情弹窗
            detailDialog: false,
			detailDialogTitle: '同步优惠券',
            detailFormData: {
				ids : null,
            },
            detailRules: {
				ids: [
                    { required: true, message: '请输入优惠券id', trigger: 'blur' }
                ]
            },
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
            return this.$api.coupon.getAllCoupon().then(res => {
            	if(res.result.status == 1){
					this.tableData = res.data;
				}else {
            		this.$msg(res.result.msg,'error');
				}

            }).finally(() => {
                this.searchLoading = false;
            });
        },

        // 查询按钮
        handleSearch() {
            this.pageQuery();
        },

		handleSyncCoupon() {
			this.detailDialog = true;
		},

		//(单/多个)同步优惠券
		detailDialogSure() {
			if(this.detailFormData.ids){
				let data = this.detailFormData.ids.split(',');
				this.$api.coupon.syncCoupon(data).then(
					res => {
						if(res.result.status == 1){
							this.$msg('同步成功', 'success');
							this.pageQuery();
						}else {
							this.$msg(res.result.msg, 'error');
						}
					}
				)
			}else {
				this.$msg('请输入优惠券id', 'error');
				this.detailDialog = true;
			}

		},

		detailDialogClose() {

		},

		//(单个)同步优惠券
		handleSync(rowArr) {
			console.log(rowArr[0]);
			let data = Object.assign({},rowArr[0]);
			let ids = [];
			ids.push(data.id);

			this.$api.coupon.syncCoupon(ids).then(
				res => {
					if(res.result.status == 1){
						this.$msg('同步成功', 'success');
						this.pageQuery();
					}else {
						this.$msg(res.result.msg, 'error');
					}
				}
			)
		},

        formatting(scope, column){ //格式化
        	if(column.value == 'maxDenominations'){
				if(scope.row[column.value] == 0){
					return '不随机';
				}else {
					return scope.row[column.value] / 100;
				}
			}else if(column.value == 'denominations'){
					return scope.row[column.value] / 100;
			}else if(column.value == 'condition'){
				return scope.row[column.value] / 100;
			}else {
				return scope.row[column.value]
			}
		},
    },
    watch: {
        detailDialog(val) {
            if (!val){
                this.$refs.detailDialog.resetFields();
            }
        },
    }
};
</script>
<style lang='scss' scoped>
    @import "index";
</style>

