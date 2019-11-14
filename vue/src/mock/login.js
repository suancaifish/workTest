const menuList = [{
  "id": 39,
  "path": "/admin",
  "component": "Main",
  "redirect": "/user",
  "name": "Admin",
  "type": 1,
  "meta": {
		"title": "账户管理",
		"icon": "icon-yonghuguanli"
  },
  "perms": "admin:",
  "parent_id": 0,
  "children": [{
    "id": 40,
    "path": "/user",
    "component": "admin/user/index",
    "name": "User",
    "type": 1,
    "meta": {
      "title": "用户管理",
      "icon": "icon-yonghuguanli1"
    },
    "perms": "user:list",
    "parent_id": 39
  },
  {
    "id": 41,
    "path": "/role",
    "component": "admin/role/index",
    "name": "Role",
    "type": 1,
    "meta": {
      "title": "角色管理",
      "icon": "icon-quanxian2"
    },
    "perms": "role:search",
    "parent_id": 39
    },
    {
      "id": 42,
      "path": "/menu",
      "component": "admin/menu/index",
      "name": "Menu",
      "type": 1,
      "meta": {
        "title": "菜单管理",
        "icon": "icon-caidanguanli"
      },
      "perms": "menu:list",
      "parent_id": 39
    }
  ]
}]

export default {
    login: config => {
        return {
            "costTime": 244,
            "result": {
                "status": 1,
                "errorcode": 0
            },
            "data": {
                "access_token": "1053483915118817281"
            }
        }
    },
    getUserMenu: config => {
        return {
            result: {
                "status": 1,
                "errorcode": 0
            },
            data: menuList
        }
    },
    logout: () => {
        return {
            result: {
                status: 1
            }
        }
    }
}
