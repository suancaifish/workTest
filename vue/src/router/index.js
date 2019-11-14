import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Main from '@/views/main';

/**
* hidden: true                   设为true后在左侧菜单不会显示该页面选项(默认是false)
* alwaysShow: true               如果设置为true，则总是显示根菜单
* redirect: noredirect           重定向
* name:'router-name'             
* meta : {
    title: 'title'               在子菜单和面包屑中显示名称
    icon: 'icon-name'             icon图标名字
    noCache: true                设为true后页面不会缓存
  }	
**/
export const constantRouterMap = [
	{
		path: '/redirect',
		component: Main,
		hidden: true,
		children: [
			{
				path: '/redirect/:path*',
				component: resolve => require(['@/views/redirect'], resolve)
			}
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: resolve => require(['@/views/login'], resolve),
		hidden: true
	},
	{
		path: '/404',
		name: '404',
		component: resolve => require(['@/views/errorPage/404'], resolve),
		hidden: true
	},
	{
		path: '/401',
		name: '401',
		component: resolve => require(['@/views/errorPage/401'], resolve),
		hidden: true
	},
	{
		path: '/',
		component: Main,
		redirect: '/home',
		children: [
			{
				path: '/home',
				component: resolve => require(['@/views/home'], resolve),
				name: 'Home',
				meta: {
					title: '工作台',
					icon: 'icon-zhuye',
					noCache: true
				}
			}, 
		]
	},
	
]


export default new Router({
    // mode: 'history',
    scrollBehavior: () => ({
        y: 0
    }),
    routes: constantRouterMap
})

