import crypto from 'crypto'; // 加密
import saveAs from 'file-saver';
export const CommonUtils = {
	isEmptyOrNull(v) { // 判断字符串是否为空
		return typeof (v) === 'undefined' || v === '' || v == null ? true : false;
	},
	isObject(v) { // 判断是否为对象
		if (Object.prototype.toString.call(v) == '[object Array]') {
			return false;
		}
		return typeof (v) === 'object' || v != null ? true : false;
	},
	isArray(v) { // 判断是否为数组
		return Object.prototype.toString.call(v) === '[object Array]';
	},
	isNodeList(v) { // 判断是否为节点集
		return Object.prototype.toString.call(v) === '[object NodeList]';
	},
	isInputElement(v) { // 判断是否为input元素
		return Object.prototype.toString.call(v) === '[object HTMLInputElement]';
	},
	isFunction(v) { // 判断是否为函数
		return typeof (v) === 'function';
	},
	isNumber(v) { // 判断是否为数字
		return typeof (v) === 'number';
	},
	isString(v) { // 判断是否为字符串
		return typeof (v) === 'string';
	},
	isExternal(path) {
		return /^(https?:|mailto:|tel:)/.test(path)
	},
	/**
	 * @param {*} obj1 对象
	 * @param {*} obj2 对象
	 * @description 判断两个对象是否相等，这两个对象的值只能是数字或字符串
	 */
	objEqual(obj1, obj2) {
		const keysArr1 = Object.keys(obj1)
		const keysArr2 = Object.keys(obj2)
		if (keysArr1.length !== keysArr2.length) return false
		else if (keysArr1.length === 0 && keysArr2.length === 0) return true
		else return !keysArr1.some(key => obj1[key] != obj2[key])
	},
	hasChild(item) {
		return item.children && item.children.length !== 0
	},
	/**
	 * @param {Array} target 目标数组
	 * @param {Array} arr 需要查询的数组
	 * @description 判断要查询的数组是否至少有一个元素包含在目标数组中
	 */
	hasOneOf(targetarr, arr) {
		return targetarr.some(_ => arr.indexOf(_) > -1)
	},
	/**
	 * @param {String} url
	 * @description 从URL中解析参数
	 */
	getParams(url) {
		const keyValueArr = url.split('?')[1].split('&');
		let paramObj = {}
		keyValueArr.forEach(item => {
			const keyValue = item.split('=')
			paramObj[keyValue[0]] = keyValue[1]
		})
		return paramObj
	},
	/**
	
	 * @param {Number} times 回调函数需要执行的次数
	 * @param {Function} callback 回调函数
	 */
	doCustomTimes(times, callback) {
		let i = -1
		while (++i < times) {
			callback(i)
		}
	},
	/**
	 * @description 抽取并格式化时间
	 * @param {Array} dateArr 时间数组[start,end]
	 * @param {Number} index 格式化位置下标
	 */
	formatDateArr(dateArr, index) {
		if (Array.isArray(dateArr) && dateArr.length > 0) {
			return index == 0 ? new Date(dateArr[index]).Format('yyyy/MM/dd') + ' 00:00:00' : new Date(dateArr[index]).Format('yyyy/MM/dd') + ' 23:59:59';
		} else {
			return '';
		}
	},
	/**
	 * @description 格式化参数
	 * @param {Object} formData 查询参数
	 * @param {String} stateDate 开始时间参数字段
	 * @param {String} endDate 结束时间参数字段
	 */
	formatParams(formData, stateDate = 'start_date', endDate = 'end_date') {
        let params = JSON.parse(JSON.stringify(formData));
		params[stateDate] = CommonUtils.formatDateArr(params.dateTime, 0);
		params[endDate] = CommonUtils.formatDateArr(params.dateTime, 1);
		Object.keys(params).forEach((item) => {
			if (CommonUtils.isEmptyOrNull(params[item]) && params[item] !== 0 && params[item] !== "0") {
				delete params[item]
			}
		});
		return params;
	},
	/**
	 * @description 格式化参数大写
	 * @param {Object} formData 查询参数
	 */
	formatParamsUpper(formData) {
		let params = JSON.parse(JSON.stringify(formData));
		params.startDate = CommonUtils.formatDateArr(params.dateTime, 0);
		params.endDate = CommonUtils.formatDateArr(params.dateTime, 1);
		Object.keys(params).forEach((item) => {
			if (CommonUtils.isEmptyOrNull(params[item]) && params[item] !== 0) {
				delete params[item]
			}
		});
		return params;
	},
	// 判断对象属性值是否皆为空
	judgeObjNull(obj) {
		let count = 0;
		let objLength = Object.keys(obj);
		for (let key in obj) {
			if (!obj[key] && (obj[key] !== 0 && obj[key] !== "0")) {
				count++
			}
		}
		return count >= objLength.length
	},

	// 判断对象属性值是否有为空
	judgeObjSomeNull(obj, arr = []) {
		for (let key in obj) {
			if (arr.includes(key)) {
				continue;
			}
			if (!obj[key] && (obj[key] !== 0 && obj[key] !== "0")) {
				return true
			}
		}
		return false;
	},

	// 判断数组对象属性是否皆为空
	judgeArrNull(arr) {
		for (let i = 0; i < arr.length; i++) {
			console.log(arr[i])
			if (!arr[i]) {
				return true;
			} else {
				let flag = this.judgeObjSomeNull(arr[i]);
				if (flag) return true;
			}
		}
		return false;
	},
	/**
	 * @description 格式化单个日期参数
	 * @param {Date,String}
	 */
	formatDate(date, format = 'yyyy/MM/dd HH:mm:ss') {
		if (!date) return null;
		if (Array.isArray(date)) {
			return [new Date(date[0]).Format(format), new Date(date[1]).Format(format)]
		}
		return new Date(date).Format(format);
	},
	/**
	 * @description 金额四舍五入，千位分隔
	 * @param {*} current
	 * @returns
	 */
	numberFormatter(current) {
		current *= 1;
		if (CommonUtils.isNumber(current)) {
			let num = Math.round(current);
			return Math.abs(num) < 1000 ? num : num.toString().replace(/(\d)(?=(?:\d{3}[+]?)+$)/g, '$1,');
		} else {
			return current;
		}
	},
	/**
	 * @description 最多保留两位
	 * @param {String} val
	 * @returns
	 */
	keepTwo(val) {
		if (!CommonUtils.isString(val)) {
			return val
		}
		let pointIndex = val.indexOf('.');
		let isFloat = pointIndex != -1;
		if (isFloat && val.length > pointIndex + 2 + 1) {
			val = val.substring(0, pointIndex + 2 + 1);
		}
		return val;
	},

	//将base64转换为blob
	dataURLtoBlob(dataurl) {
		let arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {
			type: mime
		});
	},
	//将blob转换为file
	blobToFile(base64Data, fileName) {
		let theBlob = this.dataURLtoBlob(base64Data);
		theBlob.lastModifiedDate = new Date();
		theBlob.name = fileName;
		return theBlob;
	},

	// 函数节流
	throttle(method, delay, duration) {
		let timer = null;
		let begin = new Date();
		return function () {
			let context = this,
				args = arguments;
			let current = new Date();
			clearTimeout(timer);
			if (current - begin >= duration) {
				method.apply(context, args);
				begin = current;
			} else {
				timer = setTimeout(() => {
					method.apply(context, args);
				}, delay);
			}
		}
	},

	/**
	 * 深层对象获取
	 * @param {*} obj 传入需要获取的对象数组
	 * @param {*} paths 路径，['a', 'b', 'c', 'd'] || 'a.b.c.d' || '0.a.1.b'
	 * @returns 获取后的对象属性，如果没有返回undefined
	 */
	getDeepObj(obj, paths) {

		if (typeof paths === 'string') {
			paths = paths.split('.');
		}

		function myReducer(arr, reducer, initVal) {
			for (let i = 0; i < arr.length; i++) {
				initVal = reducer(initVal, arr[i], i, arr);
			}
			return initVal
		}

		return myReducer(paths, (value, key) => {
			if (!value) {
				return undefined;
			}
			if (/^[0-9]+$/.test(key)) {
				key = Number(key)
			}
			return value[key];
		}, obj)
    },
    
    //获取count天前后的日期
    getTime(count){
        let dd = new Date();
        dd.setDate(dd.getDate() + count);   
        let year = dd.getFullYear();
        let mon = dd.getMonth() + 1;   
        let day = dd.getDate();
        return year + "/" + mon + "/" + day;
	},
	
	// 深拷贝
    deepCopy(obj) {
        function deepCopy(obj){
            let newObj = Array.isArray(obj) ? []: {}   //判断是深拷贝对象还是数组
            for(let i in obj){
                if(typeof obj[i] === 'object') {
                    newObj[i] = deepCopy(obj[i])    //  如果要拷贝的对象的属性依然是个复合类型，递归
                } else {
                    newObj[i] = obj[i]
                }
            }
            return newObj
        }

        return deepCopy(obj);
    }
}
export function copyToClipboard(content) {

	// 创建元素用于复制
	let aux = document.createElement("input");


	// 设置元素内容
	aux.setAttribute("value", content);

	// 将元素插入页面进行调用
	document.body.appendChild(aux);

	// 复制内容
	aux.select();

	// 将内容复制到剪贴板
	document.execCommand("copy");

	// 删除创建元素
	document.body.removeChild(aux);

	//提示
	return "复制内容成功：" + aux.value;
}
export function download(data, fileName, contentType) {
	const file = new Blob([data], {
		type: contentType || 'application/octet-stream'
	});
	saveAs(file, fileName);
}
/**
 * @description md5加密
 * @param {String} str
 */
export function getmd5(str) {
	let encryption;
	let md5 = crypto.createHash("md5");
	md5.update(str);
	encryption = md5.digest('hex');
	return encryption;
}
/**
 * 
 * @param {String} url 
 */
export function param2Obj(url) {
	const search = url.split('?')[1]
	if (!search) {
		return {}
	}
	return JSON.parse(
		'{"' +
		decodeURIComponent(search)
		.replace(/"/g, '\\"')
		.replace(/&/g, '","')
		.replace(/=/g, '":"') +
		'"}'
	)
}

/**
 * @description 对Date的扩展，将 Date 转化为指定格式的String,
 *              月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *              年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字),
 *              例子:            
 *              (new Date()).Format("yyyy-MM-dd HH:mm:ss.S") ==> 2018-10-12 08:09:04.423
 *              (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2018-10-10 8:9:4.18
 * @param {*} fmt 
 */
Date.prototype.Format = function (fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"H+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		S: this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(this.getFullYear() + "").substr(4 - RegExp.$1.length)
		);
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
			);
	return fmt;
};

/**
 *
 *
 * @export
 * @param {Number} count //获取count天前后的日期
 * @returns
 */
export function getTime(count) {
	let dd = new Date();
	dd.setDate(dd.getDate() + count);
	let year = dd.getFullYear();
	let mon = dd.getMonth() + 1;
	let day = dd.getDate();
	return year + "/" + mon + "/" + day;
}
/**
 * @description 本地保存父类
 */
class StorageS {
	constructor(storage) {
		if (!storage) {
			return new Error('当前浏览器不支持本地存储...');
		}
		this.storage = storage;
	}
	setItem(key, value) { // 保存单个
		if (this.storage == null || CommonUtils.isEmptyOrNull(key) || CommonUtils.isEmptyOrNull(value) || !CommonUtils.isString(value)) {
			return;
		}
		this.storage.setItem(key, value);
	}
	getItem(key) { // 获取单个
		if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
			return null;
		}
		if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
			return null;
		}
		return this.storage.getItem(key);
	}
	setObj(key, value) { // 保存json对象
		if (this.storage == null || CommonUtils.isEmptyOrNull(key) || (CommonUtils.isEmptyOrNull(value) && !CommonUtils.isArray(value))) {
			return;
		}
		if (!CommonUtils.isObject(value) && CommonUtils.isString(value) && !CommonUtils.isArray(value)) {
			this.storage.setItem(key, value);
			return;
		}
		this.storage.setItem(key, JSON.stringify(value));
	}
	getObj(key) { // 获取json对象
		if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
			return null;
		}
		if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
			return null;
		}
		return JSON.parse(this.storage.getItem(key));
	}
	remove(key) { // 删除本地存储
		if (this.storage == null || CommonUtils.isEmptyOrNull(key)) {
			return true;
		}
		if (CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
			return true;
		}
		this.storage.removeItem(key);
		if (!CommonUtils.isEmptyOrNull(this.storage.getItem(key))) {
			return false;
		}
		return true;
	}
	clear() {
		this.storage.clear();
	}
}

// 本地存储对象
class LocalStorage extends StorageS {
	constructor() {
		super(window.localStorage);
	}
}
export const Storage = new LocalStorage();

// l临时会话存储对象
class SessionStorage extends StorageS {
	constructor() {
		super(window.sessionStorage);
	}
}
export const SessionLocal = new SessionStorage();

/**
 * @description 设置token
 */
export const setToken = (token) => {
	Storage.setItem("token", token);
}
/**
 * @description 获取token
 */
export const getToken = () => {
	return Storage.getItem("token");
}
/**
 * @description 删除token
 */
export const removeToken = () => {
	Storage.remove('token');
}

/**
 * @description 设置userInfo
 */
export const setUserInfo = (userInfo) => {
	Storage.setObj("userInfo", userInfo);
}
/**
 * @description 获取userInfo
 */
export const getUserInfo = () => {
	return Storage.getObj("userInfo");
}
/**
 * @description 删除userInfo
 */
export const removeUserInfo = () => {
	Storage.remove('userInfo');
}


/**
 * @description 设置addRouter
 */
export const setAddRouter = (addRouter) => {
	Storage.setObj("addRouter", addRouter);
}
/**
 * @description 获取addRouter
 */
export const getAddRouter = () => {
	return Storage.getObj("addRouter");
}
/**
 * @description 删除AddRouter
 */
export const removeAddRouter = () => {
	Storage.remove('addRouter');
}
/**
 * @description cookie类
 */
class CookieStorage {
	setCookie(name, value, time) {
		if (CommonUtils.isEmptyOrNull(name) || CommonUtils.isEmptyOrNull(value)) {
			return;
		}
		let date = new Date();
		let times = 0;
		if (time.charAt(0).toLowerCase() === 'd') { // 以天为单位
			times = parseInt(time.substr(1));
			date.setTime(date.getTime() + times * 24 * 60 * 60 * 1000);
		} else if (time.charAt(0).toLowerCase() === 'h') { // 以小时为单位
			times = parseInt(time.substr(1));
			date.setTime(date.getTime() + times * 60 * 60 * 1000);
		}
		document.cookie = name + '=' + escape(value) + ' ;expires=' + date.toGMTString();
	}
	getCookie(name) {
		if (CommonUtils.isEmptyOrNull(name)) {
			return;
		}
		let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
		let arr = document.cookie.match(reg);
		if (!CommonUtils.isArray(arr)) {
			return null;
		}
		return unescape(arr[2]);
	}
	clearCookie(name) {
		let cookie = this.getCookie(name);
		if (CommonUtils.isEmptyOrNull(name) || CommonUtils.isEmptyOrNull(cookie)) {
			return;
		}
		let date = new Date();
		date.setTime(date.getTime() - 1);
		document.cookie = name + '=' + cookie + ' ;expires=' + date.toGMTString();
	}
	clearAllCookie(withoutKey) {
		if (!CommonUtils.isEmptyOrNull(name) && !Array.isArray(withoutKey)) return;
		let withoutArr = withoutKey ? withoutKey : [];
		let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
		keys && keys.forEach(item => {
			if (!withoutArr.includes(item)) {
				document.cookie = item + '=0;expires=' + new Date(0).toUTCString();
			}
		})
	}
}
export const Cookie = new CookieStorage();

/**
 * @description 获取距离浏览器左侧的距离
 */
export const getOffsetLeft = (obj) => {
	let tmp = obj.offsetLeft;
	let val = obj.offsetParent;
	while (val != null) {
		tmp += val.offsetLeft;
		val = val.offsetParent;
	}
	return tmp;
}

/**
 * @description 获取距离浏览器顶部侧的距离
 */
export const getOffsetTop = (obj) => {
	let tmp = obj.offsetTop;
	let val = obj.offsetParent;
	while (val != null) {
		tmp += val.offsetTop;
		val = val.offsetParent;
	}
	return tmp;
}


/**
 * @description 获取获取几天后的时间
 * @param {Number} dayNumber 
 * @param {Date} date 
 */
export const addDay = (dayNumber, date) => {
	date = date ? date : new Date();
	let ms = dayNumber * (1000 * 60 * 60 * 24);
	let newDate = new Date(date.getTime() + ms);
	return newDate;
}

/**
 * @description 计算周一日期
 * @param {Date} date 
 * @param {Number} day 
 */
export const getTheDay = (date, day = 2) => {
	date = date ? date : new Date();
	//获取该天是周几
	let datnum = date.getDay();
	//调用addDay方法获取本周day new date
	console.log(date.getTime())
	let getdays = addDay(-datnum + day, date);
	console.log(getdays.getDay())
	//将得到的new date转换为时间
	let getday = getdays.getFullYear() + "-" + (getdays.getMonth() + 1) + "-" + getdays.getDate();
	return getday;
}

/**
 * 获取当前月的第一天
 */
export const getCurrentMonthFirst = (date) => {
	date = date ? date : new Date();
	date.setDate(1);
	return new Date(date.Format('yyyy-MM-dd'));
}
/**
 * 获取当前月的最后一天
 */
export const getCurrentMonthLast = (date) => {
	date = date ? date : new Date();
	let currentMonth = date.getMonth();
	let nextMonth = ++currentMonth;
	let nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
	let oneDay = 1000 * 60 * 60 * 24;
	return new Date(nextMonthFirstDay - oneDay);
}
