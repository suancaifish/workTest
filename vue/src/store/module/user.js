import { login, logout, localLogout } from '@/api/login';
const config = require('@/config/');
import * as utils from '@/utils/util';
const user = {
	state: {
		userInfo: '',
		token: utils.getToken(),
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			state.token = token;
		},
		SET_USERINFO: (state, userInfo) =>{
			state.userInfo = userInfo;
		},
	},

  actions: {
    // 用户登录
    login({ commit }, userInfo) {
			let username = userInfo.username.trim();
			let password = utils.getmd5(userInfo.password.trim());
			return new Promise((resolve, reject) => {
				login({username, password}).then(response => {
					const data = response.data; 
					commit('SET_TOKEN', data.access_token);
					commit('SET_USERINFO', data);
					utils.setToken(data.access_token); //本地保存token
					utils.setUserInfo(data); //本地保存用户信息
					resolve();
				}).catch(error => {
					reject(error);
				})
			})
    },
    // 服务端登出
    LogOut({ commit, state, dispatch}) {
		return new Promise((resolve, reject) => {
			(async function(){
				// await localLogout();
				logout(state.token).then(() => {
					commit('SET_TOKEN', '');
					commit('SET_USERINFO', {});
					dispatch('GenerateRoutes', []);
					dispatch('delAllViews');
					utils.Cookie.clearAllCookie(config.WITH_OUT_COOKIE);
					utils.removeToken();
					utils.removeUserInfo();
					resolve();
				}).catch(error => {
					reject(error);
				})
			})()
		})
    },
    FedLogOut({ commit,dispatch }) {
		return new Promise(resolve => {
			commit('SET_TOKEN', '');
			commit('SET_USERINFO', {});
			dispatch('GenerateRoutes', []);
			dispatch('delAllViews');
			utils.Cookie.clearAllCookie(config.WITH_OUT_COOKIE);
			utils.removeToken();
			utils.removeUserInfo();
			resolve();
		})
    },

  },
  getters: {
    token: state => state.token,
  }
}

export default user
