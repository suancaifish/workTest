<!--
 * @Desc: 首页课程模块
 * @Author: suancaifish
 * @param moduleData 课程数据
 * @Date: 2019-11-07 10:00:07
 * @LastEditTime: 2019-12-05 16:49:22
 -->
<template>
    <view class="index-modules p30 ">
        <!-- <view class="flex between v-center">
            <view class="index-modules-title f32  b one-nowrap-ellipsis">{{noduleTitle}}</view>
            <button open-type="contact" class="colororange courseCustom " @click="courseCustom">课程定制 ></button>
        </view> -->
        <!-- 标题结束 -->

        <view class="index-modules-content  mt30" 
            v-for="(item,index) in currentModuleData.list" 
            :key="index" 
            >
             <view  class="index-modules-content-item br10 shadow pt60 pr30 pb30 pl30 rel mt30" 
              
                @click="checkCourseDetail">
                    <view class="index-modules-content-item-label abs left0 top0  pr20 pl20 h40 lh40 btrr2000 bbrr2000 f24 colororange tc">课程</view>
                    <view class="f30 b textEllipsis">{{item.name}}</view>
                    <!-- 教师头像信息 -->
                    <view class="flex">
                        <view class="flex v-center pt30 " v-for="(item2,ind) in item.teacherInfo" :key="ind" v-show="ind<1">
                            <image :src="item2.avatar" class="w64 h64 br50-percent"></image>
                            <text class="pl10 f24 w100 textEllipsis">{{item2.nickName}}</text>
                        </view>
                    </view>
                    
                  

					
                        <text class="f24 color999 ">{{item.initNumber*1 + item.joinTotal*1}}人已报名</text>
                        <view v-if="userJoinShow"> 
                                <base-button 
                                text="免费报名" 
                                backgroundColor="orange" 
								v-if="compare(item.coursePanID)==false&&item.toplimit*1==0&&item.originalPrice*1==0
								||compare(item.coursePanID)==false&&item.toplimit*1!==0&&item.toplimit*1>item.joinTotal*1&&item.originalPrice*1==0"
                             	></base-button>

								<base-button 
                                text="已报名" 
                                backgroundColor="orange" 
								v-if="compare(item.coursePanID)"
                             	></base-button>

								 <base-button 
                                text="已报满" 
                                backgroundColor="gray" 
								v-if="compare(item.coursePanID)==false&&item.toplimit*1!==0&&item.toplimit*1-item.joinTotal*1 ==0||compare(item.coursePanID)==false&&item.toplimit*1!==0&&item.toplimit*1<=item.joinTotal*1"
                             	></base-button>
                                
                            <view class='flex' v-if="compare(item.coursePanID)==false&&item.toplimit*1==0&&item.originalPrice*1!==0
							||compare(item.coursePanID)==false&&item.toplimit*1!==0&&item.toplimit*1>item.joinTotal*1&&item.originalPrice*1 !==0">
								<!-- v-if="item.toplimit*1==0&&item.originalPrice*1 !==0 || item.toplimit*1 !==0 && item.toplimit*1 - item.joinTotal*1 !==0&&item.originalPrice*1!==0" -->
                                <text class='color999 mr15 line-through f24 lh34' v-if="item.discountPrice * 1 !== item.originalPrice*1">￥{{item.originalPrice * 1}}</text>
                                <text class='colororange f34 lh34'>￥{{dealPriceLength(item.discountPrice)}}</text>
                            </view>

                        </view>
                    </view>  


            </view>
        </view>
    </view>
</template>

<script>
import BaseButton from "components/base-button/base-button";
export default {
    name: "CourseModule",
    props: {
        moduleData: {
                type: Object
        },
        flag:Boolean, //登录状态
        count:Number  //计数器
    },
    data() {
        return {
            currentModuleData:datalist,
            text: "免费报名",//按钮文字
            Picture:pic, //头像图片，
            courseid:Number, //课程详情id
            surplusNumber:Number,  //剩余报名名额
            joinStatus:Number,  //报名状态0未报名 1已报名
            SIZE:10, //请求默认数量
            page:1, //请求页数
            tagID:this.moduleData.subject,    //tagID:this.currentModuleData.subject
            userJoin:[],   //加入的班级
            userJoinShow:false,
            totalLength:this.moduleData.total,   ///存起来的初始总长度  更新数据防止数据长度为0 然后显示更多不显示
            noduleTitle:this.moduleData.name
        };
    },
    onReady(){
        if(this.$util.getParam('param').isBind){
            this.$http.get(`${this.$api.course.getUserPlanList}?tagId=${this.currentModuleData.subject}`,{
                                "Content-Type": "application/json;charset=UTF-8"
                            }).then(res=>{
								res.data.forEach(item => {
									this.userJoin.push(item.id)
                                });
                                this.userJoinShow=true;
                            })
        }
    },
    computed:{},
    watch: {
        //计数更新触发数据更新
        count:function (val,oldVal){
            console.log(val,oldVal);
            this.indexUpdate()
        }
    },

    methods: {
        dealPriceLength(item){
            if(item){
                if((item*1).toString().length>6){
                  return  (item*1).toString().slice(0,6)
                }else {
                     return (item*1);
                }
            }
        },
        checkCourseDetail(e){
            this.courseid=e.currentTarget.dataset.courseid;
            this.surplusNumber=e.currentTarget.dataset.surplusnumber;
            this.joinStatus=e.currentTarget.dataset.joinstatus
            let teachpiclist = e.currentTarget.dataset.teacherList;
            //修改老师头像
			this.$store.commit("getTeacherPhoto", teachpiclist);
            //不需要检测授权
            uni.navigateTo({
                url:`${this.$path.course.courseUrl}?courseid=${this.courseid}&surplusnumber=${this.surplusNumber}&joinstatus=${this.joinStatus}`
            })
        },
        courseCustom(){
            //点击课程定制 跳转客服
            this.$emit('courseCustom')
        },
        checkMoreCourse(){
            //点击查看更多课程
            // console.log('点击更多');
            // console.log(this.currentModuleData.total);
            // console.log(this.currentModuleData.list.length);
            if(this.currentModuleData.list.length % this.SIZE == 0){
                console.log('执行这个');
                this.page++
            }else {
           
            }
            this.$http.get(`${this.$api.course.getCoursePlanList}?page=${this.page}&size=${this.SIZE}&tagID=${this.tagID}`,
                { "Content-Type": "application/json;charset=UTF-8" }
            ).then(res=>{
                console.log(res.data);
                // this.currentModuleData=res.data;
                if(this.page==1){
                      this.currentModuleData.list= res.data.list 
                }else if (this.page>1) {
                    this.currentModuleData.list=[...this.currentModuleData.list,...res.data.list]
                }
                console.log('总长度',this.currentModuleData.list);
            })

        },
        ///首页更新用
        indexUpdate(){
            this.$http.get(`${this.$api.course.getCoursePlanList}?page=${this.page}&size=${this.currentModuleData.list.length}&tagID=${this.tagID}`,
                { "Content-Type": "application/json;charset=UTF-8" }
            ).then(res=>{
                // console.log(res.data);
                this.currentModuleData=res.data;
                // console.log(this.currentModuleData);
            })
            
            if(this.$util.getParam('param').isBind){
            this.userJoin=[];
            this.$http.get(`${this.$api.course.getUserPlanList}?tagId=${this.tagID}`,{
                                "Content-Type": "application/json;charset=UTF-8"
                            }).then(res=>{
								// console.log(res.data);
								res.data.forEach(item => {
									this.userJoin.push(item.id)
                                });
                                this.userJoinShow=true;
								// console.log(this.userJoin);
                            })
        }
        },
        //日期格式处理
        date(time){
            return time.slice(0,10)
		},
		compare(item){
			let res = this.userJoin.includes(item)
			// console.log(res);
			return res
		}
    },
    components: {
        BaseButton //基础按钮组件：传text按钮值进去，点击事件clickBtn
    }
};
</script>

<style lang="scss" scoped>
@import "common/scss/variable.scss";
.index-modules-content {
    .index-modules-content-item {
        &:first-of-type {
            margin-top: 0;
        }
        .index-modules-content-item-label {
            background: #ffe9d9;
        }
    }
    .orange-color {
        .live-status-btn {
            color: #fff;
            background: linear-gradient(135deg, $orange, #fc9103);
        }
    }
}
.textEllipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.line-through{
    text-decoration:line-through 
}
.courseCustom{
    width: 150rpx;
    height: 25rpx;
    padding: 0;
    font-size: 24rpx;
    line-height:24rpx;
    background-color: #fff;
    border: transparent;
    margin-left: 0;
    margin-right: 0;
}
button::after{
    border: none;
}
</style>