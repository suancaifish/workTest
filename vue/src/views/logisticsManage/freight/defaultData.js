export const columns = [
    {
        label: "模板名称",
        value: "templateName",
        width: 300
    },
    {
        label: "最后编辑时间",
        value: "updateTime",
        width: 100
    }
]

export const expandColumns = [
    {
        label: "可配送区域",
        value: "deliveryAreaMap",
        width: 300,
        align: 'left',
        parentCustom: true,
        custom: true
    },
    {
        label: "首件（个）",
        value: "firstNum",
        width: 70,
        custom: true
    },
    {
        label: "运费（元）",
        value: "firstFee",
        width: 70,
        custom: true
    },
    {
        label: "续件（个）",
        value: "secondNum",
        width: 70,
        custom: true
    },
    {
        label: "续费（元）",
        value: "secondFee",
        width: 70,
        custom: true
    }
]

export const areaOption = {
    'dongBei': '东北',
    'huaBei': '华北',
    'huaDong': '华东',
    'huaNan': '华南',
    'huaZhong': '华中',
    'xiBei': '西北',
    'xiNan': '西南'
}
