<template>

	<view>
		<textarea v-if="isok" class="cjw" ref="text" placeholder-style="color:#F76260" placeholder="占位符字体是红色的" @focus="focus" @blur="blur" />
		<view class="cjw" v-else @click
		="aa">占位符字体是白色的</view>
	</view>

</template>

<script>
import log from '../../common/log.js'
	export default {
		components: {
			
		},
		data(){
			return{
				isok:true
			}
		},onShow() {
			// console.log(3)
			// log.info('mine') // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
			// log.warn('mine')
			// log.error('mine')
			// log.setFilterMsg('filterkeyword')
			// log.setFilterMsg('addfilterkeyword')
		},
		methods: {
focus(){
	console.log(1);
	this.isok=true;
}
,
blur(){
	console.log(2);
	this.isok=false;
}
,
aa(){
	this.isok=true;
	this.$refs.text.onfocus()
}
		}
	}
</script>

<style>
	.aa {
		height: 400rpx;
		overflow: auto;
	}

	.dd {
		height: 100rpx;
	}
	.cjw{
		height: 300rpx;
		width: 400rpx;
		background:pink;
	}
	.input-placeholder{
		
		position: relative;
		top: 0;
		left: 0;
		color:#007AFF;
		}
</style>
