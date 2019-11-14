import router from './index';
import store from '@/store';
import {
	Message
} from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import {
	getToken,
	SessionLocal
} from '@/utils/util';

NProgress.configure({
	showSpinner: false
});

const whiteList = ['/login'] // 不重定向白名单
const notSaveRouteArr = ['/404', '/401', '/login']; //不保存路由 ,用于动态路由刷新

router.beforeEach((to, from, next) => {
	NProgress.start();
	if (getToken()) {
		/* has token*/
		if (to.path === '/login') {
			next({
				path: '/'
			})
			NProgress.done() // 如果当前页面是home，将不会在每个钩子之后触发，所以手动处理它
		} else {
			if (store.getters.addRouters.length === 0) { // 动态路由列表没有
				store.dispatch('GetUserMenu').then(() => { // 拉取路由列表并添加生成可访问的路由表
					let lastRouterPath = SessionLocal.getItem('lastRouterPath');
					if (lastRouterPath) { //处理刷新动态路由重载空白页的问题
						let presentPath = getPresentPath(window.location.href, '/');
						if (lastRouterPath == presentPath) {
							return next({
								path: lastRouterPath,
								replace: true
							})
						}
					}
					next({
						...to,
						replace: true
					}) //设置替换：为true导航就不会留下历史记录
				}).catch((err) => {
					store.dispatch('LogOut').then(() => {
						Message.error(err || '列表查询失败，请重新登录');
						next({
							path: '/'
						})
					})
				})
			} else {
				next()
			}
		}
	} else {
		/* has no token*/
		if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
			next()
		} else {
			if (to.query.LogOut) { //如果登出则不重定向
				next(`/login`);
			} else {
				next(`/login?redirect=${to.path}`); // 否则全部添加重定向
			}
			NProgress.done();
		}
	}
})

router.afterEach((to) => {
	if (!notSaveRouteArr.includes(to.path)) {
		SessionLocal.setItem('lastRouterPath', to.path); //临时会话保存上一次的路由路径，用于刷新路由重定向
	}
	NProgress.done();
})

let getPresentPath = (str, persentStr) => str.slice(str.lastIndexOf(persentStr)) //取到浏览器出现网址的最后"/"出现的后边的字符
