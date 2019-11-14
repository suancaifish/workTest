import request from '@/utils/request';
const config = require('@/config/');

export function sendLink (data) {
	return request({
		api: 'batchTask/sendLink',
		method: 'post',
		data: data
	})
}

export function listForPage (data) {
	return request({
		api: 'batchTask/list_for_page',
		method: 'post',
		data: data
	})
}
