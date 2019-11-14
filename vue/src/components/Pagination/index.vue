<!-- 分页 -->
<template>
	<div class="el-pagination-wrap">
		<el-pagination
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
			:current-page="currentPage"
			:page-sizes="pageSizes"
			:page-size="pageSize"
			:layout="layout"
			:pager-count="pagerCount"
			:total="total">
		</el-pagination>

		<div v-show="loading" class="pagination-loading flex-center">
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Pagination",
	props: {
		// loading状态
		loading: {
			type: Boolean,
			default: false,
			required: false
		},
		// 当前页数
		currentPage: {
			type: Number,
			default: 1,
			required: false
		},
		//总条目数
		total: {
			type: Number,
			required: true
		},
		//每页显示个数选择器的选项设置
		pageSizes: {
			type: Array,
			required: false,
			default: () => {
				return [50, 100, 200];
			}
		},
		//每页显示条目个数
		pageSize: {
			type: Number,
			default: 50,
			required: false
		},
		//组件布局
		layout: {
			type: String,
			required: false,
			default: "total,sizes,prev,pager,next,jumper"
		},
		//页码按钮的数量
		pagerCount: {
			type: Number,
			required: false,
			default: 5
		},

		// 查询后是否需要回到顶部
		backTop: {
			type: Boolean,
			default: true,
			required: false
		}
	},
	data() {
		return {};
	},

	computed: {},

	mounted() {
		window.bus.$on("fullscreen", val => {
			this.setLayout(val);
		});
	},

	methods: {
		//每页条数改变处理
		handleSizeChange(val) {
			this.$emit("sizeChange", val);
		},
		//页数改变处理
		handleCurrentChange(val) {
			this.$emit("currentChange", val);
			if(this.backTop) {
				window.bus.$emit("backToZero", val);
			}
		},
		setLayout(val){
			let layout = this.layout.split(',');
			if(val){
				let index = layout.findIndex( item => {return item == 'sizes'});
				layout.splice(index,1);
			}else{
				if(!layout.includes('sizes')) layout.splice(1,0,'sizes');
			}
			this.layout = layout.join(',');
		}
	}
};
</script>
<style lang='scss' scoped>
	@import "./index.scss";
</style>
