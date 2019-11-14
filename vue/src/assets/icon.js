const iconList = [
	{
		name: "默认图标",
		icon: "icon-morentubiao"
	},
	{
		name: "文件",
		icon: "icon-wenjian"
	},
	{
		name: "文件夹--展开",
		icon: "icon-wenjianjia"
	},
	{
		name: "文件夹",
		icon: "icon-folder"
	},
	{
		name: "调试",
		icon: "icon-tiaoshi"
	},
	{
		name: "用户管理",
		icon: "icon-yonghuguanli1"
	},
	{
		name: "菜单管理",
		icon: "icon-caidanguanli"
	},
	{
		name: "分组管理",
		icon: "icon-fenzuguanli"
	},
	{
		name: "用户管理",
		icon: "icon-yonghuguanli"
	},
	{
		name: "欢迎--logo",
		icon: "icon-huanyingyu"
	},
	{
		name: "退出登录",
		icon: "icon-tuichudenglu"
	},
	{
		name: "主页",
		icon: "icon-zhuye"
	},
	{
		name: "眼睛--闭",
		icon: "icon-yanjing1"
	},
	{
		name: "眼睛--开",
		icon: "icon-yanjing"
	},
	{
		name: "用户默认头像",
		icon: "icon-yonghu"
	},
	{
		name: "密码",
		icon: "icon-mima-copy-copy"
	},
	{
		name: "角色管理",
		icon: "icon-quanxian2"
	},
	{
		name: "按钮",
		icon: "icon-anniu"
	},
	{
		name: "电脑",
		icon: "icon-diannao"
	},
	{
		name: "选项",
		icon: "icon-xuanxiang"
	},
	{
		name: "供应商管理",
		icon: "icon-gongyingshangguanli01"
	},
	{
		name: "供应商列表",
		icon: "icon-gongyingshangguanli"
	},
	{
		name: "渠道管理",
		icon: "icon-qudaoguanli"
	},
	{
		name: "APK渠道管理",
		icon: "icon-app"
	},
	{
		name: "市场活动管理",
		icon: "icon-unie61e"
	},
	{
		name: "推广计划管理",
		icon: "icon-tuiguangguanggaowei"
	},
	{
		name: "推广成本管理",
		icon: "icon-chengben"
	},
	{
		name: "数据管理",
		icon: "icon-shuju"
	},
	{
		name: "明细表",
		icon: "icon-mingxibiao"
	},
	{
		name: "总概表",
		icon: "icon-iocnhuizongbiao"
	}

]
export const findIconName = function(iconClass){
	if(iconClass && typeof(iconClass) == 'string'){
		let icon = iconList.find(item => {
			return item.icon == iconClass;
		});
		return icon.name;
	}else{
		return "";
	}
	
}

export default iconList;