<template>
    <div class="hello f30">
        <div class="shadow p20 pb10 br10">
            <div class="flex weeks">
                <div
                    class="date f26 b color454545 tc pb20"
                    v-for="(item,index) in weeks"
                    :key="index"
                >{{item}}</div>
            </div>

            <div class="flex currentmonths f-start h-center tc">
                <div
                    class="day pb20"
                    v-for="(item, index) in currentmonthDays"
                    :key="index"
                     >
                    <div class="day-item h40 w40 lh40 tc" 
                    :class="[selected==index?'active':'']">
                        <span class="item f26">{{item}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Calendar",
    data() {
        return {
            weeks: ["Mon", "Tues", "Web", "Thur", "Fri", "Sat", "Sun"],
            monthgram: [
                "Jan.",
                "Feb.",
                "Mar.",
                "Apr.",
                "May.",
                "Jun.",
                "Jul.",
                "Aug.",
                "Sep.",
                "Oct.",
                "Nov.",
                "Dec."
            ],
            monthDays: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //十二个月的天数
            // 每月1号是星期几对应补回几天，补全日期
            pastMleft: {
                0: 6,
                1: 0,
                2: 1,
                3: 2,
                4: 3,
                5: 4,
                6: 5
            },
            //当月显示日子
            currentmonthDays: [],
            //当月对应的下标
            currentmonth: 8,
            currentyear: 2019,
            thisY: "",
            thisM: "",
            thisD: "",
            //月初月末补得日期，用来添加样式 coloraaa
            AutoComple: Number,
            backup: Number,
            //点击选择的月份、年
            selectmonth: "",
            selectyear: "",
            //全部课程选项 弹窗列表分类
            selectlist: [],
            //选择的类型结果，默认是 全部班级
            selectresult: { id: "ALL", name: "全部班级" },
            // state: [0, 0, 1, 1, 1, 0, 0],
            //默认当天的下标
            selected: Number,
            //选择类型 小图标状态
            selectIconState: true,
            //当月1-30的状态0为空，1已完成，2未完成
            taskState: [],
            // 开始时间 格式20191018
            startTime: "",
            // 结束时间  格式20191018
            endTime: ""
        };
    },
    created() {
        let time = new Date();
        (this.thisY = this.selectyear = time.getFullYear()), //当前年份
            (this.thisM = this.selectmonth = time.getMonth()), //当前月份，返回0-11
            (this.thisD = time.getDate()); //今天，返回今天所在的日期
        
        this.getdate(this.thisM, this.thisY);
    },
    methods: {
        //获取需要显示的日历
        getdate(month, year) {
            //依据闰年或者平年的判断，来重置二月份的天数
            this.monthDays[1] =
                year % 400 == 0 || (year % 4 == 0 && year % 100 !== 0)
                    ? 29
                    : 28;
            let pastM = --month;
            let realM = ++month; //真实月份
            let firstDW = new Date(year, month, 1).getDay(), //本月第一天是星期几，返回0-6，对应周日-周六
                thisMD = this.monthDays[month], //本月天数
                pastMD = this.pastMleft[firstDW], //1号前缺几天
                nextMD = 35 - thisMD - pastMD, //月末缺几天
                pastMon = pastM < 0 ? 11 : pastM;
            //月初、月末自动补全
            this.AutoComple = pastMD;
            this.backup = nextMD;
            let today = new Date().getDate(); //当天是本月第几天
            let tomonth = new Date().getMonth(); // 当天所在的 月份
            let toyear = new Date().getFullYear(); // 当天所在的年份
            let pastM_lastD = this.monthDays[pastMon]; //上一个月是有几天的
            let currentday = []; //显示当月显示的35天，上月缺的+当月，加下月缺的
            for (var i = 0; i < pastMD; i++) {
                // 月初补得天数，目前补空
                // currentday.push(pastM_lastD - pastMD + i + 1);
                currentday.push("");
            }
            for (var i = 1; i <= thisMD; i++) {
                if (i == today && month == tomonth && year == toyear) {
                    // 只有当天一天才用 “今” 代替
                    currentday.push("今");
                    //当天或者选择某天高亮
                    this.selected = currentday.length - 1;
                } else {
                    currentday.push(i);
                }
            }
            for (var i = 0; i < nextMD; i++) {
                // 月末补得天数，现在补空
                // currentday.push(i + 1);
                currentday.push("");
            }
            //需要显示的数据
            this.currentmonthDays = currentday;
            this.currentmonth = month; //当月对应的下边
            this.currentyear = year;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

@import './DatePicker.scss';

</style>
