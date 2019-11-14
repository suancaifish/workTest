<!-- 常用按钮列表 -->
<template>
	<div class="button-list flex-start">
		<el-button type="primary" v-if="layoutShow('search')" icon="el-icon-search" :size="buttonSize" :loading="searchLoading" :disabled="searchDisabled" @click="handleSearch">查询</el-button>
		<el-button type="primary" v-if="layoutShow('check')" :size="buttonSize" :loading="checkLoading" :disabled="checkDisabled" @click="handleCheck">查看</el-button>
		<el-button type="primary" v-if="layoutShow('reset')" icon="el-icon-refresh" :size="buttonSize" :loading="resetLoading" :disabled="resetDisabled" @click="handleReset">重置</el-button>
		<el-button type="primary" v-if="layoutShow('refresh')" icon="el-icon-refresh" :size="buttonSize" :loading="refreshLoading" :disabled="refreshDisabled" @click="handleRefresh">刷新</el-button>
		<el-button type="primary" v-if="layoutShow('add')" icon="el-icon-circle-plus-outline" :size="buttonSize" :loading="addLoading" :disabled="addDisabled" @click="handleAdd">{{addText}}</el-button>
		<el-button type="primary" v-if="layoutShow('import')" icon="el-icon-upload2" :size="buttonSize" :loading="importLoading" :disabled="importDisabled" @click="handleImport">导入</el-button>
		<el-button type="primary" v-if="layoutShow('export')" icon="el-icon-download" :size="buttonSize" :loading="exportLoading" :disabled="exportDisabled" @click="handleExport">导出</el-button>
		<el-button type="primary" v-if="layoutShow('edit')" :size="buttonSize" :loading="editLoading" :disabled="editDisabled" @click="handleEdit">{{editText}}</el-button>
		<el-button type="danger" v-if="layoutShow('delete')" :size="buttonSize" :loading="deleteLoading" :disabled="deleteDisabled" @click="handleDelete">删除</el-button>
		<el-button type="success" v-if="layoutShow('power')" :size="buttonSize" :loading="powerLoading" :disabled="powerDisabled" @click="handlePower">权限</el-button>
		<el-button type="success" v-if="layoutShow('audit')" :size="buttonSize" :loading="auditLoading" :disabled="auditDisabled" @click="handleAudit">审核</el-button>
		<el-button type="danger" v-if="layoutShow('return')" icon="el-icon-back" :size="buttonSize" @click="handleReturn">返回</el-button>
		<div v-if="layoutShow('batches')">
			<div v-if="selectionColumn && tableData.length > 0">
				<el-button :size="buttonSize" @click="handleBatchesCancel()">取消</el-button>
				<el-button type="primary" :size="buttonSize" :loading="batchesLoading" @click="handleBatchesSure()">确认</el-button>
			</div>
			<el-button v-else type="primary" :size="buttonSize" @click="handleBatches()">批量删除</el-button>
		</div>
		<!-- 自定义按钮(包括权限显示隐藏) -->
		<div v-for="item in customButton" :key="item" v-if="!getHideButton(item)">
			<slot :buttonData="buttonData" :name="item"></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		/**
		 * @description 引用的常用按钮 (自定义见下面customButton)
		 * 例: ['search','reset','add']
		 * return 返回按钮
		 * search 搜索按钮
		 * reset 重置按钮
		 * add 新增按钮
		 * edit 编辑按钮
		 * delete 删除按钮
		 * power 权限按钮
		 * batches 批量删除按钮 （selectionColumn must required true && tableData must required true）
		 */
		layout: {
			type: Array,
			required: false,
			default: () => {
				return [];
			}
		},
		// 点击按钮获取的数据
		buttonData: {
			type: null,
			required: false,
			default: null
		},
		// 是否开启多选项
		selectionColumn: {
			type: Boolean,
			required: false,
			default: false
		},
		// 表格数据
		tableData: {
			type: Array,
			required: false,
			default: () => {
				return [];
			}
		},
		// 按钮大小 medium / small / mini
		buttonSize: {
			type: String,
			required: false,
			default: "mini"
		},
		// 搜索按钮
		searchLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		searchDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		// 查看按钮
		checkLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		checkDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		// 重置按钮
		resetLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		resetDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		// 刷新按钮
		refreshLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		refreshDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		addText: {
			type: String,
			required: false,
			default: "新增"
		},
		// 新增按钮
		addLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		addDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		//导入按钮
		importLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		importDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		//导出按钮
		exportLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		exportDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		// 编辑按钮
		editLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		editDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		//编辑按钮文字
		editText: {
			type: String,
			required: false,
			default: "修改"
		},
		// 删除按钮
		deleteLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		deleteDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		powerLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		powerDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		auditLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		// 禁用
		auditDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		
		// 批量确认按钮
		batchesLoading: {
			type: Boolean,
			required: false,
			default: false
		},
		//自定义按钮数组 ['addChildMenu',]
		customButton: {
			type: Array,
			required: false,
			default: () => {
				return [];
			}
		}
	},
	data() {
		return {
			exclude_list: [] //按钮权限列表
		};
	},

	computed: {},

	mounted() {
		window.addEventListener("keydown", this.keyDown);
	},
	activated() {
		window.addEventListener("keydown", this.keyDown);
	},
	deactivated() {
		window.removeEventListener("keydown", this.keyDown);
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.keyDown);
	},

	methods: {
		layoutShow(val) {
			if (this.layout.includes(val) && !this.getHideButton(val)) {
				return true;
			} else {
				return false;
			}
		},

		/**
		 * @description 判断按钮是否隐藏(true为隐藏)
		 * @param (String) btnName
		 */
		getHideButton(btnName) {
			let exclude_list = this.$route.meta.exclude_list || [];
			let exclude_button = [];
			exclude_list.forEach(item => {
				//获取不显示的按钮
				let buttonName = item.slice(item.lastIndexOf(":") + 1);
				exclude_button.push(buttonName);
			});
			return exclude_button.includes(btnName);
		},
		// 转换为深拷贝格式
		dataFormat(val) {
			if (Array.isArray(val)) {
				let arr = [];
				val.forEach(item => {
				if (this.$util.CommonUtils.isObject(val)) {
					arr.push(JSON.parse(JSON.stringify(item)));
				} else {
					arr.push(item);
				}
			});
				return arr;
			} else if (this.$util.CommonUtils.isObject(val)) {
				return JSON.parse(JSON.stringify(val));
			} else {
				return val;
			}
		},
		// 返回
		handleReturn() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleReturn", val);
		},
		// 查询按钮
		handleSearch() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleSearch", val);
		},
		// 查看按钮
		handleCheck() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleCheck", val);
		},
		// 重置按钮
		handleReset() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleReset", val);
		},
		// 刷新按钮
		handleRefresh() {
			location.reload(); 
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleReset", val);
		},
		// 新增按钮
		handleAdd() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleAdd", val);
		},
		// 导入按钮
		handleImport() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleImport", val);
		},
		// 导出按钮
		handleExport() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleExport", val);
		},
		// 修改按钮
		handleEdit() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleEdit", val);
		},
		// 删除按钮
		handleDelete() {
			this.$confirm("删除, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "error"
			}).then(() => {
				let val = this.dataFormat(this.buttonData);
				this.$emit("handleDelete", val);
			}).catch(err => {
				console.log(err);
			});
		},
		// 权限按钮
		handlePower() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handlePower", val);
		},
		// 审核按钮
		handleAudit() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleAudit", val);
		},
		//批量删除
		handleBatches() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleBatches", val);
		},
		//批量删除确认
		handleBatchesSure() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleBatchesSure", val);
		},
		//批量删除取消
		handleBatchesCancel() {
			let val = this.dataFormat(this.buttonData);
			this.$emit("handleBatchesCancel", val);
		},
		getRoleButton(val) {
			this.exclude_list = val.meta.exclude_list;
		},
		keyDown(e) {
			if (e.keyCode == 13) {
				this.handleSearch();
			}
		}
	}
};
</script>
<style lang='scss' scoped>
@import "index";
</style>
