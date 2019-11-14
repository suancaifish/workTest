<!--  -->
<template>
    <div class="fixed-btn">
        <svg width="0" height="0">
            <defs>
                <filter id="goo">
                    <fegaussianblur in="SourceGraphic" stdDeviation="10" result="blur"></fegaussianblur>
                    <fecolormatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo"></fecolormatrix>
                    <fecomposite in="SourceGraphic" in2="goo" operator="atop"></fecomposite>
                </filter>
            </defs>
        </svg>
        <div 
            class="aside-nav bounceInUp animated" 
            :class="uaJudge ? 'no-filter' : ''" 
            id="aside-nav" 
            :style="{top: top + 'px', right: right + 'px'}" 
            @mousedown.stop="handleMouseDown"
        >
            <div class="aside-menu" title="按住拖动"><i class="el-icon-setting"></i></div>
            <slot></slot>
            <a v-if="btnNum < 4" href="javascript:void(0)" @click="handleFresh">刷新</a>
            <a v-if="btnNum < 3" href="javascript:void(0)" @click="handleCloseOther" class="menu-line">关闭<br>其它</a>
            <a v-if="btnNum < 2" href="javascript:void(0)" @click="handleClose" class="menu-line">关闭<br>当前</a>
            <a v-if="btnNum < 1" href="javascript:void(0)" @click="handleCloseAll" class="menu-line">关闭<br>所有</a>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        btnNum: {
            type: Number,
            default: 0,
        },
        topInit: {
            type: Number,
            default: 65,
        },
        rightInit: {
            type: Number,
            default: 20,
        }
    },
    data () {
        return {
            top: this.topInit,
            right: this.rightInit,
            drags: {
                down: false,
                x:0,
                y:0,
                winWid:0,
                winHei:0,
                clientX:0,
                clientY:0
            }
        };
    },

    computed: {
        uaJudge() {
            let ua = navigator.userAgent; 
            return /Safari|iPhone/i.test(ua) && 0==/chrome/i.test(ua);
        }
    },

    mounted() {},

    methods: {
        init() {
            
        },

        handleMouseDown(e) {
            let drags={down: false,x:0,y:0,winWid:0,winHei:0,clientX:0,clientY:0};
            let dom = document.querySelector('#aside-nav');
            let style = window.getComputedStyle? window.getComputedStyle(dom) : dom.currentStyle;
            let _this = this;
            drags.down= true;
            drags.clientX = e.clientX;
            drags.clientY = e.clientY;
            drags.x = style.right;
            drags.y = style.top;
            drags.winHei= document.body.clientHeight;
            drags.winWid = document.body.clientWidth;

            document.onmousemove = function(ev){
                let e = ev.clientX - drags.clientX;
                let t = ev.clientY - drags.clientY;
                _this.top = parseInt(drags.y) + t; 
                _this.right = parseInt(drags.x) - e;
            }

            document.onmouseup = function(){
                drags.down= false;
                document.onmousemove = null;
                document.onmouseup = null;
            };
        },

        handleFresh() {
            let conStr = `是否刷新`;
            this.$confirm(conStr, "提示", {
                confirmButtonText: "刷新",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                window.bus.$emit('refreshSelectedTag', this.$route);
            }).catch(err => {
                console.log(err);
            });
        },

        handleCloseOther() {
            let conStr = `是否关闭其它页面，只保留当前页面`;
            this.$confirm(conStr, "提示", {
                confirmButtonText: "关闭",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                window.bus.$emit('closeOthersTags', this.$route);
            }).catch(err => {
                console.log(err);
            });
        },

        handleClose() {
            let conStr = `是否关闭当前页面`;
            this.$confirm(conStr, "提示", {
                confirmButtonText: "关闭",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                window.bus.$emit('closeSelectedTag', this.$route);
            }).catch(err => {
                console.log(err);
            });
        },

        handleCloseAll() {
            let conStr = `是否关闭所有页面`;
            this.$confirm(conStr, "提示", {
                confirmButtonText: "关闭",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                window.bus.$emit('closeAllTags', this.$route);
            }).catch(err => {
                console.log(err);
            });
            
        },  
    }
}

</script>
<style lang='scss' scoped>
@import './index.scss';
</style>