const mockTableData = [{
        "id": 2,
        "name": "A",
        "parentId": 0,
        "parentName": "-",
        "icon": "www.",
        "orderNum": 1,
        "url": "A/index",
        "perms": "user:listA",
        "children": [{
                "id": 7,
                "name": "AA",
                "parentId": 2,
                "parentName": "A",
                "icon": "",
                "orderNum": 1,
                "url": "A/A/index",
                "perms": "user:listAA",
                "children": [{
                    "id": 9,
                    "name": "AAA",
                    "parentId": 7,
                    "parentName": "AA",
                    "icon": "",
                    "orderNum": 1,
                    "url": "A/A/A/index",
                    "perms": "user:listAAA"
                }]
            },
            {
                "id": 8,
                "name": "AB",
                "parentId": 2,
                "parentName": "A",
                "icon": "",
                "orderNum": 2,
                "url": "A/B/index",
                "perms": "user:listAB",
                "children": [{
                    "id": 10,
                    "name": "ABA",
                    "parentId": 8,
                    "parentName": "AB",
                    "icon": "",
                    "orderNum": 2,
                    "url": "A/B/A/index",
                    "perms": "user:listABA"
                }]
            }
        ]
    },
    {
        "id": 3,
        "name": "B",
        "parentId": 0,
        "parentName": "-",
        "icon": "",
        "orderNum": 2,
        "url": "B/index",
        "perms": "user:listB",
        "children": [{
                "id": 11,
                "name": "BA",
                "parentId": 3,
                "parentName": "B",
                "icon": "",
                "orderNum": 1,
                "url": "B/A/index",
                "perms": "user:listBA"
            },
            {
                "id": 12,
                "name": "BB",
                "parentId": 3,
                "parentName": "B",
                "icon": "",
                "orderNum": 2,
                "url": "B/B/index",
                "perms": "user:listBB"
            },
            {
                "id": 13,
                "name": "BC",
                "parentId": 3,
                "parentName": "B",
                "icon": "",
                "orderNum": 3,
                "url": "B/C/index",
                "perms": "user:listBC",
                "children": [{
                    "id": 14,
                    "name": "BCA",
                    "parentId": 13,
                    "parentName": "BC",
                    "icon": "",
                    "orderNum": 1,
                    "url": "B/C/A/index",
                    "perms": "user:listBCA"
                }]
            }
        ]
    },
    {
        "id": 4,
        "name": "C",
        "parentId": 0,
        "parentName": "-",
        "icon": "",
        "orderNum": 3,
        "url": "C/index",
        "perms": "user:listC"
    },
    {
        "id": 5,
        "name": "D",
        "parentId": 0,
        "parentName": "-",
        "icon": "",
        "orderNum": 4,
        "url": "D/index",
        "perms": "user:listD"
    },
    {
        "id": 6,
        "name": "E",
        "parentId": 0,
        "parentName": "-",
        "icon": "",
        "orderNum": 5,
        "url": "E/index",
        "perms": "user:listE"
    }
]

const mockPermsData = [{
        "id": 2,
        "name": "A",
        "parentId": 0,
        "isChoose": 0,
        "children": [{
                "id": 7,
                "name": "AA",
                "parentId": 2,
                "isChoose": 0,
                "children": [{
                    "id": 9,
                    "name": "AAA",
                    "parentId": 7,
                    "isChoose": 0
                }]
            },
            {
                "id": 8,
                "name": "AB",
                "parentId": 2,
                "isChoose": 0,
                "children": [{
                    "id": 10,
                    "name": "ABA",
                    "parentId": 8,
                    "isChoose": 0
                }]
            }
        ]
    },
    {
        "id": 3,
        "name": "B",
        "parentId": 0,
        "isChoose": 1,
        "children": [{
                "id": 11,
                "name": "BA",
                "parentId": 3,
                "isChoose": 0
            },
            {
                "id": 12,
                "name": "BB",
                "parentId": 3,
                "isChoose": 1
            },
            {
                "id": 13,
                "name": "BC",
                "parentId": 3,
                "isChoose": 1,
                "children": [{
                    "id": 14,
                    "name": "BCA",
                    "parentId": 13,
                    "isChoose": 1
                }]
            }
        ]
    },
    {
        "id": 4,
        "name": "C",
        "parentId": 0,
        "isChoose": 0
    },
    {
        "id": 5,
        "name": "D",
        "parentId": 0,
        "isChoose": 0
    },
    {
        "id": 6,
        "name": "E",
        "parentId": 0,
        "isChoose": 0
    }
];

export default {
    list_for_table: config => {
        return {
            result: {status: 1},
            data: mockTableData
        }
    },
    list_Menu_for_perms: config => {
        return {
            result: {status: 1},
            data: mockPermsData
        }
    }
}
