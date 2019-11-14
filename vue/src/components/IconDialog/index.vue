<!-- 图标 -->
<template>
	<el-dialog
    title="图标库"
    :visible.sync="dialogVisible"
    :width="dialogWidth"
		@close="handleClose">
			<div class="icon-list flex-start">
				<div v-for="(item,index) in iconList" :key="index" class="icon" :class="{active: activeIndex == index}" @click="selectIcon(item,index)">
					<div><i class="iconfont" :class="item.icon"></i></div>
					<p class="beyond-ellipsis" :title="item.name">{{item.name}}</p>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
					<el-button @click="handleClose">取消</el-button>
					<el-button type="primary" @click="handleSure">确认</el-button>
			</div>
  </el-dialog>
</template>

<script>
import iconList from '@/assets/icon';
export default {
	props:{
		dialogVisible: {
			type: Boolean,
			required: false,
			default: false
		},
		//宽度
		dialogWidth:{
			type: String,
			required: false,
			default: "50%"
		},
	},
	components: {

	},
  data () {
    return {
			iconList: iconList,
			activeIndex: 0,
    };
  },
  computed: {},

  mounted() {},

  methods: {
		selectIcon(icon,index){
			this.activeIndex = index;
		},
		handleSure(){
			this.$emit('update:dialogVisible',false);
			this.$emit('handleSure',this.iconList[this.activeIndex])
		},
		handleClose(){
			this.$emit('update:dialogVisible',false);
		}
	},
	watch:{
		dialogVisible(val){
			if(!val) this.activeIndex = 0;
		}
	}
}

</script>

<style lang='scss' scoped>
    @import 'index'
</style>
