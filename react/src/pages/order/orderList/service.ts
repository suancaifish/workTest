import request from '@/utils/request';

export async function query(data: any) {
	return request({
		api: 'order/list_for_page',
      	method: 'post',
		data: data
	})
}