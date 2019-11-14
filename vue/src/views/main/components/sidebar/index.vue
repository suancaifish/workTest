<template>
	<el-scrollbar wrap-class="scrollbar-wrapper">
		<el-menu
			:default-active="$route.path"
			:collapse="isCollapse"
			mode="vertical"
			background-color="#343439"
			text-color="#fff"
			active-text-color="#fff"
			:unique-opened="true"
		> 
			<div class="xm-title">
				<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" :class="sidebar.opened ? '' : 'hamburger-shrink'"/>
			</div>
			<sidebar-item v-for="route in role_routers" :key="route.path" :item="route" :base-path="route.path"/>
		</el-menu>
	</el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
import Hamburger from '_c/Hamburger';
export default {
	components: { 
		SidebarItem,
		Hamburger
	},
	computed: {
		...mapGetters([
			'role_routers',
			'sidebar'
		]),
		isCollapse() {
			return !this.sidebar.opened
		}
	},
	data(){
		return {

		}
	},
	mounted() {
		console.log('role_routers',this.role_routers);
		console.log(this);
	},
	methods:{
		toggleSideBar() {
			this.$store.dispatch('toggleSideBar');
		},
	}
}
</script>
<style lang="scss" scoped>
	.xm-title{
		text-align: center;
		.hamburger-container {
			text-align: right;
			margin: 15px 20px 15px 0;
		}
		.hamburger-shrink{
			height: 56px;
			margin: 0;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>

