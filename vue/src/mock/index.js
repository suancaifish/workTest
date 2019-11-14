import Mock from 'mockjs';
import loginAPI from './login';
import adminAPI from './admin';
// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/login/, 'post', loginAPI.login);
Mock.mock(/\/logout/, 'post', loginAPI.logout);
Mock.mock(/\/list_for_tree\.*/, 'post', loginAPI.getUserMenu);

// 管理相关
Mock.mock(/\/list_for_table/, 'post', adminAPI.list_for_table);
Mock.mock(/\/list_for_perms/, 'post', adminAPI.list_for_perms);

export default Mock
