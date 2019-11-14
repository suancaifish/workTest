<template>
    <span class="number-grow-warp">{{num}}</span>
</template>

<script>
export default {
    props: {
        time: {
            type: Number,
            default: 2
        },
        end: {
            type: Number,
            default: 720000
        },
        start:{
            type: Number,
            default: 0
        }
    },
    data(){
        return {
            num: 0,
            timer: ''
        }
    },
    methods: {
        numberGrow () {
            if(this.end === this.start) return;
            let step = Math.floor(((this.end - this.start) * 10) / (this.time * 1000));
            let current = 0;
            let start = this.start;
            let judge = this.end - this.start;//判断正负
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                start += step;
                if(judge > 0){
                    if (start > this.end) {
                        clearInterval(this.timer);
                        start = this.end;
                    }
                }else{
                   if (start < this.end) {
                        clearInterval(this.timer);
                        start = this.end;
                    } 
                }
                if (current === start) return;
                current = start;
                this.num = this.$util.CommonUtils.numberFormatter(current);
            },10);
        }
    },
    mounted () {
        window.bus.$on('numberGrow',this.numberGrow);
    }
}
</script>

<style>
.number-grow-warp{
  transform: translateZ(0);
}
</style>