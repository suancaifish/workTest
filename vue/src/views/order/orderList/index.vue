<!-- 模板页面 -->
<template>
    <div class="order-wrap">
        <div class="orderList" v-show="!detailShow" v-loading="globleLoading">
            <search-box ref="searchBox">
                <!--管理列表查询条件-->
                <template slot="search-box-form">
                    <el-form :inline="true" :model="formData" class="orderList-form" label-width="100px" label-position="left" ref="searchBoxForm">
                        <el-form-item label="订单号" prop="orderId" class="el-form-item-normal">
                            <el-input v-model="formData.orderId"></el-input>
                        </el-form-item>
                        <el-form-item label="包裹号" prop="cargoMallOrderId" class="el-form-item-normal">
                            <el-input v-model="formData.cargoMallOrderId"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号" prop="phone" class="el-form-item-normal">
                            <el-input v-model="formData.phone" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="订单状态" prop="orderStatus" class="el-form-item-normal">
                            <select-menu :selectData.sync="formData.orderStatus" :options="orderStatusOption" clearable placeholder="请选择订单状态"></select-menu>
                        </el-form-item>
                        <el-form-item label="订单类型" prop="orderType" class="el-form-item-normal">
                            <select-menu :selectData.sync="formData.orderType" :options="orderTypeOption" clearable placeholder="请选择订单类型"></select-menu>
                        </el-form-item>
						<el-form-item label="退款状态" prop="refundStatus" class="el-form-item-normal">
                            <select-menu :selectData.sync="formData.refundStatus" :options="refundStatus" clearable placeholder="请选择退款状态"></select-menu>
                        </el-form-item>
						<el-form-item label="商品ID" prop="sourceId" class="el-form-item-normal">
							<el-input v-model="formData.sourceId"></el-input>
						</el-form-item>
						<el-form-item label="商品名称" prop="sourceName" class="el-form-item-normal">
							<el-input v-model="formData.sourceName"></el-input>
						</el-form-item>
						<el-form-item label="1688账号" prop="cargoAccount" class="el-form-item-normal">
							<select-menu :selectData.sync="formData.cargoAccount" :options="cargoAccountOption" clearable placeholder="请选择1688账号"></select-menu>
						</el-form-item>
						<el-form-item label="产品id" prop="storeSourceId" class="el-form-item-normal">
							<el-input v-model="formData.storeSourceId"></el-input>
						</el-form-item>
						<el-form-item label="提醒发货" prop="remindStatus" class="el-form-item-normal">
							<select-menu :selectData.sync="formData.remindStatus" :options="remindStatusOption" clearable placeholder="请选择订单类型"></select-menu>
						</el-form-item>
                        <el-form-item label="下单时间" prop="dateTime" class="el-form-item-date">
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
            <table-card
                class="table-list"
                ref="tableList"
                :operation="tableData.length ? true : false"
                :operationWidth="operationWidth"
                :tableData="tableData"
                :columns="columns"
                :loading.sync="searchLoading"
                :selection="selection"
                @selectionChange="selectionChange"
                keyId="orderId"
            >
                <!-- 头部 -->
                <template slot="titleHeader">
                    <button-list :customButton="['export', 'import', 'refund', 'reject', 'getOrder', 'order']">
                        <template slot="export">
                            <el-button size="mini" class="margin-right-10" plain @click="handelExport" :loading="exportLoading">按搜索结果导出</el-button>
                        </template>
                        <!--<template slot="import">
                            <el-button size="mini" class="margin-right-10"  plain @click="handelImport">批量发货</el-button>
                        </template>-->
						<template slot="refund">
                            <el-button size="mini" class="margin-right-10"  plain @click="handelImport('refund')">批量退款</el-button>
                        </template>
						<template slot="reject">
							<el-button size="mini" class="margin-right-10"  plain @click="handelImport('reject')">批量拒绝退款</el-button>
						</template>

                        <template slot="getOrder">
                            <el-button size="mini" class="margin-right-10" plain @click="handleGetOrder">实时同步有赞订单信息</el-button>
                        </template>
                        <template slot="order" v-if="batchOrderShow && tableData.length > 0">
                            <el-button size="mini" class="margin-right-10" plain @click="handelBatchOrder">批量订货</el-button>
                        </template>
                    </button-list>
                </template>

                <!-- 右上角 -->

                <template slot="header">
                    <div class="choose-title flex-start" v-show="selectionList.length > 0">
                        <div><i class="el-icon-info"></i></div>
                        <p>已选择<span> {{selectionList.length}} </span>项</p>
                        <el-button size="mini" class="margin-right-10" type="primary" @click="handelChooseSure">确定</el-button>
                        <el-button size="mini" plain @click="handelChooseCancel">取消</el-button>
                    </div>
                </template>

                <!-- 标题 -->
                <template slot="listTitle" slot-scope="scope">
                    <el-row class="table-list-title"  type="flex" justify="space-between">
                        <el-col :span="24 - operationWidth">
                            <div class="flex-start table-list-title-txt">
                                <p>订单号：{{formatData(scope.data.data, "orderId")}}</p>
                                <p>下单时间：{{formatData(scope.data.data, "orderTime")}}</p>
                                <p>店铺：{{formatData(scope.data.data, "storeName")}}</p>
                                <p>包裹号：{{formatData(scope.data.data, "cargoMallOrderId")}}</p>
                            </div>
                        </el-col>
                        <el-col :span="operationWidth"><div class="table-list-title-opera"><a @click="checkDetail(scope.data.data)">查看详情</a><span v-if="scope.data.data.failDesc"> - </span><a v-if="scope.data.data.failDesc" @click="getMark(scope.data.data)">备注</a></div></el-col>
                    </el-row>
                </template>

                <!-- 内容 -->
                <template slot="listContent" slot-scope="scope">
                    <el-row class="table-list-content" type="flex" justify="start" align="center">
                        <el-col v-for="(item,index) in columns" :key="index" :span="item.width" :class="index == 0 ? 'flex-start' : 'flex-column'">
                            <div v-if="index == 0" class="flex-start table-list-content-img">
                                <img :src="scope.data.data.sourceImg" @click="goDetail(scope.data.data.storeSourceId)" alt="">
                                <div>
                                    <p class="margin-bottom">{{formatValue(scope.data.data.sourceName)}}</p>
                                    <p>{{formatValue(scope.data.data.sourceId)}}</p>
                                </div>
                            </div>

                            <div v-else-if="index == 1">
                                <p class="margin-bottom txt-center order-num"><span v-if="scope.data.data.combinationNum && scope.data.data.combinationNum > 1 && scope.data.data.storeSkuId">{{ scope.data.data.combinationNum + 'x '}}</span>{{formatValue(scope.data.data.storeSkuId)}}</p>
                                <p class="txt-center">{{formatSku(scope.data.data["skuProperties"])}}</p>
                            </div>

                            <div v-else-if="index == 2">
                                <p class="margin-bottom txt-center">{{formatValue(scope.data.data.sourcePrice)}}</p>
                                <p class="txt-center">{{formatValue(scope.data.data.sourceNum)}}</p>
                            </div>

                            <div v-else-if="index == 3">
                                <p class="margin-bottom txt-center">{{formatValue(scope.data.data.address.receiverName)}}</p>
                                <p class="txt-center">{{formatValue(scope.data.data.address.receiverTel)}}</p>
                            </div>

                            <div v-else-if="index == 4">
                                <p class="txt-center">{{formatValue(scope.data.data.sourcePayPrice)}}</p>
                            </div>

                            <div v-else-if="index == 5">
                                <p class="txt-center">{{formatSpcData(scope.data.data, 'orderType')}}</p>
                            </div>

                            <div v-else-if="index == 6">
                                <p class="txt-center">{{formatSpcData(scope.data.data, 'orderStatus')}} <i v-if="scope.data.data.remindStatus" class="el-icon-bell" style="color:red"></i></p>
                            </div>
							<div v-else-if="index == 7">
                                <p class="txt-center">{{formatValue(scope.data.data.cargoAccount)}}</p>
                            </div>
                        </el-col>
                        <el-col :span="operationWidth" class="flex-column table-list-content-btn">
							<div v-if="renderButton(scope.data.data.orderStatus)">
								<el-button size="mini" plain @click="handleOrder(scope.data.data)">{{formOrderBtn(scope.data.data.orderStatus)}}</el-button>
							</div>
                            <div v-else>-</div>
                        </el-col>
                    </el-row>
                </template>

                 <!-- 底部 -->
                <template slot="listFooter" slot-scope="scope">
					<div v-if="scope.data.data.refundDtoList">
						<div class="table-list-footer flex-between" v-for="item in scope.data.data.refundDtoList">
							<div class="flex-start">
								<p>退款状态： <span>{{formatRefundStatus(item.status)}}</span></p>
								<p v-if="item.status == 1">退款原因： <span>{{item.reason}}</span></p>
								<p v-if="item.status == 1">退款金额： <span>{{item.amount}}</span></p>
								<p v-if="item.status == 1">退款时间： <span>{{item.applyTime}}</span></p>
							</div>
							<div v-if="item.status == 1">
								<el-button size="mini" plain @click="handleRefunnd(scope.data.data.orderId,item)">立即退款</el-button>
								<el-button size="mini" type="danger" @click="handleRejectRefunnd(scope.data.data.orderId,item)">拒绝退款</el-button>
							</div>
							<div v-else class="detail-btn flex-center">
								<el-button size="mini" plain @click="handleRefunndDetail(scope.data.data.orderId,item)">查看售后详情</el-button>
							</div>
						</div>
					</div>

                    <div class="table-list-footer flex-start" v-if="scope.data.data.failDesc">
                        <p>订单备注：</p>
                        <el-tooltip effect="dark" :content="scope.data.data.failDesc" placement="top">
                            <p class="table-list-footer-text beyond-ellipsis">{{scope.data.data.failDesc}}</p>
                        </el-tooltip>
                    </div>
                </template>

                <!-- 操作按钮 -->
                <template slot="operation" slot-scope="scope">
                    <button-list
                        :layout="['check']"
                        buttonSize="mini"
                        :tableData="tableData"
                        :buttonData="scope.data.data"
                        @handleCheck="handleCheck"
                    ></button-list>
                </template>

                <!-- 分页 -->
                <template slot="footer">
                    <pagination
                        class="pagination"
                        :pageSizes="[50, 100, 200, 300, 500]"
                        :currentPage="formData.pageNum"
                        :total="formData.pageTotal"
                        @currentChange="currentChange"
                        @sizeChange="sizeChange"
                    ></pagination>
                </template>
            </table-card>

            <!--发货信息-->
            <xm-dialog
                :dialogVisible.sync="shipmentsDialog"
                :dialogTitle="shipmentsDialogTitle"
                :sureClose="false"
                :loading="shipmentsLoading"
                @handleSure="shipmentsDialogSure"
                @handleClose="shipmentsDialogClose"
            >
                <el-form :model="shipmentsFormData" ref="shipmentsDialog" label-width="100px" label-position="left" :rules="shipmentsRules">
                    <el-form-item label="物流公司" prop="company">
                        <select-menu :selectData.sync="shipmentsFormData.company" :options="resultOption"></select-menu>
                    </el-form-item>
                    <el-form-item label="物流单号" prop="orderId">
                        <el-input v-model="shipmentsFormData.orderId" placeholder="请输入物流单号"></el-input>
                    </el-form-item>
                </el-form>
            </xm-dialog>

            <!-- 批量发货 -->
            <upload-model
                ref="uploadFile"
                :uploadUrl="uploadUrl"
                :uploadDemo="uploadDemo"
                :demoName="xlsName"
                :dialogTitle="uploadTitle"
				:handleSuccessFn="handleSuccessFn"
            >
            </upload-model>

            <!-- 获取订单 -->
            <xm-dialog
                :dialogVisible.sync="getOrderObj.show"
                :dialogTitle="getOrderObj.title"
                :sureClose="false"
                :loading="getOrderObj.loading"
                @handleSure="getOrderDialogSure"
                @handleClose="getOrderDialogClose"
            >
                <el-form :model="getOrderData" ref="getOrderDialog" label-position="left" :rules="getOrderRules">
                    <el-form-item prop="orderId">
                        <el-input v-model="getOrderData.orderId" placeholder="请输入订单号"></el-input>
                    </el-form-item>
                </el-form>
				<span style="color: #267AFA">补充同步漏单和更新已存在订单状态</span>
            </xm-dialog>

            <!-- 备注 -->
            <xm-dialog
                :dialogVisible.sync="markObj.show"
                :dialogTitle="markObj.title"
                :sureClose="false"
                :loading="markObj.loading"
                @handleSure="markObjDialogSure"
                @handleClose="markObjDialogClose"
            >
                <el-input v-model="markObjData.failDesc" disabled type="textarea" show-word-limit :rows="5" placeholder="最多可输入250字" :maxlength="250"></el-input>
            </xm-dialog>

			<!-- 退款 -->
            <xm-dialog
                :dialogVisible.sync="refundObj.show"
                :dialogTitle="refundObj.title"
                :sureClose="false"
				:showClose="refundObj.type == 3 ? false : true"
                :loading="refundObj.loading"
                @handleSure="refundObjDialogSure"
                @handleClose="refundObjDialogClose"
            >
                <el-form :model="refundData" ref="refundDialog" label-position="left" label-width="160px" :rules="refundRules">
                    <el-form-item prop="commitRefundAmount" label="申请退款金额" v-if="refundData.refundStatus == 1 && refundObj.type == 1">
						<el-input v-model="refundData.commitRefundAmount" type="number"></el-input>
                    </el-form-item>
					<el-form-item prop="desc" label="退款描述" v-if="refundData.refundStatus == 1">
						<el-input v-model="refundData.desc"></el-input>
                    </el-form-item>
					<el-form-item prop="refundId" label="退款申请单号">
						<el-input v-model="refundData.refundId" disabled></el-input>
                    </el-form-item>
					<el-form-item prop="refundStatus" label="商品/订单退款申请状态">
						<select-menu :selectData.sync="refundData.refundStatus" disabled :options="refundStatus"></select-menu>
                    </el-form-item>
					<el-form-item prop="refundAmount" label="申请退款金额" v-if="refundData.refundStatus != 1">
						<el-input v-model="refundData.refundAmount" disabled></el-input>
                    </el-form-item>
					<el-form-item prop="refundActualAmount" label="实际退款金额" v-if="refundData.refundStatus != 1">
						<el-input v-model="refundData.refundActualAmount" disabled></el-input>
                    </el-form-item>
					<el-form-item prop="refundReason" label="退款原因">
						<el-input v-model="refundData.refundReason" disabled></el-input>
                    </el-form-item>
					<el-form-item prop="refundNote" label="备注" v-if="refundData.refundNote">
						<el-input v-model="refundData.refundNote" disabled></el-input>
                    </el-form-item>
					<el-form-item prop="refundApplyTime" label="申请退款时间">
						<el-input v-model="refundData.refundApplyTime" disabled></el-input>
                    </el-form-item>
					<el-form-item prop="refundConfirmTime" label="退款确定时间" v-if="refundData.refundConfirmTime">
						<el-input v-model="refundData.refundConfirmTime" disabled></el-input>
                    </el-form-item>
                </el-form>
            </xm-dialog>
        </div>

        <OrderEdit v-if="detailShow" :detailData="detailData" class="detailShow" @back="handleBack"></OrderEdit>
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
import { columns, resultOption, orderStatus, orderType, refundStatus, cargoAccountOpt, remindStatusOpt} from "./defaultData";
import TableCard from "./module/tableCard";
import OrderEdit from '@/views/order/orderEdit';
import UploadModel from "_c/UploadFileModel";
import { order_demo, order_import_url, reject_order_demo, reject_refund_import_url} from "@/api/order/order";
export default {
    components: {
        SearchBox,
        TableList,
        ButtonList,
        Pagination,
        TimeRange,
        SelectMenu,
        XmDialog,
        TableCard,
        OrderEdit,
        UploadModel
    },
    name: 'OrderList',
    data() {
        return {
            detailShow: false,
            //查询数据
            formData: {
                orderId: null,
                phone: null,
                cargoMallOrderId: null,
                orderStatus: null,
				orderType: null,
				refundStatus: null,
				sourceId: '', // 商品ID
				sourceName: '', //商品名称
				cargoAccount: '', //1688账号
				remindStatus: null,
				storeSourceId: null, //产品id
				dateTime: [
                    new Date(this.$util.CommonUtils.getTime(-5) + " 00:00:00"),
                    new Date()
                ],
                pageNum: 1,
                pageSize: 50,
                pageTotal: 0
            },
            orderTypeOption: orderType,
            orderStatusOption: orderStatus,
			cargoAccountOption: cargoAccountOpt,
			remindStatusOption: remindStatusOpt,
            exportLoading: false,
            // 按钮
            searchLoading: false, //查询loading

            //表格
            columns: columns, //表格列
            tableTitle: "表格",
            operationWidth: 3,
            tableData: [], //表格数据
            selection: false,
            selectionList: [], // 所有勾选
            chooseSureLoading: false,
			xlsName:null,
			uploadTitle:null,
			uploadUrl: '',
			uploadDemo: '',
			uploadDescription:'',

            // 详情
            detailData: {},

            // 发货信息弹窗
            shipmentsDialogTitle: '发货信息填写',
            shipmentsDialog: false,
            shipmentsFormData: {
                orderId: '',
                company: ''
            },
            shipmentsLoading: false,
            resultOption: resultOption,
            shipmentsRules: {
                company: [
                    { required: true, message: '请选择物流公司', trigger: 'blur' }
                ],
                orderId: [
                    { required: true, message: '请输入物流单号', trigger: 'blur' }
                ]
            },

            batchOrderShow: false,

            // 批量发货模板
            upLoad: {
                uploadUrl: '',
                uploadDemo: ''
            },

            globleLoading: false,

            getOrderObj: {
                show: false,
                title: '添加订单',
                loading: false,
            },
            getOrderData: {
                orderId: ''
            },
            getOrderRules: {
                orderId: [
                    { required: true, validator: this.validateOrder, trigger: 'blur' }
                ]
            },

            markObj: {
                show: false,
                title: '备注',
                loading: false,
            },
            markObjData: {
                failDesc: '',
                orderId: ''
			},

			refundObj :{
				show: false,
                title: '立即退款',
				loading: false,
				type: 1, // 1、立即退款；2、拒绝退款；3、查看详情
			},
			refundData: {
                orderId: '',
				refundId: '',
				desc: '客户申请退款／退货',
				commitRefundAmount: null,
				refundStatus: '',
				refundAmount: '',
				refundActualAmount: '',
				refundReason: '',
				refundNote: '',
				refundApplyTime: '',
				refundConfirmTime: ''
			},
			refundStatus: refundStatus,
			refundRules: {
                desc: [
                    { required: true, message: '请输入退款描述',  trigger: 'blur' }
				],
				commitRefundAmount: [
                    { required: true, message: '请输入退款金额',  trigger: 'blur' }
				]
            }

        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.pageQuery();
        },

        handleBack() {
            this.detailShow = false;
        },

        // 查询数据
        pageQuery() {
            this.searchLoading = true;
            let param = this.$util.CommonUtils.formatParams(this.formData, 'beginTime', 'endTime');

            if(this.checkQueryDate(param)){
				return this.$api.order.listForPage(param).then(res => {
					res.data.data.forEach(item => {
						item.skuProperties = item.skuProperties ? JSON.parse(item.skuProperties) : [];
						item.children = [{
							sourceName: item.sourceName,
							sourceId: item.sourceId,
							storeSkuId: item.storeSkuId,
							skuProperties: item.skuProperties,
							sourcePayPrice: item.sourcePayPrice,
							sourceNum: item.sourceNum,
							sourceImg: item.sourceImg,
						}]
					})
					this.tableData = res.data.data;
					this.formData.pageTotal = res.data.totalCount;

					if(param.orderStatus == 20) {
						this.batchOrderShow = true;
						this.$refs.tableList.upDateChecked(this.selectionList);
					}else{
						this.batchOrderShow = false;
						this.selection = false;
						this.selectionList = [];
						this.$refs.tableList.upDateChecked(this.selectionList);
					}
				}).finally(() => {
					this.searchLoading = false;
				});
			}else {
				this.searchLoading = false;
				return ;
			}


        },

        // 查询按钮
        handleSearch() {
            this.formData.pageNum = 1;
            this.formData.pageSize = 50;
            this.pageQuery();
        },

		checkQueryDate(param){
			if(!param.orderId
				&& !param.phone
				&& !param.cargoMallOrderId
				&& !param.orderStatus
				&& !param.orderType
				&& !param.refundStatus
				&& !param.sourceId
				&& !param.sourceName
				&& !param.cargoAccount
				&& !param.beginTime
				&& !param.endTime
			){
				this.$msg('请选择查询日期', 'error');
				return false;
			}

			let sdate = param.beginTime;
			let edate = param.endTime;

			let stime = new Date(sdate).getTime() / (3600 * 1000 * 24);
			let etime = new Date(edate).getTime() / (3600 * 1000 * 24);
			if(Math.round(etime-stime-1) > 31){
				//this.formData.dateTime = [new Date(this.$util.CommonUtils.getTime(-5) + " 00:00:00"), new Date()];
				this.$msg('查询日期间隔不能超过31天', 'error');
				return false;
			}

			return true;
		},

        // 重置
        handleReset() {
            this.$refs.searchBoxForm.resetFields();
            this.pageQuery();
        },

        formatSku(skuProperties) {
            let str = '';
            if(skuProperties.length == 0) {
                str = '-';
            }else{
                skuProperties.forEach(item => {
                    str += item.v + '，';
                })
                str = str.slice(0, str.length - 1);
            }

            return str;
        },

        handelExport() {
			this.exportLoading = true;
			let params = this.$util.CommonUtils.formatParams(this.formData, 'beginTime', 'endTime');
			this.$api.order.export_order(params).then((res) => {
				this.$util.download(res,"订单列表-"+ new Date().Format('yyyy/MM/dd HH:mm:ss') +".xls",'application/vnd.ms-excel');
			}).finally(() => {
				this.exportLoading = false;
			})
        },

        handelImport(val) {
        	if(val == 'refund'){
				this.xlsName = '批量退款模板.xls' + ' (批量退款仅把钱退回给有赞的用户, 不会在1688上执行退货操作)';
				this.uploadTitle = '批量退款';
				this.uploadUrl = order_import_url;
				this.uploadDemo = order_demo;
			}else if(val == 'reject'){
				this.xlsName = '批量拒绝退款模板.xls';
				this.uploadTitle = '批量拒绝退款';
				this.uploadUrl = reject_refund_import_url;
				this.uploadDemo = reject_order_demo;
			}
            this.$refs.uploadFile.dialogVisibleUpLoad = true;
        },

        handleGetOrder() {
            this.getOrderObj.show = true;
        },

        handelBatchOrder() {
            if(this.selection) {
                this.selection = false;
            }else{
                this.selection = 'orderChoose';
            }
        },

        handelChooseSure() {
            if(this.selectionList.length == 0) return this.$msg('请先选择列表项');

            if(this.selection == 'orderChoose') {
                this.consignment();
            }
        },

        handelChooseCancel() {
            this.selectionList = [];
            this.$refs.tableList.upDateChecked(this.selectionList);
        },

        renderButton(orderStatus) {
            orderStatus = Number(orderStatus);
            let status = [10, 20, 25];
            return status.includes(orderStatus);
        },

        goDetail(storeId) {
            window.open(` https://detail.1688.com/offer/${storeId}.html`);
        },

        // 发货
        consignment(orderId) {
            let title = '提示';
            let conStr = '是否立即订货';
            let sureBtn = '确定';
            let cancelBtn = '取消';

            if(!orderId) {
                conStr = `已选${this.selectionList.length}个订单，是否立即订货`
            }
            this.$confirm(conStr, title, {
                confirmButtonText: sureBtn,
                cancelButtonText: cancelBtn,
                type: "warning"
            }).then(() => {
                this.globleLoading = true;
                let orderIdList = this.selectionList;
                if(orderId) orderIdList = [orderId];
                this.$api.order.batch_order({orderIdList}).then(res => {
                    if(orderId) {
                        let index = this.selectionList.findIndex(item => item == orderId);
                        this.selectionList.splice(index,1);
                    }else{
                        this.selectionList = [];
                    }
                    this.$msg(`${orderIdList.length}条订单订货已申请处理`, 'success');
                    this.$refs.tableList.upDateChecked(this.selectionList);
                    this.pageQuery();
                }).catch((e) => {
                    console.log(e);
                }).finally(() => {
                    this.globleLoading = false;
                })
            }).catch(err => {
                this.globleLoading = false;
            });
        },

        handleOrder(data) {
            if(data.orderStatus == 10) {
                console.log('取消订单');
            }else if(data.orderStatus == 20){
                this.consignment(data.orderId);
            }else if(data.orderStatus == 25) {
                console.log('发货');
            }
		},
		handleSuccessFn(response, file, fileList) {
			let msg = '';
			if (!response.data || !response.data.import_succ_num || response.data.import_succ_num == 0) {
				if (response.result.status == -402) {
					msg = response.result.msg;
					this.$store.dispatch('LogOut').then(() => {
						setTimeout(() => {
							location.reload();
						}, 1500)
					})
				} else if (response.result.status == 0) {
					msg = '导入失败';
				} else {
					response.data.error_msg_list.forEach(item => {
						msg += `<p>${item}</p>`
					})
				}
				this.fileList = [];
				this.$notify({
					duration: 0,
					title: '导入失败',
					type: 'error',
					dangerouslyUseHTMLString: true,
					message: msg
				});
			} else {
				this.$msg(`成功导入${response.data.import_succ_num}条数据`, 'success');
				if (response.data.error_msg_list && response.data.error_msg_list.length > 0) {
					response.data.error_msg_list.forEach(item => {
						msg += `<p>${item}</p>`
					})
					this.$notify({
						duration: 0,
						title: '部分导入失败',
						type: 'error',
						dangerouslyUseHTMLString: true,
						message: msg
					});
				}
				this.$refs.uploadFile.dialogVisibleUpLoad = false;
			}
		},

		//退款
		handleRefunnd(orderId,data) {
			this.refundObj.show = true;
			this.refundObj.title = '立即退款';
			this.refundObj.type = 1;
			this.refundRules = {
                desc: [
                    { required: true, message: '请输入退款描述',  trigger: 'blur' }
				],
				commitRefundAmount: [
                    { required: true, message: '请输入退款金额',  trigger: 'blur' }
				]
            };
            this.refundData = {
                orderId: orderId,
				refundId: data.refundId,
				desc: '客户申请退款／退货',
				commitRefundAmount: data.amount,
				refundStatus: data.status,
				refundReason: data.reason,
				refundNote: data.refundDesc,
				refundApplyTime: data.applyTime
			};
		},

		// 拒绝退款
		handleRejectRefunnd(orderId,data) {
			this.refundObj.show = true;
			this.refundObj.title = '拒绝退款';
			this.refundObj.type = 2;
			this.refundRules = {
                desc: [
                    { required: true, message: '请输入退款描述',  trigger: 'blur' }
				]
            };
            this.refundData = {
                orderId: orderId,
				refundId: data.refundId,
				desc: '客户申请退款／退货',
				refundStatus: data.status,
				refundReason: data.reason,
				refundNote: data.refundDesc,
				refundApplyTime: data.applyTime,
				refundConfirmTime: data.confirmTime
			};
		},

		// 查看详情
		handleRefunndDetail(orderId,data) {
			this.refundObj.show = true;
			this.refundObj.title = '售后详情';
			this.refundObj.type = 3;
            this.refundData = {
                orderId: orderId,
				refundId: data.refundId,
				refundStatus: data.status,
				refundAmount: data.amount,
				refundActualAmount: data.actualAmount,
				refundReason: data.reason,
				refundNote: data.refundDesc,
				refundApplyTime: data.applyTime,
				refundConfirmTime: data.confirmTime
			};
		},

        checkDetail(data) {
            this.detailData = data;
            this.detailShow = true;
        },

        // 备注
        getMark(data) {
            this.markObjData = {
                failDesc: data.failDesc,
                orderId: data.orderId
            }
            this.markObj.show = true;
        },

        //查看
        handleCheck(rowArr) {
            this.detailDialog = true;
        },

        sizeChange(pageSize) { //每页条数选项变化
            this.formData.pageSize = pageSize;
            this.pageQuery();
        },

        currentChange(page) { //页数变化
            this.formData.pageNum = page;
            this.pageQuery();
        },

        shipmentsDialogSure() {

        },

        shipmentsDialogClose() {

        },

        validateOrder(rule, value, callback) {
            if(this.$util.CommonUtils.isEmptyOrNull(value)) {
                return callback(new Error('请输入订单号'));
            }
            let reg = /^E\d{23}$/;
            console.log(value);
            if(!reg.test(value)) {
                return callback(new Error('请输入正确订单号，格式为E+23位数字'));
            }
            return callback();
        },

        getOrderDialogSure() {
            this.getOrderObj.loading = true;
            this.$refs.getOrderDialog.validate((valid) =>{
                if(valid) {
                    this.$api.order.getOrder({orderId: this.getOrderData.orderId}).then((res) => {
                        if(res.data.includes('失败')) {
                            this.$msg(res.data, 'error');
                            this.getOrderObj.loading = false;
                        }else{
                            this.handleReset();
                            this.$msg(res.data, 'success');
                            this.getOrderObj.loading = false;
                            this.getOrderObj.show = false;
                            this.getOrderData.orderId = '';
                        }
                    })
                }else{
                    this.getOrderObj.loading = false;
                    this.$msg('请正确填写订单号');
                }
            })
        },

        getOrderDialogClose() {
            this.getOrderData.orderId = '';
            this.getOrderObj.loading = false;
        },

        markObjDialogSure() {
            this.markObj.show = false;
        },

        markObjDialogClose() {
            this.markObj.show = false;
        },

		doRefund() {
			let param = {
                orderId: this.refundData.orderId,
				refundId: this.refundData.refundId,
				desc: this.refundData.desc,
				commitRefundAmount: this.refundData.commitRefundAmount,
				productType: 1,
				sourceType: 5
			}
			let formData = new FormData();
            Object.keys(param).forEach(item => {
                formData.append(item,param[item])
            })
			this.$api.order.refund_order(formData).then(res => {
				if(res.data.code == 1) {
					this.refundObj.loading = false;
					this.$msg(res.data.errDes, 'error');
					return
				}
				this.refundObj.show = false;
                this.$msg('退款成功', 'success');
				this.resetRefundData();
				this.pageQuery();
			}).finally(() => {
				this.refundObj.loading = false;
			})
		},

		rejectRefund() {
			let param = {
                orderId: this.refundData.orderId,
				refundId: this.refundData.refundId,
				desc: this.refundData.desc,
				productType: 1,
				sourceType: 5
			}
			let formData = new FormData();
            Object.keys(param).forEach(item => {
                formData.append(item,param[item])
            })
			this.$api.order.reject_refund_order(formData).then(res => {
				if(res.data.code == 1) {
					this.refundObj.loading = false;
					this.$msg(res.data.errDes, 'error');
					return
				}
                this.$msg(`退款已拒绝`, 'success');
                this.refundObj.show = false;
				this.resetRefundData();
				this.pageQuery();
            }).finally(() => {
                this.refundObj.loading = false;
            })
		},

		refundObjDialogSure() {
			if(this.refundObj.type == 3) {
				return this.refundObj.show = false;
			}

			this.refundObj.loading = true;
            this.$refs.refundDialog.validate((valid) =>{
                if(valid) {
                    if(this.refundObj.type == 1) {
						this.doRefund();
					}else{
						this.rejectRefund();
					}
                }else{
                    this.refundObj.loading = false;
                }
            })
		},

		refundObjDialogClose() {
			this.resetRefundData();
		},

		resetRefundData() {
			this.refundData = {
				orderId: '',
				refundId: '',
				desc: '客户申请退款／退货',
				commitRefundAmount: '',
				refundStatus: '',
				refundAmount: '',
				refundActualAmount: '',
				refundReason: '',
				refundNote: '',
				refundApplyTime: '',
				refundConfirmTime: ''
			}
		},

        resetShipmentsData() {
            this.shipmentsFormData = {
                process: 0,
                processDetail: null,
                processMoney:  null
            }
        },

        selectionChange(arr) {
            console.log(arr);
            this.selectionList = arr;
        },

		formatRefundStatus(status) {
			let index = refundStatus.findIndex(item => item.value ==  status);
			if(index > -1) {
				return refundStatus[index].label;
			}else{
				return '-';
			}
		},

        formOrderBtn(orderStatus) {
            let str = '';
            if(orderStatus == 10) {
                str = '取消订单';
            }else if(orderStatus == 20){
                str = '订货';
            }else if(orderStatus == 25) {
                str = '发货';
            }else{
                str = "查看详情";
            }
            return str;
        },

        formatData(obj, key){ //格式化
            let value = this.$util.CommonUtils.getDeepObj(obj, key);
            if(value === 0 || value === '0') {
                return value
            }
            return value ? value : '-';
        },

        formatSpcData(data, key) {
            if(key == 'sourceNum') {
                let sourcePayPrice = data['sourcePayPrice'] || 0;
                let sourceNum = data['sourceNum'] || 0;
                return (sourcePayPrice * sourceNum).toFixed(2)
            }else if(key == 'orderType') {
                let obj = orderType.find(item => {
                    return item.value == data['orderType']
                })
                let label = obj ? obj.label : '全部'
                return label
            }else if(key == 'orderStatus') {
                let obj = orderStatus.find(item => {
                    return item.value == data['orderStatus']
                })
                let label = obj ? obj.label : '-'
                return label
            }else{
                return '-'
            }
        },

        formatValue(value){ //格式化
            if(value === 0 || value === '0') {
                return value
            }
            return value ? value : '-';
        },

    },
    watch: {
        shipmentsDialog(val) {
            if (!val){
                this.$refs.shipmentsDialog.resetFields();
                this.resetShipmentsData();
            }
        },
    }
};
</script>
<style lang='scss' scoped>
    @import "index";
</style>

<style lang="scss">
    .orderList {
        .orderList-form {

        }
    }
</style>

