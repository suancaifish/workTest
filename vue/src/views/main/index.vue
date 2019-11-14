<template>
	<div :class="classObj" class="app-wrapper">
		<navbar/>
		<sidebar class="sidebar-container"/>
		<div class="main-container">
			<tags-view/>
			<xm-scroll ref="xmScroll" :scrollHeight="scrollHeight" :backToTopShow="true">
				<app-main/>
			</xm-scroll>
		</div>
	</div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components';
import XmScroll from '_c/XmScroll';
import ResizeMixin from './mixin/ResizeHandler';
export default {
	name: 'Main',
	components: {
		Navbar,
		Sidebar,
		AppMain,
		TagsView,
		XmScroll
	},
	mixins: [ResizeMixin],
	data(){
		return {
			sidebarHeihgt: '100%',
			scrollHeight: '', //最大高度
		}
	},
	computed: {
		sidebar() {
			return this.$store.state.app.sidebar;
		},
		device() {
			return this.$store.state.app.device;
		},
		classObj() {
			return {
				hideSidebar: !this.sidebar.opened,
				openSidebar: this.sidebar.opened,
				withoutAnimation: this.sidebar.withoutAnimation,
				mobile: this.device === 'mobile'
			}
		}
	},
	created(){
		this.initHeight();
	},
	mounted() {
		window.addEventListener('resize', this.initHeight);
		window.bus.$on('backToZero',(val) =>{
			this.$refs.xmScroll.backToZero();
    	});
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.initHeight);
    },
	methods: {
		initHeight(){
			let height = document.documentElement.clientHeight - 75 - 10;
			height = height > 400 ? height : 400;
			this.scrollHeight =  height + 'px';
		},
		
	},	
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "index";
</style>
