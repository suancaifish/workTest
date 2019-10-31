<script>
import log from "./common/log.js";
export default {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
    log.info("user info1"); // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
    log.warn("sss1");
    log.error("error1");
    // log.setFilterMsg('filterkeyword')
    // log.setFilterMsg('addfilterkeyword')
  },
  onHide: function() {
    console.log("App Hide");
    log.info("user info2"); // 日志会和当前打开的页面关联，建议在页面的onHide、onShow等生命周期里面打
    log.error("error2");
    log.warn("sss2");
  }
};
</script>

<style>
/*每个页面公共css */
</style>
