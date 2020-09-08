<template>
	<view class="f30">
		<view class="index-modules-content-item br10 shadow pt60 pr30 pb30 pl30 rel mt30" @click="checkCourseDetail" v-for="(item,index) in data"
		 :key="index">
			<view class="index-modules-content-item-label abs left0 top0  pr20 pl20 h40 lh40 btrr2000 bbrr2000 f24 colororange tc">课程</view>
			<view class="f30 b textEllipsis">{{item.name}}</view>
			<!-- 教师头像信息 -->
			<view class="flex">
				<view class="flex v-center pt30 " v-for="(item2,ind) in item.teacherInfo" :key="ind" v-show="ind<1">
					<image :src="item2.avatar" class="w64 h64 br50-percent"></image>
					<text class="pl10 f24 w100 textEllipsis">{{item2.nickName}}</text>
				</view>
			</view>





		</view>


	</view>
	</view>
</template>

<script>
	// import CourseModule from "@/components/course-module/course-module";
	import {
		datalist
	} from './DATA/data.js'




	export default {
		// components: { CourseModule },
		data() {
			return {
				// data: datalist[0].list
				data: []
			};
		},
		components: {},
		created() {
			this.getList()

		},
		mounted() {
			console.log(this.data)
		},
		methods: {
			checkCourseDetail() {
				console.log('点击课程')
			},
			// https://toefl.weixue100.com/wxapp/diy/get-detail?ssk=DSEmSaRD_HcRuRlg&thirdID=3
			getList() {
				setTimeout(() => {
					this.$http.get(`https://toefl.weixue100.com/wxapp/diy/get-detail?ssk=DSEmSaRD_HcRuRlg&thirdID=3`, {
						"Content-Type": "application/json;charset=UTF-8"
					}).then(res => {
						console.log(res.data.modules[0].list);
						this.data = res.data.modules[0].list;
					})
				}, 7000);

			}

		}
	};
</script>

<style>
	uni-page-body {
		background-color: #f4f4f4;
	}

	.p10 {
		padding: 10px;
		font-size: 16px;
	}

	.index-modules-content-item {
		margin: 15rpx auto;
		text-align: center;
		width: 80%;
		background-color: #ccc;
	}
</style>
