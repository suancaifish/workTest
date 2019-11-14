<!-- 时间选择器 -->
<template>
    <el-date-picker
        v-model="dateTime"
        :picker-options="pickerOptions ? pickerOptions :　pickerTimeOptions"
        :type="getType"
        :format="format"
        :editable="editable"
        :clearable="clearable"
        :range-separator="rangeS"
        :default-value="Array.isArray(dateTime) ? [new Date(), new Date()] : new Date()"
        :start-placeholder="sPlaceholder"
        :end-placeholder="ePlaceholder"
        :disabled="disabled"
        @change="chooseDate"
        @blur="dateBlur"
    >
    </el-date-picker>
</template>

<script>
    const startFormat = ' 00:00:00';
    const endFormat = ' 23:59:59';
    export default {
        name: "timeRange",
        props: {
            dateTime: {
                type:  null,
                required: true,
                default: function () {
                    return [];
                }
            },
            dateType: {
                //显示类型 year/month/date/week/datetime/datetimerange/daterange
                type: String,
                default: "daterange",
                required: false
            },
            format: {
                //显示在输入框中的格式
                type: String,
                default: "yyyy/MM/dd",
                required: false
            },
            editable: {
                //文本框可输入
                type: Boolean,
                default: false,
                required: false
            },
            clearable: {
                //是否显示清除按钮
                type: Boolean,
                default: false,
                required: false
            },
            sPlaceholder: {
                //范围选择时开始日期的占位内容
                type: String,
                default: "开始日期",
                required: false
            },
            ePlaceholder: {
                //范围选择时结束日期的占位内容
                type: String,
                default: "结束日期",
                required: false
            },
            rangeS: {
                //选择范围时的分隔符
                type: String,
                default: "至",
                required: false
            },
            //日期选项
            pickerOptions: {
                type: null,
                required: false,
                default: false
            },
            //是否禁用
            disabled: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            const _this = this;
            return {
                pickerTimeOptions: {
                    disabledDate(time) {
                        return time.getTime() >= Date.now();
                    },
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date(new Date().Format('yyyy/MM/dd') + startFormat);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const start = new Date(_this.getTime(-1) + startFormat);
                                const end = new Date(_this.getTime(-1) + endFormat);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近7天",
                            onClick(picker) {
                                const start = new Date(_this.getTime(-6) + startFormat);
                                const end = new Date();
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近14天",
                            onClick(picker) {
                                const start = new Date(_this.getTime(-13) + startFormat);
                                const end = new Date();
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "最近30天",
                            onClick(picker) {
                                const start = new Date(_this.getTime(-29) + startFormat);
                                const end = new Date();
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "本月",
                            onClick(picker) {
                                let currentMonth = new Date();
                                currentMonth.setDate(1);
                                const start = new Date(new Date(currentMonth).Format('yyyy/MM/dd') + startFormat);
                                const end = new Date();
                                picker.$emit("pick", [start, end]);
                            }
                        },
                        {
                            text: "上月",
                            onClick(picker) {
                                let lastMonth = new Date();
                                let month = lastMonth.getMonth();
                                if(month - 1 < 0){
                                    let year = lastMonth.getFullYear();
                                    lastMonth.setMonth(11);
                                    lastMonth.setFullYear(year - 1);
                                }else{
                                   lastMonth.setMonth(month - 1); 
                                }
                                lastMonth.setDate(1);
                                const start = new Date(new Date(lastMonth).Format('yyyy/MM/dd') + startFormat);
                                const end = new Date(new Date(lastMonth.getFullYear(),lastMonth.getMonth() + 1,0).Format('yyyy/MM/dd') + startFormat);
                                picker.$emit("pick", [start, end]);
                            }
                        },
                    ]
                },
                
            };
        },
        computed: {
            getType() {
                return this.dateType ? this.dateType : "datetimerange";
            }
        },
        methods: {
            chooseDate(date) {
                if(date){
                    if(Array.isArray(date)){
                        date[0] = this.getType == "datetimerange" ? date[0].Format("yyyy-MM-dd HH:mm:ss") : date[0].Format("yyyy-MM-dd");
                        date[1] = this.getType == "datetimerange" ? date[1].Format("yyyy-MM-dd HH:mm:ss") : date[1].Format("yyyy-MM-dd");
                    }else{
                        date = date.Format("yyyy-MM-dd");
                    }
                    this.$emit("chooseDate", date);
                }

            },
            dateBlur(){
                
            },
            getTime(count){//获取count天前后的日期
                let dd = new Date();
                dd.setDate(dd.getDate() + count);   
                let year = dd.getFullYear();
                let mon = dd.getMonth() + 1;   
                let day = dd.getDate();
                return year + "/" + mon + "/" + day;
            }
        },
        watch: {
            dateTime: {
                immediate: true,
                deep: true,
                handler(val) {
                    this.$emit("update:dateTime", val);
                    this.$emit("change",val);
                }
            }
        }
    };
</script>
<style lang='scss' scoped>
    @import "index";
</style>
