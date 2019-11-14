import * as login from './login'; //登陆接口
import * as commodityList from './commodity/commodityList'; //商品列表
import * as commodityEdit from './commodity/commodityEdit'; //商品编辑
import * as order from './order/order'; //订单列表
import * as batchTask from './batchTask/batchTask'; //批量铺货
import * as freight from './logisticsManage/freight'; // 运费管理
import * as coupon from './coupon/coupon'; //优惠券
let api = {
    login,
    commodityList,
    commodityEdit,
    order,
    batchTask,
    freight,
	coupon
}

export default api;
