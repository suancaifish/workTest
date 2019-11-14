const config = require('@/config/');
import axios from "axios";
import Message from "_c/message";
import router from "@/router/index";
import store from "@/store/index";
import { getToken , CommonUtils} from '@/utils/util';
// 创建axios实例
const service = axios.create({
    baseURL: config.REQUEST_URL, // api的request_url
    timeout: 60000 * 3// 请求超时时间
});

// request拦截器
service.interceptors.request.use(
	cfg => {
			cfg.url = urlFormat(cfg);
			cfg.data = dataFormat(cfg);
			let token = getToken();
			if (!CommonUtils.isEmptyOrNull(token)) {
				cfg.headers.token = `${token}`;
			}
			console.log('request',cfg);
		return cfg;
	},
	error => {
		Promise.reject(error);
	}
);

// respone拦截器
service.interceptors.response.use(
	response => {
		const data = response.data;
		if(CommonUtils.isEmptyOrNull(data.result)){
			return data;
		}
		if (data.result.status == -401) {
			Message(data.result.msg,'error');
			router.push(
				{ path: '/401', replace: true, query: { noGoBack: true }}
			);
			return Promise.reject(data.result.msg);
		}else if(data.result.status == -402){
			Message(data.result.msg,'error');
			store.dispatch('FedLogOut').then(() => {
				setTimeout(()=>{
					if(window.self != window.top){ //嵌入iframe
						window.parent.loginOut();
					}else{
						location.reload();
					}
				},1500)
			})
			return Promise.reject(data.result.msg);
		}else if(data.result.status == 0){
			Message(data.result.msg,'error');
			return Promise.reject(data.result.msg);
		}else if(data.data && data.data.code == 1 && data.data.msg) {
			Message(data.data.msg,'error');
			return Promise.reject(data.data.msg);
		}
		console.log('response',data);
		return data;
	},
	error => {
		Message(error.message,"error",3 * 1000);
		return Promise.reject(error);
	}
);

/**
 * 格式化ulr
 *  fullUrl: url,           //选填，完整的链接，与service、api、funid互斥
    service: service,   //选填，默认值yingzhong_box_service
    api: api,           //选填，接口中api/后面的字符串，与funid互斥
    funid: funid,       //选填，接口中funid=后面的数字，与api互斥
 */
function urlFormat(cfg){
	let url;
	if (cfg.fullUrl) {
		url = cfg.fullUrl;
	} else{
		cfg.service = cfg.service || config.SERVICE;
		url = config.REQUEST_URL + cfg.service;
		if (cfg.api) {
			url += '/api/' + cfg.api;
		} else if (cfg.funid) {
			url += '/common?funid=' + cfg.funid + '&rd=' + Date.now();
		} else {
			throw new Error('api||funid is null');
		}
	}
	const proxyStr = process.env.VUE_APP_API_BASE.replace('/','');
	const reg = new RegExp(("\/" + proxyStr));
	if(process.env.NODE_ENV == 'development') url = url.replace(reg, ''); //开发环境代理时替换掉
	return url;
}

function dataFormat(cfg){
	let data = '';
	if(cfg.form) {
		if( store.getters.breadCrumb.length > 0) cfg.data.append('breadcrumb_data',store.getters.breadCrumb);
		data = cfg.data;
	}else {
		cfg.data = cfg.data ? cfg.data : {};
		if(store.getters.breadCrumb.length > 0) cfg.data.breadcrumb_data = store.getters.breadCrumb;
		data = {
			"shandle": 0,
			"handle": 0,
			"data": cfg.data
		}
	}
	return data;
}


export default service;
