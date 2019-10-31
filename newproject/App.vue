<script>
	import log from './common/log.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
			log.info('user info') // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
		
			log.error('error')
			// log.setFilterMsg('filterkeyword')
			// log.setFilterMsg('addfilterkeyword')
		},
		onHide: function() {
			console.log('App Hide')
			log.info('user info') // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
			log.error('error')
		}
		
			
	}
</script>

<style>
	/*每个页面公共css */
</style>
