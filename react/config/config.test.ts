// 测试环境变量
export default {
	define: {
		'PROCESS_ENV': {
			APP_API_BASE: "/el-manager",
			APP_API_BASE_URL: "http://test.yingzhongshare.com",
			APP_API_SECURITY: "/yingzhong-security",
			APP_API_SECURITY_URL: "http://test.yingzhongshare.com",
			APP_API_SUBSYSTEMID: 341,
			NODE_ENV: "test"
		}
	}
}
