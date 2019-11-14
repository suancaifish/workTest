<!-- 模态框 -->
<template>
    <el-dialog
		class="xm-dialog"
		:title="dialogTitle"
		:visible.sync="dialogVisible"
		:width="dialogWidth"
		:custom-class="customClass"
		:modal-append-to-body="appendToBody"
		:before-close="handleBeforeClose"
		:close-on-click-modal="closeOnClickModal"
		:modal="modal"
		@close="handleClose">
		
		<div class="dialog-content">
			<XmScroll ref="xmScroll" :scrollHeight="scrollHeight">
				<slot></slot>
			</XmScroll>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button v-if="showClose" @click="handleClose" :disabled="loading">{{closeText}}</el-button>
			<el-button type="primary" v-if="showSure" @click="handleSure" :loading="loading">{{sureText}}</el-button>
		</div>
    </el-dialog>
</template>

<script>
import XmScroll from '_c/XmScroll';
export default {
	name: "XmDialog",
	components: {
		XmScroll
	},
	props:{
		// 显示隐藏
		dialogVisible:{
			type: Boolean,
			required: true,
			default: false
		},
		// 是否可以通过点击 modal 关闭 Dialog(对于可同时打开多个模态框的不开启)
		closeOnClickModal:{
			type: Boolean,
			required: false,
			default: false
		},
		//标题
		dialogTitle:{
			type: String,
			required: false,
			default: "提示"
		},
		//宽度
		dialogWidth:{
			type: String,
			required: false,
			default: "50%"
		},
		//是否显示取消
		showClose:{
			type: Boolean,
			required: false,
			default: true
		},
		//取消字
		closeText:{
			type: String,
			required: false,
			default: "取消"
		},
		closeDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		showSure: {
			type: Boolean,
			required: false,
			default: true
		},
		//确认字
		sureText:{
			type: String,
			required: false,
			default: "确定"
		},
		loading:{
			type: Boolean,
			required: false,
			default: false
		},
		// 是否点击确认按钮跟随关闭
		sureClose:{
			type: Boolean,
			required: false,
			default: true
		},
		customClass:{ //自定义类
			type: String,
			required: false,
			default: ""
		},
		appendToBody:{
			type: Boolean,
			required: false,
			default: true
		},
		//是否需要遮罩层
		modal:{
			type: Boolean,
			required: false,
			default: true
		},
		//内部最大高度
		scrollHeight:{
			type: String,
			default: "100%",
			required: false
		}

	},
	data() {
		return {

		};
	},

	computed: {},

	methods: {
		//关闭前
		handleBeforeClose(done){
			this.$emit('handleBeforeClose');
			done ();
		},
		//关闭
		handleClose(){
			this.$emit('update:dialogVisible',false);
			this.$emit('handleClose');
		},
		//确认
		handleSure(){
			if(this.sureClose) this.$emit('update:dialogVisible',false);
			this.$emit('handleSure');
		}
	}
};
</script>
<style lang='scss' scoped>
@import "index";
</style>
