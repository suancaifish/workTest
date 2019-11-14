<!-- 表格 -->
<template>
	<fullscreen ref="fullscreen" @change="fullscreenChange">
		<div class="table">
			<div class="flex-between table-title">
			<!-- 表格标题 -->
			<p v-if="tableTitleShow">{{tableTitle}}</p>
			<slot name="titleHeader"></slot>
			<div class="flex-start header-button">
				<el-button type="primary" @click="toggle" size="mini">{{this.fullscreen ? '取消全屏' : '全屏'}}</el-button>
				<el-button type="primary" @click="listControl" size="mini">显示表列</el-button>
				<!-- 表格右上角增加自定义的按钮 -->
				<slot name="header"></slot>
				<!-- 表格是否可显示隐藏 -->
				<i v-if="hideBol" @click="toggleTable" class="el-icon-arrow-down" :class="tableShow ? 'rotate180': ''"></i>
			</div>
		</div>
		<div  v-if="tableShow" class="table-content">
			<el-table 
				ref="table" 
				v-loading="loading" 
				:show-summary="showSummary" 
				:summary-method="summaryMethod"  
				:maxHeight="scrollHeight"
				:data="formatData" 
				:row-class-name="showRow"
				:cell-class-name="cellClassName"
				border 
				highlight-current-row 
				v-bind="$attrs" 
				@selection-change="selectionChange" 
				@sort-change="sortChange"
				style="width: 100%">
				<el-table-column v-if="selectionColumn && layoutShow('selectionColumn')" type="selection" width="55" align="center"></el-table-column>
				<el-table-column v-if="indexColumn && layoutShow('indexColumn')" type="index" width="55" align="center" label="序号"></el-table-column>
				<!-- 主体 -->
				<el-table-column
					v-if="layoutShow(column.value)"
					v-for="(column) in columns"
					:key="column.value"
					:label="column.label"
					:min-width="column.width"
					:align="column.align ? column.align : tableAlign"
					:sortable="column.sortable"
					:type="column.expand ? 'expand' : ''"
					show-overflow-tooltip
					>
					<template slot-scope="scope" v-if="!column.children">
						<!-- 列内容自定义渲染 （在columns中添加custom：true 标识）-->
						<div  v-if="column.custom" class="beyond-ellipsis"><slot :name="column.value" :data="scope"></slot></div>
						<div v-else class="beyond-ellipsis">
							{{ formatting(scope,column) }}
						</div>
					</template>
					<template v-if="column.children">
                        <el-table-column  v-for="(item) in column.children" :key="item.value" :label="item.label" :min-width="item.width" align="center" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div v-if="item.custom" class="beyond-ellipsis"><slot :name="item.value" :data="scope"></slot></div>
                                <div v-else class="beyond-ellipsis">
                                    {{secondFormatting(scope,item)}}
                                </div>
                            </template>
                        </el-table-column>
                    </template> 
				</el-table-column>
				<!-- 操作按钮 -->
				<el-table-column :label="operationLabel" v-if="operation && operationControl && layoutShow('operation')" :min-width="operationWidth" :fixed="operationFixed" :align="tableAlign">
					<template slot-scope="scope">
						<div class="flex-center">
							<slot name="operation" :data="scope" ref="operation"></slot>
						</div>
					</template>
				</el-table-column>

			</el-table>
				
			<slot name="footer"></slot>
		</div>
		<xm-dialog :dialogVisible.sync="listControlShow" dialogTitle="列显示控制" @handleSure="handleListControl" @handleClose="handleClose" :showClose="true" >
			<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="margin-bottom-20">全选</el-checkbox>
			<el-checkbox-group v-model="checkedList" @change="handleCheckedListChange">
				<el-checkbox v-for="item in listOption" :label="item.value" :key="item.value" class="margin-bottom-20">{{item.label}}</el-checkbox>
			</el-checkbox-group>
		</xm-dialog>
		</div>
	</fullscreen>
</template>

<script>
/**
 * slot（用于自定义）
 * header: 表格外层头部
 * footer：表格外层头部 //可插入分页
 * operation： 按钮自定义
 */
import treeToArray from "./table";
import XmDialog from "_c/XmDialog";
import { setTimeout } from 'timers';
export default {
	name: "TableList",
	components: {
		XmDialog
	},
	props: {
		//数据
		tableData: {
			type: [Array, Object],
			required: true
		},
		//列数据
		columns: {
			type: Array,
			required: true,
			default: () => []
		},
		//全局对齐方式 left/center/right，具体个别的可在columns加align控制
		tableAlign: {
			type: String,
			default: "center"
		},
		//是否全部展开
		expandAll: {
			type: Boolean,
			default: false
		},
		//是否显示标题
		tableTitleShow:{
			type: Boolean,
			default: true	
		},
		tableTitle: {
			type: String,
			default: "数据列表"
		},
		//是否可隐藏
		hideBol: {
			type: Boolean,
			default: false,
			required: false
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
			type: String,
			default: "145"
		},
		//是否显示序号栏
		indexColumn: {
			type: Boolean,
			default: false,
			required: false
		},
		//记载loading
		loading: {
			type: Boolean,
			default: false,
			required: false
		},
		//是否显示选择栏
		selectionColumn: {
			type: Boolean,
			default: false,
			required: false
		},
		tableFormat: {
		//自定义渲染函数
			type: null,
			required: false,
			default: false
		},
		tableSecondFormat: {
		//多级表自定义渲染函数
			type: null,
			required: false,
			default: false
		},
		hasPagination: {
		//是否有分页
			type: Boolean,
			default: true,
			required: false
		},
		//表尾合计
		showSummary: {
			type: Boolean,
			default: false,
			required: false
		},
		summaryMethod: {
			type: Function,
			required: false
		},
		cellClassName: {
			type: [Function,String],
			dafault: '',
			required: false
		},
		// 操作栏名字
		operationLabel: {
			type: String,
			default: '操作',
			required: false
		}
	},
	data() {
		return {
			tableShow: true, // 表格伸缩
			scrollHeight: null, //滚动高度
			listControlShow: false, //控制器显示
			checkAll: true, //是否全选
			checkedList: [], //展示的列数组
			listOption: [], //列选项数据
			isIndeterminate: false, //属性用以表示 checkbox 的不确定状态
			noShowList: [], //不显示的列
			allList: [], //全部的列表值
			tableLoading: false,
			cancelList: [], //保存打开前的勾选数
			sureClose: false, //确认后的关闭
			fullscreen: false, //全屏
			expandLast: false //保存上一次展开的下标
		};
	},
	computed: {
		// 格式化数据源
		formatData() {
			let tmp;
			if (!Array.isArray(this.tableData)) {
				tmp = [this.tableData];
			} else {
				tmp = this.tableData;
			}
			const func = treeToArray;
			const args = [tmp, this.expandAll];
			return func.apply(null, args);
		},
		operationControl() {
			if (!this.$route.meta.exclude_list) return true;
			let exclude_list = [];
			let attrs = this.$scopedSlots.operation.toString().replace(/\s/g, "").match(/attrs:\{[^\}]+\}/)[0].replace(/attrs:/, "");
			let layout = attrs.match(/layout:\[[^\]]+\]/) ? attrs.match(/layout:\[[^\]]+\]/)[0].replace(/layout:\[/, "").replace(/\]/, "").replace(/"/g, "").split(",") : [];
			let customButton = attrs.match(/customButton:\[[^\]]+\]/) ? attrs.match(/customButton:\[[^\]]+\]/)[0].replace(/customButton:\[/, "").replace(/\]/, "").replace(/"/g, "").split(",") : [];
			let operationBtn = [...layout, ...customButton];
			this.$route.meta.exclude_list.forEach(item => {
				let type = item.slice(item.lastIndexOf(":") + 1);
				if (operationBtn.includes(type) && !exclude_list.includes(type)) {
					exclude_list.push(type);
				}
			});
			if (exclude_list.length == operationBtn.length) {
				return false;
			} else {
				return true;
			}
		}
	},
	created(){
		
	},
	beforeMount() {
		
	},
	mounted() {
		window.addEventListener("keydown", this.keyDown);
		window.addEventListener('resize', this.resizeHeight);
		this.init();
		window.bus.$on('currentChange',(val) =>{
			this.$refs.table.$el.querySelector('.el-table__body-wrapper').scrollTop = 0
		});
		this.formatHeader();
		this.hackTableHeight();
	},
	activated() {
		window.addEventListener("keydown", this.keyDown);
		window.addEventListener('resize', this.resizeHeight);
	},
	deactivated() {
		window.removeEventListener("keydown", this.keyDown);
		window.removeEventListener('resize', this.resizeHeight);
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.keyDown);
		window.removeEventListener('resize', this.resizeHeight);
	},
	methods: {
		init() {
			this.getList();
			this.noShowList = this.columns.filter(item => item.show === false).map(item => item.value); //初始隐藏列(列添加show == false)
		},
		formatHeader(){ // 修复safari浏览器的表格错位
			this.$refs.table.$el.querySelector('.el-table__header').style.tableLayout = 'inherit';
			setTimeout(()=>{
				this.$refs.table.$el.querySelector('.el-table__header').style.tableLayout = 'fixed';
			},10)
		},
		hackTableHeight() {
			this.initHeight((() => {
				let headHeight = this.$refs.table.$el.querySelector('.el-table__header-wrapper').offsetHeight;
				let tableHeight = this.scrollHeight - headHeight;
				this.$refs.table.$el.querySelector('.el-table__body-wrapper').setAttribute('style', `maxHeight: ${tableHeight} !important`);
			}))
		},
		// 获取表格最大高度
		initHeight(){
			let height = 0;
			if (this.fullscreen) {
				height = document.documentElement.clientHeight - 10 - 75;
			}else{
				height = document.documentElement.clientHeight - 75 - 10 - 48;
			}
			height = height > 300 ? height : 300;
			this.scrollHeight =  height;
		},
		resizeHeight(){
			setTimeout(() => {
				this.initHeight();
			},20)
		},
		//获取列表
		getList() {
			let arr = [];
			let checkList = [];
			let allList = [];
			this.columns.forEach(item => {
				arr.push(item);
				allList.push(item.value);
				if (item.show !== false && (this.$util.CommonUtils.isEmptyOrNull(item.show) || item.show === true)) {
					checkList.push(item.value);
				}
			});
			if (this.indexColumn) {
				arr.push({ value: "indexColumn", label: "序号" });
				checkList.push("indexColumn");
				allList.push("indexColumn");
			}
			if (this.operationControl) {
				arr.push({ value: "operation", label: "操作" });
				checkList.push("operation");
				allList.push("operation");
			}
			this.listOption = arr;
			this.checkedList = checkList;
			this.allList = allList;
			if (checkList.length == allList.length) {
				this.isIndeterminate = false;
				this.checkAll = true;
			} else if (checkList.length == 0) {
				this.isIndeterminate = false;
				this.checkAll = false;
			} else {
				this.isIndeterminate = true;
				this.checkAll = false;
			}
		},
		//显示隐藏
		showRow(row) {
			const show = row.row.parent ? row.row.parent._expanded && row.row.parent._show : true;
			row.row._show = show;
			if(row.row._level !== 1){
				return show ? "show" : "hide";
			}
			
		},
		// 切换下级是否展开
		toggleExpanded(trIndex) {
			const record = this.formatData[trIndex];
			record._expanded = !record._expanded;
			if (!record._expanded && record.children.length > 0) {
				this.childrenExpanded(record.children);
			}
			if(this.expandLast !== false && this.expandLast !== trIndex){
				const lastRecord = this.formatData[this.expandLast];
				lastRecord._expanded = false;
				this.childrenExpanded(lastRecord.children);
			}
			this.expandLast = trIndex;
			this.$emit("toggleExpanded", record._expanded);
		},
		childrenExpanded(children) {
			children.forEach(item => {
				if (item.children && item.children.length > 0) {
					item._expanded = false;
					this.childrenExpanded(item.children);
				}
			});
		},
		// 图标显示
		iconShow(index, record,hideExpandIcon) {
			return !hideExpandIcon && index === 0 && record.children && record.children.length > 0;
		},
		// 列显示隐藏
		layoutShow(val) {
			if (this.noShowList.includes(val)) {
				return false;
			} else {
				return true;
			}
		},
		//toggle
		toggleTable() {
			this.tableShow = !this.tableShow;
		},
		//列显示控制
		listControl(val) {
			this.listControlShow = !this.listControlShow;
		},
		// 查询两个数组不同
		getArrDifference(arr1, arr2) {
			const result = []; //返回的数组
			arr1.forEach(oldItem => {
				if (!arr2.find(newItem => {return oldItem === newItem;})) {
					result.push(oldItem);
				}
			});
			return result;
		},
		//显示处理
		handleListControl() {
			this.sureClose = true;
			this.noShowList = this.getArrDifference(this.allList, this.checkedList);
		},
		//排序
		sortChange(val) {
			this.$emit("sortChange",val);
		},
		// 全选处理
		handleCheckAllChange(val) {
			if (val) {
				let checkList = [];
				this.listOption.forEach(item => {
					checkList.push(item.value);
				});
				this.checkedList = checkList;
			} else {
				this.checkedList = [];
			}
			this.isIndeterminate = false;
		},
		// 选项改变处理
		handleCheckedListChange(value) {
			let checkedCount = value.length;
			this.checkAll = checkedCount === this.listOption.length;
			this.isIndeterminate = checkedCount > 0 && checkedCount < this.listOption.length;
		},
		//选项变化
		selectionChange(selection) {
			this.$emit("selectionChange", selection);
		},
		formatting(scope, column) {
			//格式化
			if (column.value == "createTime") {
				//全局表格格式化
				return new Date(scope.row[column.value]).Format("yyyy/MM/dd HH:mm:ss");
			}
			if (this.$util.CommonUtils.isEmptyOrNull(scope.row[column.value]) && scope.row[column.value] !== 0){
				return "-";
			}
				
			if (typeof this.tableFormat == "function") {
				//自定义渲染数据
				return this.tableFormat(scope, column);
			} else {
				return scope.row[column.value];
			}
		},
		secondFormatting(scope, column){
			
			if (column.value == "createTime") {
				return new Date(scope.row[column.value]).Format("yyyy/MM/dd HH:mm:ss");
			}
			if(this.$util.CommonUtils.isEmptyOrNull(scope.row[column.value]) && scope.row[column.value] !== 0 ) return '-';
            if (typeof this.tableSecondFormat == "function") {
				//自定义渲染数据
				return this.tableSecondFormat(scope, column);
			} else {
				return scope.row[column.value];
			}
        },
		keyDown(e) {
			if (e.altKey && e.keyCode == 84) {
				this.listControl();
			}
		},
		print(param) {},
		handleClose() {},
		toggle() {
			this.$refs["fullscreen"].toggle();
		},
		fullscreenChange(fullscreen) {
			window.bus.$emit('fullscreen',fullscreen);
			this.fullscreen = fullscreen;
		}
	},
	watch: {
		listControlShow(val) {
			if (val) {
				this.cancelList = JSON.parse(JSON.stringify(this.checkedList));
			} else {
				if (this.sureClose) {
					this.sureClose = false;
				} else {
					this.checkedList = JSON.parse(JSON.stringify(this.cancelList));
				}
			}
		},
		loading(val){
			this.expandLast = false;
		}
		
	}
};
</script>
<style rel="stylesheet/css">
	.show{
        animation:tableShow 0.5s;
		background-color: rgb(163, 161, 161) !important; 
		color: #FFF;
    }
    @keyframes tableShow {
        from {
			opacity: 0.5;
			transform: scaleY(0.5);
        }
        to {
			transform: scaleY(1);
            opacity: 1;
        }
    }
    .hide{
        display:none;
    }
</style>

<style lang='scss' scoped>
@import "index";
</style>
