import request from '@/utils/request';
const config = require('@/config/');

// 保存模板
export function save(data) {
    return request({
        api: 'post/save',
        method: 'post',
        data: data
    })
}

// 修改模板
export function update_template(data) {
    return request({
        api: 'post/update_template',
        method: 'post',
        data: data
    })
}


// 删除模板
export function delete_template(data) {
    return request({
        api: 'post/delete_template',
        method: 'post',
        data: data
    })
}

// 删除配送区间
export function delete_delivery(data) {
    return request({
        api: 'post/delete_delivery',
        method: 'post',
        data: data
    })
}

// 更新配送区间
export function update_delivery(data) {
    return request({
        api: 'post/update_delivery',
        method: 'post',
        data: data
    })
}

// 新增配送区间
export function add_delivery(data) {
    return request({
        api: 'post/add_delivery',
        method: 'post',
        data: data
    })
}

// 分页查询
export function list_for_page(data) {
    return request({
        api: 'post/list_for_page',
        method: 'post',
        data: data
    })
}

// 获取所有省市（无参）
export function getAllAddress(data) {
    return request({
        api: 'post/getAllAddress',
        method: 'post',
        data: data
    })
}

