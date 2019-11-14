
/**
 * 配置编译环境和线上环境之间的切换
 * REQUEST_URL: 域名地址
 * HOME_NAME: 默认打开的首页的路由name值，默认为home
 * PROJECT_NAME: 域的根目录
 * SERVICE: SERVICE 服务
 * WITH_OUT_COOKIE: 退出登录不清除的cookie
 */
let config = {
    REQUEST_URL: process.env.VUE_APP_API_BASE,
    SECURITY_REQ_URL: (process.env.VUE_APP_API_SECURITY_URL ? process.env.VUE_APP_API_SECURITY_URL : process.env.VUE_APP_API_BASE) + process.env.VUE_APP_API_SECURITY,
    HOME_NAME: 'home',
    PROJECT_NAME: '/el-manager',
    SERVICE: '/el-manager',
    WITH_OUT_COOKIE: ['sidebarStatus'],
}

module.exports = config;
