export const columns = [
    {
        label: "商品名称/ID",
        value: "1",
        width: 6
    },
    {
        label: "产品（规格）ID",
        value: "2",
        width: 3
    },
    {
        label: "单价/数量",
        value: "3",
        width: 2
    },
    {
        label: "收货人/电话",
        value: "4",
        width: 2
    },
    {
        label: "订单金额",
        value: "5",
        width: 2
    },
    {
        label: "订单类型",
        value: "6",
        width: 2
    },
    {
        label: "订单状态",
        value: "7",
        width: 2
    },
	{
		label: "1688账号",
		value: "8",
		width: 2
	}
]

export const resultOption = [
    {
        label: '审核未处理',
        value: 0
    },
    {
        label: '审核通过',
        value: 1
    },
    {
        label: '审核不通过',
        value: 2
    }
]

export const orderStatus = [
    {
        label: '交易已取消',
        value: 5
    },
    {
        label: '交易已关闭',
        value: 6
    },
    {
        label: '待买家付款',
        value: 10
    },
    {
        label: '买家已付款',
        value: 15
    },
    {
        label: '待系统订货',
        value: 20
    },
    {
        label: '待卖家发货',
        value: 25
    },
    {
        label: '卖家已发货',
        value: 26
    },
    {
        label: '买家已收货',
        value: 27
    },
    {
        label: '交易已完成',
        value: 30
    },
    {
        label: '取消订货',
        value: 32
    }
]

export const cargoAccountOpt = [
	{
		label: 'vipgift888',
		value: 'vipgift888'
	},
	{
		label: 'xmiles',
		value: 'xmiles'
	},
	{
		label: 'Xmiles2',
		value: 'Xmiles2'
	}
]


export const orderType = [
    {
        label: '普通',
        value: 1
    },
    {
        label: '拼团',
        value: 2
    },
	{
		label: '积分兑换',
		value: 3
	},
	{
		label: '游戏兑换',
		value: 4
	},
]

export const remindStatusOpt = [
	{
		label: '是',
		value: true
	},
	{
		label: '否',
		value: false
	},
]

export const refundStatus = [
	{
		label: '买家已经申请退款，等待卖家同意',
		value: 1
	},
	{
		label: '卖家拒绝退款',
		value: 10
	},
	{
		label: '卖家已经同意退货，等待买家退货',
		value: 20
	},
	{
		label: '买家已经退货，等待卖家确认收货',
		value: 30
	},
	{
		label: '卖家未收到货,拒绝退款',
		value: 40
	},
	{
		label: '退款关闭',
		value: 50
	},
	{
		label: '退款成功',
		value: 60
	}
]

