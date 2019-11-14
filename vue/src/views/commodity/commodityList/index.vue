<!-- 模板页面 -->
<template>
    <div class="commodity-wrap">
        <div class="commodity-list" v-show="!detailShow">
            <search-box ref="searchBox" :headerSlot="true">
                <template slot="search-box-header">
                    <el-tabs v-model="formData.statuses" type="card" @tab-click="handleCard">
                        <el-tab-pane label="已上架" name="0" :disabled="isLoading"></el-tab-pane>
                        <el-tab-pane label="待上架" name="2" :disabled="isLoading"></el-tab-pane>
                    </el-tabs>
                </template>
                <!--管理列表查询条件-->
                <template slot="search-box-form">
                    <el-form :inline="true" class="commodity-form" :model="formData" label-width="100px" label-position="left" ref="searchBoxForm">
                        <el-form-item label="商品ID" prop="sourceId" class="el-form-item-normal">
                            <el-input v-model="formData.sourceId"></el-input>
                        </el-form-item>
                        <el-form-item label="30天销量" class="el-form-item-normal">
                            <range-input :start.sync="formData.minSellAmount" :end.sync="formData.maxSellAmount"></range-input>
                        </el-form-item>
                        <el-form-item label="销售价" class="el-form-item-normal">
                            <range-input :start.sync="formData.minSourcePrice" :end.sync="formData.maxSourcePrice"></range-input>
                        </el-form-item>
                        <el-form-item label="商品名称" prop="sourceName" class="el-form-item-normal">
                            <el-input v-model="formData.sourceName"></el-input>
                        </el-form-item>
                        <el-form-item label="商品类目" class="el-form-item-normal" prop="category">
                            <el-cascader  v-model="formData.category" :props="cascaderProps" separator="-" clearable></el-cascader>
                        </el-form-item>
                        <el-form-item label="备注" prop="remark" class="el-form-item-normal">
							<el-input v-model="formData.remark"></el-input>
						</el-form-item>
                        <el-form-item :label="formData.statuses == 2 ? '创建时间' : '上架时间'" prop="dateTime" class="el-form-item-date">
                            <time-range :dateTime.sync="formData.dateTime" :clearable="true"></time-range>
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
                :showOverflowTooltip="false"
                :tableTitleShow="false"
                :selectionColumn="true"
                :operation="tableData.length ? true : false"
                :operationWidth="'100'"
                :tableData="tableData"
                :columns="columns"
                :loading.sync="searchLoading"
                :tableFormat="formatting"
                @selectionChange="selectionChange"
            >
                <!-- 头部 -->
                <template slot="titleHeader">
                    <button-list :customButton="['release','delivery', 'status', 'delete']">
                        <!-- 自定义按钮 -->
                        <template slot="release">
                            <el-button size="mini" class="margin-right-10"  type="primary" @click="handelRelease">发布商品</el-button>
                        </template>
						<template slot="delivery">
							<el-button size="mini" class="margin-right-10"  type="primary" @click="batchDelivery">批量铺货</el-button>
						</template>
                        <!-- 自定义按钮 -->
                        <template slot="status">
                            <el-button size="mini" class="margin-right-10"  :loading="statusLoading" plain @click="handelStatus">{{formData.statuses == '0' ? '下架' : '上架'}}</el-button>
                        </template>
                        <!-- 自定义按钮 -->
                        <template slot="delete">
                            <el-button size="mini" class="margin-right-10"  :loading="deleteLoading" plain @click="handelDelete" v-show="formData.statuses == '2'" >删除</el-button>
                        </template>
                    </button-list>
                </template>

                <!-- 自定义渲染实例-->
                <template slot="sourceImg" slot-scope="scope">
                    <div v-if="scope.data.row['sourceImg'].length > 0" class="flex-center table-img" @click="goDetail(scope.data.row['storeSourceId'])">
                        <img :src="scope.data.row['sourceImg'][0]" alt="">
                    </div>
                    <div v-else>未上传图片</div>
                </template>

                <!-- 操作按钮 -->
                <template slot="operation" slot-scope="scope">
                    <button-list
                        :layout="['edit']"
                        buttonSize="mini"
                        editText="编辑"
                        :tableData="tableData"
                        :buttonData="[scope.data.row,scope.data.$index]"
                        @handleEdit="handleEdit"
                    ></button-list>
                </template>

                <!-- 分页 -->
                <template slot="footer">
                    <pagination 
                        class="pagination" 
                        :loading="paginationLoading"
                        :currentPage="formData.pageNum" 
                        :total="formData.pageTotal"
                        @currentChange="currentChange" 
                        @sizeChange="sizeChange"
                    ></pagination>
                </template>
            </table-list>

			<!--批量铺货弹窗-->
			<xm-dialog
				:sureClose="false"
				sureText="确定"
				:dialogVisible.sync="dialogVisibleEdit"
				:dialogTitle="editDialogTitle"
				@handleSure="editSure"
				@handleClose="handleFormClose"
			>
				<el-form :model="deliveryFormData" ref="editDialog" label-width="18%" label-position="left"  :rules="deliveryRules">
					<el-form-item label="类型" prop="linkType" ref="type">
						<el-select v-model="deliveryFormData.linkType" @change="changeType()">
							<el-option :value=1 label="单品链接"></el-option>
							<el-option :value=2 label="多品链接"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item label="链接" prop="goodsLinks" >
						<div v-for="index in this.addNumber" >
							<div class="flex-start good-list">
								<el-input v-model="deliveryFormData.goodsLinks[index-1]"></el-input>
								<div class="setting-shop-btn flex-center">
									<div class="setting-shop-add" title="增加" @click="addLink(index)" ><i class="el-icon-plus"></i></div>
									<div class="setting-shop-delete"  @click="deleteLink(index)" v-if="index !== 1" title="删除"><i class="el-icon-delete"></i></div>
								</div>
							</div>
						</div>
					</el-form-item>

					<el-form-item label="备注" prop="remark" >
						<el-input v-model="deliveryFormData.remark" type="textarea" ></el-input>
					</el-form-item>
				</el-form>
			</xm-dialog>

        </div>

        <commodity-edit v-if="detailShow" @loadData="initSearch" @close="close"></commodity-edit>
    </div>
    
</template>

<script>
import SearchBox from "_c/SearchBox";
import TableList from "_c/TableList";
import Pagination from "_c/Pagination";
import ButtonList from '_c/ButtonList';
import RangeInput from '_c/RangeInput';
import TimeRange from "_c/TimeRange";
import SelectMenu from "_c/SelectMenu";
import XmDialog from "_c/XmDialog";
import { mapActions } from 'vuex';
import commodityEdit from '@/views/commodity/commodityEdit';
import multiCascader from "_c/MultiCascader";
import { columns, createTimeColumn, issueTimeColumn, modalData} from "./defaultData";

export default {
    components: {
        SearchBox,
        TableList,
        ButtonList,
        RangeInput,
        Pagination,
        TimeRange,
        SelectMenu,
        XmDialog,
        commodityEdit,
        multiCascader
    },

    name: 'CommodityList',

    data() {
        const _self = this;
        return {
            props: { multiple: true },
            
            lastStatuses: '',
            cascaderProps: {
                lazy: true,
                lazyLoad (node, resolve) {
                    _self.getCategory(node,resolve);
                }
            },
            //查询数据
            formData: {
                category: [],
                statuses: '0',
                sourceId: '', // 商品ID
                sourceName: '', //商品名称
                minSellAmount: '',
                maxSellAmount: '',
                minSourcePrice: '',
                maxSourcePrice: '',
				remark: '',
                dateTime: [
					new Date(this.$util.CommonUtils.getTime(-5) + " 00:00:00"),
					new Date()
				],
                pageNum: 1,
                pageSize: 50,
                pageTotal: 0
            },

            // 多选级联
            cascader:{
                configOptions: modalData,
            },

            // 按钮
            searchLoading: false, //查询loading
            paginationLoading: false, //分页loading
            statusLoading: false,
            deleteLoading: false,
			dialogVisibleEdit: false, //修改按钮
			editDialogTitle: "批量铺货",
			addNumber: 1,

			deliveryFormData:{
				linkType: 1,
				goodsLinks: [],
				remark: ''
			},
			//表格
            columns: [...columns], //表格列
			tableData: [], //表格数据

            selectionArr: [],
			detailShow: false,
            sourceId: '',

			deliveryRules: {
				goodsLinks: [
					{ required: true, validator: this.validateGoodsLink, trigger: 'blur' }
				]
			},
        };
    },

    computed: {
        isLoading() {
            return this.searchLoading || this.paginationLoading || this.statusLoading || this.deleteLoading;
        }
    },

    activated() {

    },

    mounted() {
        this.init();
    },
    methods: {
        ...mapActions([
            'setSourceId',
            'setUpDateSourceId'
        ]),

        init() {
            this.changeColumn();
            this.pageQuery();
            // this.listAllCategoryOf();
            // this.listRootCategory();
            // this.listSubCategory();

        },

        close() {
            this.detailShow = false;
        },

        initSearch() {
            this.detailShow = false;
            this.pageQuery();
            window.bus.$emit("backToZero");
        },

		validateGoodsLink(rule, value, callback) {
			let arr=value.slice().sort();
			let judgeBol = true;
			for(let i=0;i<arr.length;i++){
				if(arr[i]==arr[i+1] ){
					judgeBol = false;
					break;
				}
			}

			if(judgeBol) {
				callback();
			}else{
				callback(new Error('输入链接有重复,请重新输入'));
			}

		},

        resetFormData() {
            this.formData = {
                category: [],
                sourceId: '', // 商品ID
                sourceName: '', //商品名称
                minSellAmount: '',
                maxSellAmount: '',
                minSourcePrice: '',
                maxSourcePrice: '',
                dateTime: [],
                pageNum: 1,
                pageSize: 50,
                pageTotal: 0
            }
        },

        // 获取类目
        getCategory(node, resolve) {
            const { level } = node;
            switch(level) {
                case 0:
                    return this.$api.commodityList.listRootCategory().then((res) => {
                        let data = res.data;
                        const nodes = data.map(item => ({
                            value: item.id,
                            label: item.name,
                            leaf: item.leaf
                        }));
                        resolve(nodes);
                    })
                default:
                    return this.$api.commodityList.listSubCategory({id: node.data.value}).then((res) => {
                        let data = res.data;
                        const nodes = data.map(item => ({
                            value: item.id,
                            label: item.name,
                            leaf: item.leaf
                        }));
                        resolve(nodes);
                    })
            }
        },

        // 获取所有类目
        listAllCategoryOf() {
            return this.$api.commodityList.listAllCategoryOf({depth: 1}).then((res) => {
                console.log(res);
            })
        },
        
        // 获取根类目
        listRootCategory() {
            return this.$api.commodityList.listRootCategory({id: 1}).then((res) => {
                console.log(res);
            })
        },

        // 获取三级类目
        listSubCategory() {
            return this.$api.commodityList.listSubCategory({id: 1}).then((res) => {
                console.log(res);
            })
        },

        commonParam() {
            let sTime = '';
			let eTime = '';
			if(this.formData.statuses == '0'){ //已上架
				sTime = 'startIssueTime';
				eTime = 'endIssueTime';
			}else if(this.formData.statuses == '2'){//待上架
				sTime = 'startCreateTime';
				eTime = 'endCreateTime';
            }

            let param = this.$util.CommonUtils.formatParams(this.formData, sTime, eTime);
            let category = param.category;
            if(category[0]) param.primaryCategoryId = category[0];
            if(category[1]) param.secondaryCategoryId = category[1];
            if(category[2]) param.thirdlyCategoryId = category[2];
            return param;
        },

        // 获取商品总数
        countSource() {
			let param = this.commonParam();
            if(this.checkQueryDate(param)){
				this.paginationLoading = true;
				let data = {
					param,
					sourceType: 5
				}
				if(param.statuses == 0) {
					param.statuses = [0]
				}else {
					param.statuses = [1,2]
				}
				return this.$api.commodityList.countSource(data).then(res => {
					this.formData.pageTotal = res.data && res.data.data || 0;
				}).finally(() => {
					this.paginationLoading = false;
				});
			}else{
				this.paginationLoading = false;
				return ;
			}
        },

        // 获取商品列表
        listSource() {
			let param = this.commonParam();

            if(this.checkQueryDate(param)){
				this.searchLoading = true;
				if(param.statuses == 0) {
					param.statuses = [0]
				}else {
					param.statuses = [1,2]
				}
				let data = {
					param,
					sourceType: 5
				}
				return this.$api.commodityList.listSource(data).then(res => {
					let tableData = res.data && res.data.data || [] ;
					tableData.forEach((item => {
						item.sourceImg = item.sourceImg ? item.sourceImg.split(',') : [];
					}))
					this.tableData = tableData;
				}).finally(() => {
					this.searchLoading = false;
				});
			}else{
				this.searchLoading = false;
				return ;
			}
        },

        // 查询数据
        pageQuery() {
            this.countSource();
            this.listSource();
        },

		checkQueryDate(param){
			let sTime = '';
			let eTime = '';
			if(this.formData.statuses == '0'){ //已上架
				sTime = 'startIssueTime';
				eTime = 'endIssueTime';
			}else if(this.formData.statuses == '2'){//待上架
				sTime = 'startCreateTime';
				eTime = 'endCreateTime';
			}

			if(!param.sourceId
				&& !param.sourceName
				&& !param.remark
				&& !param.minSourcePrice
				&& !param.maxSourcePrice
				&& !param.minSellAmount
				&& !this.formData.dateTime
			){
				this.$msg('请选择查询日期', 'error');
				return false;
			}

            if(!this.formData.dateTime || this.formData.dateTime.length == 0) return true;

			let sdate = this.formData.dateTime[0];
			let edate = this.formData.dateTime[1];

			let stime = new Date(sdate).getTime() / (3600 * 1000 * 24);
			let etime = new Date(edate).getTime() / (3600 * 1000 * 24);
			if(Math.round(etime-stime-1) > 31){
				//this.formData.dateTime = [new Date(this.$util.CommonUtils.getTime(-5) + " 00:00:00"), new Date()];
				this.$msg('查询日期间隔不能超过31天', 'error');
				return false;
			}

			return true;
		},

        changeColumn(statuses) {
            if(statuses == 2) {
                this.columns = [...columns, createTimeColumn];
            }else{
                this.columns = [...columns, issueTimeColumn];
            }
            this.$nextTick().then(() => {
                this.$refs.tableList.init();
            })
        },

        handleCard(tab, event) {
            let statuses = tab._props.name;
            if(this.lastStatuses == statuses) return;
            this.lastStatuses = statuses;
            this.changeColumn(statuses);
            this.$refs.tableList.clearSelection();
			this.formData.dateTime = [new Date(this.$util.CommonUtils.getTime(-5) + " 00:00:00"), new Date()];
            this.pageQuery();
        },

        // 查询按钮
        handleSearch() {
            this.formData.pageNum = 1;
            this.formData.pageSize = 50;
            this.pageQuery();
        },

        // 重置
        handleReset() {
            this.$refs.searchBoxForm.resetFields();
            this.resetFormData();
            this.pageQuery();
        },

        // 选项变化
        selectionChange(arr) {
            this.selectionArr = arr;
        },

        // 发布
        handelRelease() {
            this.goCommodityEdit();
        },

		// 批量铺货
		batchDelivery(){
			this.dialogVisibleEdit = true
		},

		changeType(){
        	this.addNumber = 1;
			this.deliveryFormData.goodsLinks = [];
		},

        goDetail(storeId) {
            window.open(` https://detail.1688.com/offer/${storeId}.html`);
        },

         //级联多选
        getSelected(arr) {
            console.log(arr);
        },

		addLink(index){
        	if(index < this.addNumber){
        		return ;
			}
			if (this.deliveryFormData.linkType == 1){
				if(this.addNumber < 10){
					this.addNumber = index+1;
				}
				return ;
			} else if(this.deliveryFormData.linkType == 2){
				if(this.addNumber < 5){
					this.addNumber = index+1;
				}
				return ;
			}
        	if(index > this.deliveryFormData.goodsLinks.length) return;

			this.deliveryFormData.goodsLinks.splice(index + 1, 0,this.deliveryFormData.goodsLinks.length[index]);
		},
		deleteLink(index) {
			if(index < this.addNumber){
				return ;
			}
			if (this.deliveryFormData.linkType == 1){
				if(this.addNumber > 1){
					this.addNumber = index-1;
				}
			} else if(this.deliveryFormData.linkType == 2){
				if(this.addNumber > 1){
					this.addNumber = index-1;
				}
			}
			this.deliveryFormData.goodsLinks.splice(index-1, 1);
		},

		// 批量铺货确定按钮
		editSure(){
			this.$refs.editDialog.validate((valid) =>{
				console.log(valid)
				if(valid) {
					let data = this.deliveryFormData;
					return this.$api.batchTask.sendLink(data).then(res => {
						this.dialogVisibleEdit = false;
					})
				}else{
					return this.$msg('输入链接有重复,请重新输入', 'error');
				}
			})
			console.log('this.deliveryFormData' + JSON.stringify(this.deliveryFormData));
		},

		// 弹出框关闭
		handleFormClose() {
			this.deliveryFormData = {
				linkType: 1,
				goodsLinks: [],
				remark: ''
			};
			this.dialogVisibleEdit = false;
			this.addNumber = 1;
		},

        // 下架商品
        shutDownSource(sourceIdArr) {
            this.statusLoading = true;
            return this.$api.commodityList.shutDownSource({sourceId: sourceIdArr}).then(res => {
                this.pageQuery();
            }).finally(() => {
                this.statusLoading = false;
            });
        },

        // 上架商品
        issueSource(sourceIdArr) {
            this.statusLoading = true;
            return this.$api.commodityList.issueSource({sourceId: sourceIdArr}).then(res => {
                this.pageQuery();
            }).finally(() => {
                this.statusLoading = false;
            });
        },

        //删除商品
        deleteSource(sourceIdArr) {
            this.deleteLoading = true;
            return this.$api.commodityList.deleteSource({sourceId: sourceIdArr}).then(res => {
                this.pageQuery();
            }).finally(() => {
                this.deleteLoading = false;
            });
        },

        // 上下架
        handelStatus() {
            if(this.selectionArr.length == 0) {
                return this.$msg("请选择商品");
            }
            let sourceIdArr = [];
            this.selectionArr.forEach(item => {
                sourceIdArr.push(item.sourceId)
            })
            if(this.formData.statuses == '2') {
                this.issueSource(sourceIdArr);
            }else{
                let conStr = `是否确认下架选中的${this.selectionArr.length}个商品`;
                this.$confirm(conStr, "提示", {
                    confirmButtonText: "下架",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.shutDownSource(sourceIdArr);
                }).catch(err => {
                    console.log(err);
                });
            }
        },

        // 去往商品编辑页
        goCommodityEdit(sourceId = '') {
            this.detailShow = true;
            this.sourceId = sourceId;
            this.setSourceId(sourceId);
            this.setUpDateSourceId(true);
        },

        // 删除
        handelDelete() {
            if(this.selectionArr.length == 0) {
                return this.$msg("请选择商品");
            }
            let conStr = `是否确认删除选中的${this.selectionArr.length}个商品`;
            let sourceIdArr = [];
            this.selectionArr.forEach(item => {
                sourceIdArr.push(item.sourceId)
            })
            this.$confirm(conStr, "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "error"
            }).then(() => {
                this.deleteSource(sourceIdArr);
            }).catch(err => {
                console.log(err);
            });
        },

        // 编辑
        handleEdit(rowArr) {
            this.goCommodityEdit(rowArr[0].sourceId);
        },

        sizeChange(page_size) { //每页条数选项变化
            this.formData.pageSize = pageSize;
            this.pageQuery();
        },

        currentChange(page) { //页数变化
            this.formData.pageNum = page;
            this.pageQuery();
        },

        formatting(scope, column){ //格式化
			return scope.row[column.value]
		},

		resetDeliveryFormData() {
			this.deliveryFormData = {
				linkType: 1,
				goodsLinks: [],
				remark: ''
			}
		},

    },
    watch: {
		detailDialog(val) {
			if (!val){
				this.$refs.detailDialog.resetFields();
				this.resetDeliveryFormData();
			}
		},
    }
};
</script>
<style lang='scss' scoped>
    @import "index";
</style>

<style lang='scss'>
.commodity-form {
   
}
</style>


