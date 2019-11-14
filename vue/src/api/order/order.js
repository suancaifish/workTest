import request from '@/utils/request';
const config = require('@/config/');

function formatData (data) {
    let obj = {
        "sourceType": 5,
        "productType": 1
    }
    return Object.assign(obj, data)
}

// 获取订单列表
export function listForPage(data) {
    return request({
        api: 'order/list_for_page',
        method: 'post',
        data: data
    })
}

// 导出订单列表
export function export_order(data) {
	return request({
		api: 'order/order_export',
		method: 'post',
		data: data,
		responseType:'arraybuffer',
		headers: {
			Accept: 'application/vnd.ms-excel,*/*'
		}
	})
}


// 批量订货
export function batch_order(data) {
    return request({
        api: 'order/batch_order',
        method: 'post',
        data: data
    })
}

// 获取订单
export function getOrder(data) {
    return request({
        api: 'order/getOrder',
        method: 'post',
        data: data
    })
}

// 退款
export function refund_order(data) {
    return request({
        api: 'order/refund_order',
		method: 'post',
		data: data,
		headers: {
			"Content-Type":"multipart/form-data",
		},
		form: true
    })
}

// 拒绝退款
export function reject_refund_order(data) {
	return request({
		api: 'order/reject_refund_order',
		method: 'post',
		data: data,
		headers: {
			"Content-Type": "multipart/form-data",
		},
		form: true
	})
}

/**
 * @description 模板
 * @param {Object} data
 */
export const order_demo = config.REQUEST_URL + '/el-manager/api/order/refund-order-demo.xls';

/**
 * @description 导入
 * @param {Object} data
 */
export const order_import_url = config.REQUEST_URL + '/el-manager/api/order/batch_refund_order';

/**
 * @description 模板
 * @param {Object} data
 */
export const reject_order_demo = config.REQUEST_URL + '/el-manager/api/order/reject-refund-order-demo.xls';

/**
 * @description 导入
 * @param {Object} data
 */
export const reject_refund_import_url = config.REQUEST_URL + '/el-manager/api/order/batch_reject_refund_order';

