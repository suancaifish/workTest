<script>
import log from "./common/log.js";
export default {
    onLaunch() {
        console.log("App Launch");
        // throw new Error('test')
        wx.setEnableDebug({
            enableDebug: true,
            success: (res) =>{
                console.log(res);
                log.error('enableDebug',res);
            }
        });
       
   
    },
    onShow() {
        console.log("App Show");
    },
    onHide() {
        console.log("App Hide");
	},
	methods: {
		
	}
};
</script>

<style lang="scss">
@import "common/scss/base.scss";
@import "common/font/iconfont.css";
@import "common/scss/common.scss";

/*每个页面公共css */
</style>
