import request from '@/utils/request';
import { getUserInfo } from '@/utils/util';
const config = require('@/config/');

function formatData (data) {
    let obj = {
        "sourceType": 5,
        "productType": 1
    }
    return Object.assign(obj, data)
}

// 查询skuId的规格列表接口
export function listSkuProperties(data) {
    return request({
        api: 'goodsManagerController/listSkuProperties',
        method: 'post',
        data: formatData(data)
    })
}

// 获取商品的详细信息接口
export function getSourceDetail(data) {
    return request({
        api: 'goodsManagerController/getSourceDetail',
        method: 'post',
        data: formatData(data)
    })
}

// 上传图片接口
export const uploadImgUrl = config.REQUEST_URL + '/el-manager/api/uploadImgController/upload';

// 创建商品接口
export function createSource(data) {
    return request({
        api: 'goodsManagerController/createSource',
        method: 'post',
        data: formatData(data)
    })
}

// 更新商品接口
export function updateSource(data) {
    return request({
        api: 'goodsManagerController/updateSource',
        method: 'post',
        data: formatData(data)
    })
}

// 获取所有运费模板(下拉框)
export function all_postTemplate(data) {
    return request({
        api: 'post/all_postTemplate',
        method: 'post',
        data: data
    })
}

// 获取单个运费模板(下拉框)
export function get_template_by_id(data) {
    return request({
        api: 'post/get_template_by_id',
        method: 'post',
        data: data
    })
}

// 查询类目的所有属性信息接口
export function listAttributeOf(data) {
    return request({
        api: 'goodsManagerController/getListAttributeOf',
        method: 'post',
        data: data
    })
}

// 创建类目属性接口
export function createAttribute(data) {
    return request({
        api: 'goodsManagerController/createAttribute',
        method: 'post',
        data: data
    })
}

// 创建类目属性值接口
export function createAttributeVal(data) {
    return request({
        api: 'goodsManagerController/createAttributeVal',
        method: 'post',
        data: data
    })
}