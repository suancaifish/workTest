<template>
    <div class="conutDown">
        <div>倒计时</div>
        <ul>
            <li v-for="item in countTimeList" :key="item">{{item}}</li>
        </ul>
        <button @click="check">点击查看</button>
    </div>
</template>

<script>
import moment from "moment";
export default {
    nameL: "CountDown",
    data() {
        return {
            countDownList: [],
            countTimeList: [],
            timer: null
        };
    },
    created() {
        let arr = [];
        for (var i = 1; i <= 10; i++) {
            arr.push(
                moment(new Date())
                    .subtract(i * 19, "m")
                    .subtract(i*1, 'seconds')
                    .format("YYYY-MM-DD, HH:mm:ss")
            );
        }
        this.countDownList = arr;
        this.countDown();
    },

    methods: {
        check() {
            // this.countDown();
            console.log('查看什么');
        },
        /**
         * @desc: 倒计时 计时器
         * @param {type}
         * @return:
         */
        countDown() {
            let endTime = [];
            this.countDownList.forEach(item => {
                
                endTime.push(
                    this.dealTimeString(
                        moment(item)
                            .add(3, "hours")
                            .unix() - moment(new Date()).unix()
                    )
                );
            });

            this.countTimeList = endTime;
            this.timer = setTimeout(this.countDown, 1000);
        },
        //秒数时间转换时分秒
        dealTimeString(time) {
            if (time > 0) {
                let result = parseInt(time);
                let h =
                    Math.floor(result / 3600) < 10
                        ? "0" + Math.floor(result / 3600)
                        : Math.floor(result / 3600);
                let m =
                    Math.floor((result / 60) % 60) < 10
                        ? "0" + Math.floor((result / 60) % 60)
                        : Math.floor((result / 60) % 60);
                let s =
                    Math.floor(result % 60) < 10
                        ? "0" + Math.floor(result % 60)
                        : Math.floor(result % 60);
                result = `${h} : ${m} : ${s}`;
                return result;
            } else if (time <= 0) {
                // if (time < 0) {
                //     clearTimeout(this.timer);
                // }
                return `00 : 00 : 00`;
            }
        }
    }
};
</script>

<style>
@import "./CountDown.scss";
</style>