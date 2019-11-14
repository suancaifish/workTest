<!-- 条件搜索 -->
<template>
	<div class="search-box" ref="searchBox">
		<template v-if="!headerSlot">
			<div class="flex-between search-box-title" >
				<p>{{boxTitle}}</p>
				<div class="flex-start">
					<transition name="opacity-toggle">
						<div class="search-box-btn flex-center" v-if="!boxShow">
							<slot name="search-box-btn" :boxShow="boxShow"></slot>
						</div>
					</transition>
					<i v-if="hideBol" @click="toggleBox" class="el-icon-arrow-down toggle-icon" :class="boxShow ? 'rotate180': ''"></i>
				</div>
			</div>
		</template>
		<template v-if="headerSlot">
			<slot name="search-box-header" :boxShow="boxShow"></slot>
		</template>
		<div class="search-box-content" v-show="boxShow">
			<div class="search-box-form">
				<slot name="search-box-form"></slot>
			</div>
			<transition name="opacity-toggle">
				<div class="search-box-btn flex-center" v-if="boxShow">
					<slot name="search-box-btn" :boxShow="boxShow"></slot>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
export default {
	name: "SearchBox",
	props: {
		boxTitle: {
			// 标题
			type: String,
			default: "查询条件",
			required: false
		},
		hideBol: {
			//是否可隐藏
			type: Boolean,
			default: false,
			required: false
		},
		headerSlot: {
			// 头部是否自定义
			type: Boolean,
			default: false,
			required: false
		}
	},
	data() {
		return {
			boxShow: true,
			height: ""
		};
	},
	mounted() {
		window.addEventListener("keydown", this.keyDown);
		this.initHeight();
	},
	activated() {
		window.addEventListener("keydown", this.keyDown);
	},
	deactivated() {
		window.removeEventListener("keydown", this.keyDown);
	},
	beforeDestroy() {
		window.removeEventListener("keydown", this.keyDown);
	},
	methods: {
		initHeight() {
			this.$nextTick().then(() => {
				this.height = document.querySelector(".search-box").clientHeight + 1;
			});
		},
		toggleBox() {
			this.boxShow = !this.boxShow;
			this.$emit("toggleShow", this.boxShow);
		},
		keyDown(e) {
			if (e.altKey && e.keyCode == 83) {
				this.toggleBox();
			}
		}
	}
};
</script>
<style lang='scss'>
@import "index";
</style>
