export const columns = [
    {
        label: "图片",
        value: "sourceImg",
        custom: true,
        width: 140
    },
    {
        label: "商品名称",
        value: "sourceName",
        width: 150
    },
    {
        label: "商品ID",
        value: "sourceId",
        width: 120
    },
    {
        label: "销售价",
        value: "sourcePrice",
        width: 100
    },
    {
        label: "成本价",
        value: "costPrice",
        width: 100
    },
    {
        label: "库存",
        value: "inventory",
        width: 100
    },
    {
        label: "30天销量",
        value: "sellAmountOf30Day",
        width: 100
    },
    {
        label: "店铺",
        value: "storeName",
        width: 100
    }
]


export const createTimeColumn = {
    label: "创建时间",
    value: "createTime",
    width: 160
}

export const issueTimeColumn = {
    label: "上架时间",
    value: "issueTime",
    width: 160
}

export const modalData = [{
    label: '活动一',
    value: 1,
    children: [{
        value: 11,
        label: '渠道一（1.1）'
    }, {
        value: 12,
        label: '渠道二（1.2）',

    }, {
        value: 13,
        label: '渠道三（1.3）',

    }]
},
{
    label: '活动二',
    value: 2,
    children: [{
        value: 5,
        label: '渠道一（2.1）',

    }, {
        value: 6,
        label: '渠道二（2.2）',

    }, {
        value: 7,
        label: '渠道三（2.3）',

    }]
},
{
    label: '活动三',
    value: 3,
    children: [{
        value: 8,
        label: '渠道一（3.1）',

    }, {
        value: 9,
        label: '渠道二（3.2）',

    }, {
        value: 15,
        label: '渠道三（3.3）',

    }]
},
]