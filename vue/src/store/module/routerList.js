import { constantRouterMap } from '@/router'
import { setAddRouter } from '@/utils/util';
import { getUserMenu } from '@/api/login';
import router from "@/router/index";
import filterAsyncRouter from '@/router/formatRouter';

const routerList = {
	state: {
		routers: constantRouterMap,
		addRouters: []
	},
	mutations: {
		SET_ROUTERS: (state, routers) => {
			state.addRouters = routers;
			state.routers = constantRouterMap.concat(routers);
		}
	},
  actions: {
    GenerateRoutes({ commit }, addRouter) {
      return new Promise((resolve) => {
        if(addRouter.length > 0) addRouter.push({ path: '*', redirect: '/404', hidden: true }); //用于无效路由重定向
        commit('SET_ROUTERS', addRouter); //vuex保存添加的路由
        setAddRouter(addRouter); //本地保存添加的路由
        router.addRoutes(addRouter) // 动态添加可访问路由表
        resolve()
      })
    },
    // 获取用户列表信息
    GetUserMenu({ dispatch }) {
      return new Promise((resolve, reject) => {
        getUserMenu({id: process.env.VUE_APP_API_SUBSYSTEMID}).then(response => {
          const data = response.data;
          if (data && data.length > 0) { 
            let addRouter = filterAsyncRouter(data); //引用转化component，生成路由表格式
            dispatch('GenerateRoutes', addRouter).then(() => {
            	resolve(addRouter);
            });
          } else {
            reject('路由列表获取失败');
          }
        }).catch(error => {
          reject(error);
        })
      })
    }
  },
  getters: {
    role_routers: state => state.routers,
    addRouters: state => state.addRouters,
  }
}

export default routerList
