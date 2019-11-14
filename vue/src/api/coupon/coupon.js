import request from '@/utils/request';
const config = require('@/config/');

// 获取优惠券列表
export function getAllCoupon(data) {
	return request({
		api: 'coupon/getAllCoupon',
		method: 'post',
		data: data
	})
}

// 获取优惠券列表
export function syncCoupon(data) {
	return request({
		api: 'coupon/syncCoupon',
		method: 'post',
		data: data
	})
}
