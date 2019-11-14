import request from '@/utils/request';
const config = require('@/config/');

export function login(data) {
  return request({
    fullUrl: config.SECURITY_REQ_URL + '/api/user/sysUser/login',
    method: 'post',
    data: data
  })
}

export function localLogout() {
  return request({
      api: 'user/logout',
      method: 'post',
  })
}

export function logout() {
    return request({
        fullUrl: config.SECURITY_REQ_URL + '/api/user/sysUser/logout',
        method: 'post'
    })
}

export function getUserMenu(data) {
  return request({
    fullUrl: config.SECURITY_REQ_URL + '/api/sys/sysmenu/list_for_tree',
    method: 'post',
    data: data
  })
}

export function update_password(data){
  return request({
    fullUrl: config.SECURITY_REQ_URL + '/api/user/sysUser/update_password',
    method: 'post',
    data: data
  })
}

export function get_login_user_prd() {
  return request({
      fullUrl: config.SECURITY_REQ_URL + '/api/prd_channel_config/get_login_user_prd',
      method: 'post',
      data: {
        sub_system_id : process.env.VUE_APP_API_SUBSYSTEMID
      }
  })
}

