
<template>
	<div class="multiCascader">
		<multiCascader 
			:width="width"
			:height="height"
			:outputType="outputType"
			:options="options"
			ref="cascader"
			:disabledPair="disabledPair"
			@on-selected="getSelected">
		</multiCascader>
		<div class="tag">
			<el-tag
				style="margin-right: 10px"
				size="small"
				v-for="(tag,index) in formatTagArr"
				:key="tag.selectLabel"
				:disable-transitions="true"
				:closable="index===0"
				@close="tagClose(tag)"
				type="info">
				<span :title="tag.selectLabel">{{tag.selectLabel}}</span>
			</el-tag>

		</div>
	</div>
	


</template>

<script>
import multiCascader from "./mulCheckCascader.vue"; 
export default {
	components: {
		multiCascader	
	},
	props: {
		options: {
            type: Array,
            default() {
                return [];
            }
        },
        width: {
            type: String,
            default: ""
        },
        height: {
            type: String,
            default: ""
        },
        // 输出值的类型
        outputType: {
            type: String,
            default() {
                return "value";
            }
        },
        // 互斥对儿
        disabledPair: {
            type: Object,
            default() {
                return {};
            }
        }
	},
	data() {
		return {
			tagArr: [],
			closeValue: {},
		};
	},
	mounted() {
		window.bus.$on('clearAll',this.tagClearAll);
	},
	beforeDestroy() {
		
	},
	computed: {
		formatTagArr(){
			let tagArr = [];
			if(this.tagArr.length > 0){
				tagArr.push(this.tagArr[0]);
			}
			
			if(this.tagArr.length > 1){
				let tag = {selectLabel: `+ ${this.tagArr.length - 1}`};
				tagArr.push(tag);
			}
			return tagArr;
		}	
	},
	methods: {
		getSelected(arr){
			this.tagArr = arr;
			this.$emit('on-selected',arr);
		},
		tagClose(val){
			let arr = JSON.parse(JSON.stringify(this.$refs.cascader.options));
			let isParent = arr.find(item => {return item.selectValue == val.selectValue});
			if(isParent){ //删除的是父级
				this.$refs.cascader.$refs.muContent.clickParent(isParent,'close');
			}else{
				this.getOptionKey(val,arr);
            	this.$refs.cascader.$refs.muContent.checkChange(this.closeValue,'close');
			}
			
		},
		tagClearAll(){
			this.$refs.cascader.$refs.muContent.clearAllData();
		},
		getOptionKey(val,arr){
			for(let i=0;i<arr.length;i++){
				if(arr[i].children){
					this.getOptionKey(val,arr[i].children);
				}else{
					if(arr[i].selectValue === val.selectValue){
						arr[i].checked = false;
						this.closeValue = arr[i];
						return;
					}
				}
			}
		}
	}
};
</script>

<style rel="stylesheet/scss" lang="scss">
@import "./index.scss";
</style>
