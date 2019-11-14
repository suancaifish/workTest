export function errorStatus(status) {
  switch (status) {
    case -401:
			return '没有权限';
		case -402:
			return '登录失效';
  }
}
