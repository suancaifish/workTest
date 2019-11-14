const _import = require('./_import_' + process.env.NODE_ENV).default //获取组件的方法

import Main from '@/views/main' //main 是架构组件，不在后台返回，在文件里单独引入


function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象

	const accessedRouters = asyncRouterMap.filter(route => {

		if (route.component) {

			if (route.component === 'Main') { //main

				route.component = Main;

			} else {
				route.component = _import(route.component);
				
				if (!route.component) return false; //找不到文件则过滤掉
			}

		}

		if (route.children && route.children.length) {

			route.children = filterAsyncRouter(route.children)

		}

		return true

	})

	return accessedRouters


}
export default filterAsyncRouter;
