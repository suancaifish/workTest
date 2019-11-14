export const columns = [
    {
        label: "起购数量",
        value: "minBuyAmount",
        width: 120,
        fixed: 'right',
        input: 'minBuyAmount',
        onlyNumbel: "minBuyAmount",
        inputType: 'number',
        tipsFormat: 'minBuyAmount'
    },
    {
        label: "库存",
        value: "inventory",
        width: 90,
        fixed: 'right',
        input: 'inventory',
        inputType: 'number',
        headerFormat: true
    },
    {
        label: "成本价",
        value: "costPrice",
        width: 90,
        fixed: 'right',
        input: 'costPrice',
        inputType: 'number',
        headerFormat: true
    },
    {
        label: "销售价",
        value: "sourcePrice",
        width: 90,
        fixed: 'right',
        input: 'sourcePrice',
        inputType: 'number',
        headerFormat: true
    },
    {
        label: "产品规格ID",
        value: "storeSkuId",
        width: 120,
        fixed: 'right',
        input: 'storeSkuId',
        headerFormat: true
    },
    {
        label: "组合数量",
        value: "combinationAmount",
        width: 120,
        fixed: 'right',
        input: 'combinationAmount',
        tipsFormat: 'combinationAmount',
        inputType: 'number',
        onlyNumbel: "combinationAmount"
    }
]