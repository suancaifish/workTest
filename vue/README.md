# 后台管理系统
## 安装node 
```
版本：8.x-9.x 可用nvm进行node版本管理
```
## Project setup
```
cnpm install （也可使用淘宝npm镜像）
```
## 全局安装 可使用 vue ui 进行可视化管理
npm install -g @vue/cli

### 本地开发环境启动
```
cnpm run serve
```

### 生产环境打包
```
cnpm run build
```
### 测试环境打包
```
cnpm run stage
```
### 新建页面（需在权限管理处创建页面）
```
npm run create 
或
npm run create:open (页面创建完成后运行工程))
```
--------------------------------------------------------

## 目录结构
```
├── .env文件       环境配置文件（开发环境：development; 测试环境: stage; 生成环境: production）
├── vue.config.js  编译入口配置文件 （webpack相关自定义配置）
├── public         打包所需静态资源
└── src
    ├── api      接口管理,每个模块的接口独立一个js文件
    ├── assets   项目静态资源
        ├── icons   自定义图标资源
        ├── images  图片资源
        └── icon.js 图标详情   
    ├── components  公共组件
    ├── config   项目全局相关配置
    ├── errorLog 报错记录
    ├── filters  全局过滤函数
    ├── mock     模拟数据
    ├── router   路由配置
        ├── _import_development  开发环境引入路由页面（无懒加载）
        ├── _import_production   生产环境引入路由页面（懒加载）
        ├── formatRouter         路由动态引入格式化
        ├── index                路由路径管理
        └── role                 路由处理，权限拦截，动态路由获取  
    ├── store    Vuex配置（全局数据响应式管理）
    ├── styles   样式管理
        ├── element-ui  element-ui样式的全局调整
        ├── index 全局通用样式
        ├── transition 全局通用动画样式
        └── variables 整体颜色风格样式
    ├── utils
        ├── request 请求函数（请求配置，预处理，响应处理）
        ├── util 通用工具函数
        └── validate 正则函数
    ├── view  页面文件
        └── main（index） 父容器入口
            ├── sidebar 侧边栏
            ├── appMain 右边显示区域（控制显示缓存）
            ├── navbar  右边头部
            └── tagView 标签栏
    ├── App.vue 页面顶层入口
    ├── main.js 入口初始化文件
    └── tests  测试相关
```
## Notice
### 路由权限增加流程：
   ```flow
    st=>start: 开始
    opEntry=>operation: 用户管理=>菜单管理=>新增or增加
    cond=>condition: 菜单or按钮?
    opMenu=>operation: 
        菜单：
        1. 名称：    对应页面的名称（侧边栏，面包屑）
        2. 页面url:  如果为父级则填父级文件夹名(例:admin)，如果为页面则填页面文件（例:admin/user/index）
        3. 路由:     如果为父级则填父级文件夹名(例:admin)，如果为页面则填页面文件名(例:user)
        4. 授权标示： 菜单统一为路由名加:list, 例: admin:list
        5. 图标:     图标选择
        6. 上级菜单:  页面一级则不填，子页面则选择对应的父级
        7. 排序:      1 or 0 （暂无用处）
    opButton=>operation:  
        按钮： 
        1. 名称：    对应按钮的名称
        2. 授权标示: 对应按钮的权限，route:role , 如user页面下的新增按钮:  user:add（add对应按钮的权限，在按钮组件ButtonList有对应的权限控制）
        3. 上级菜单： 对应的按钮页面
    opRole=>operation: 角色管理=>权限=>勾选对应新增的权限
    e=>end

    st->opEntry->cond
    cond(菜单)->opMenu->opRole->e
    cond(按钮)->opButton->opRole->e

    &```
   
   
   

