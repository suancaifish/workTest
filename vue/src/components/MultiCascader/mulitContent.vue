<template lang="html">
    <div class="popver-content ">
		<div >
			<div class="search-filter">
				<el-input v-model="searchFilter" v-if="option[0].level !== 0" placeholder="请输入搜索内容" suffix-icon="el-icon-search" @input="handleFilter"></el-input>
			</div>

			<div class="multiCascader-multil-content" :style="contentStyle">
				<ul class="multiCascader-multi-menu">
					<li v-for="(item, index) in optionFormatter"
						:key="index"
						style="border:1px solid transparent;"
						:class="[ 'multiCascader-menu-item', { 'item-disabled': item.disabled }]"
						@dblclick="showDblNextLevel(item)"
						@click="showNextLevel(item)">
						<div v-if="!item.children" class="check-box-content">
							<label :for="item.selectValue" class="flex-start">
								<input  type="checkbox" class="check-box-input" :disabled="item.disabled" :id="item.selectValue" v-model="item.checked" @change="checkChange(item)"/>
								<p style="margin-left: 10px">{{item.label}}</p>
							</label>
						</div>
						<span v-else style="padding-right:40px">{{ item.label }}</span>
						<i class="el-icon-arrow-right" v-show="item.children && item.children.length > 0"></i>
					</li>
				</ul>
			</div>
		</div>

        <!-- 递归调用自身组件 -->
        <muContent
            ref="muContentChild"
            @handleSelect="whenSelected"
            :height="height"
            :width="width"
            v-if="(activeItem && activeItem.children) && (activeItem.children.length > 0 && activeItem.children[0].label)"
            :selectedValues="selectedValues"
            @handleOutPut="whenOutPut"
            :disabledPair="disabledPair"
            :option="activeItem.children" >
        </muContent>
    </div>
</template>

<script>
export default {
	name: "muContent",
	props: {
		option: {
			type: Array,
			default() {
				return [];
			}
		},
		// 被选中的值
		selectedValues: {
			type: Array,
			default() {
				return [];
			}
		},
		// 设置的宽度
		width: {
			type: String,
			default: ""
		},
		height: {
			type: String,
			default: ""
		},
		// 禁用字段
		disabledPair: {
			type: Object,
			default() {
				return {};
			}
		}
	},

	data() {
		return {
			activeItem: "",
			tempActiveItem: "",
			contentStyle: {
				width: "",
				height: ""
			},
			checkArr: [],
			checkDisabled: false,
			parent: {},
			searchFilter: "", //搜索筛选
			optionFormatter: []
		};
	},

	created() {
		this.initData();
		this.whenOutPut(this.selectedValues);
		this.optionFormatter = [...this.option];
	},

	methods: {
		// 逐级上传
		whenOutPut(val) {
			this.$emit("handleOutPut", val);
		},
		
		initData() {
			const { width, height } = this;
			this.contentStyle = Object.assign({}, this.contentStyle, {
				width,
				height
			});
		},

		// 搜索筛选
		handleFilter(val) {
			let arr = [];
			this.option.forEach(item => {
				if (item.label.includes(val)) {
					arr.push(item);
				}
			});
			this.optionFormatter = arr;
		},

		// 获取
		getOptionKey(val, arr) {
			for (let i = 0; i < arr.length; i++) {
				if (arr[i].children) {
				return this.getOptionKey(val, arr[i].children);
				} else {
				if (arr[i].selectValue === val.selectValue) {
					arr[i].checked = false;
					break;
				}
				}
			}
		},

		// 获取到选中的值
		checkChange(val, isCloseCheck) {
			if (typeof val === "undefined") return;
			this.option.forEach(item => {
				const getCheckedItems = child => {
				if (child.selectValue === val.selectValue && isCloseCheck)
					child.checked = false;
				const { selectValue, checked, level } = child;
				if (checked && level && !this.selectedValues.includes(selectValue)) {
					this.selectedValues.push(selectValue);
				} else if (!checked) {
					child.disabled = false;
					if (this.selectedValues.includes(selectValue)) {
					this.selectedValues.splice(
						this.selectedValues.findIndex(
						slectVal => slectVal === selectValue
						),
						1
					);
					}
				}
				};
				this.recursiveFn(item, getCheckedItems);
			});

			this.disabeldAction(val);
			this.activeItem = val;
			this.$emit("handleSelect", this.option);
			this.$emit("handleOutPut", this.selectedValues);
		},

		clickParent(val,isCloseSelected) {
			this.option.forEach(item => {
				if (item.selectValue === val.selectValue && isCloseSelected) item.selected = false;
				console.log(item)
				const { selectValue, selected, level } = item;
				if (selected && !this.selectedValues.includes(selectValue)) {
					this.selectedValues.push(selectValue);
				} else if (!selected) {
					item.disabled = false;
					if (this.selectedValues.includes(selectValue)) {
						this.selectedValues.splice(this.selectedValues.findIndex(slectVal => slectVal === selectValue),1);
					}
				}
			});
			this.disabeldAction(val);
			this.activeItem = val;
			this.$emit("handleSelect", this.option);
			this.$emit("handleOutPut", this.selectedValues);
		},

		clearAllData() {
			this.option.forEach(item => {
				item.selected = false;
				const getCheckedItems = child => {
					child.checked = false;
					
					const { selectValue, checked, level ,selected} = child;
					child.disabled = false;
					if (this.selectedValues.includes(selectValue)) {
						this.selectedValues.splice(
						this.selectedValues.findIndex(
							slectVal => slectVal === selectValue
						),
						1
						);
					}
				};
				this.recursiveFn(item, getCheckedItems);
			});

			this.activeItem = "";

			this.$emit("handleSelect", this.option);
			this.$emit("handleOutPut", this.selectedValues);
		},

		// 单击父级
		parentsChange(item) {
			if (item.selectValue == this.parent.selectValue) {
				let selected = item.selected ? false : true;
				item.selected = selected;
				this.clickParent(item);
				return;
			}
			this.selectedValues = [];
			this.parent = item;
			this.$emit("getParent", item);
			this.clearAllData();
		},

		// 当二级菜单改变的时候
		whenSelected(val) {
			let allChildCancelChecked = true;
			if (Array.isArray(val) && val.length > 0) {
				allChildCancelChecked = val.every(child => child.checked === false);
			}
			this.activeItem.checked = !allChildCancelChecked;
			this.disabeldAction(this.activeItem);
			this.$emit("handleSelect", this.option);
		},

		// 递归函数
		recursiveFn(curItem, cb) {
			const children = curItem.children;
			if (children && children.length > 0) {
				children.forEach(item => {
				this.recursiveFn(item, cb);
				});
			} else {
				cb(curItem);
			}
		},

		// 设置 disabled 值 values: 互斥的另一方数组， curItem 当前选中的值
		setDisabled(exceptValues, curItem, values) {
			const {
				checked: curChecked,
				childrenValues,
				value: curValue,
				siblingValues
			} = curItem;
			this.checkArr = [];
			if (values.includes("all")) {
				if (siblingValues) {
				this.checkArr = new Array(
					siblingValues.length - exceptValues.length
				).fill(true);
				}
			} else {
				this.checkArr = new Array(values.length).fill(true);
			}
			const getCheckArr = item => {
				const { value, checked } = item;
				if (!exceptValues.includes(value)) return;
				this.checkArr.push(checked);
				this.checkArr.shift();
			};
			const resetDistable = child => {
				if (!values.includes(child.value)) return;
				child.disabled = this.checkArr.some(val => val === true);
			};
			this.option.forEach(opt => {
				this.recursiveFn(opt, getCheckArr);
			});
			this.option.forEach(opt => {
				this.recursiveFn(opt, resetDistable);
			});
		},

		// 设置 disabled 值 values: 互斥的另一方数组， curItem 当前选中的值
		setDisabled(exceptValues, curItem, values) {
			const {
				checked: curChecked,
				childrenValues,
				value: curValue,
				siblingValues
			} = curItem;
			this.checkArr = [];
			if (values.includes("all")) {
				if (siblingValues) {
				this.checkArr = new Array(
					siblingValues.length - exceptValues.length
				).fill(true);
				}
			} else {
				this.checkArr = new Array(values.length).fill(true);
			}
			const toDisabled = item => {
				const { value, checked } = item;
				if (
				values.includes(value) ||
				(values.includes("all") && !exceptValues.includes(value))
				) {
				if (siblingValues && siblingValues.includes(value)) {
					this.checkArr.push(checked);
					this.checkArr.shift();
				}
				}
				const itemChild = item.children;
				if (itemChild && itemChild.length > 0) {
				itemChild.forEach(child => {
					toDisabled(child);
				});
				}
			};
			this.option.forEach(child => {
				toDisabled(child);
			});
			this.option.forEach(child => {
				if (
				exceptValues.includes(child.value) ||
				(exceptValues.includes("all") && !values.includes(child.value))
				) {
				child.disabled = this.checkArr.some(val => val === true);
				}
			});
		},

		// disabled action
		// 根据选中的值进行设置是否可选
		disabeldAction(item) {
			const { thatPair, thisPair } = this.disabledPair;
			if (!thatPair || !thisPair) {
				return;
			}
			const pairs = [...thatPair, ...thisPair];
			if (pairs.includes(item.value) || pairs.includes("all")) {
				if (
				thisPair.includes(item.value) ||
				(thisPair.includes("all") && !thatPair.includes(item.value))
				) {
				this.setDisabled(thatPair, item, thisPair);
				return;
				}
				if (
				thatPair.includes(item.value) ||
				(thatPair.includes("all") && !thisPair.includes(item.value))
				) {
				this.setDisabled(thisPair, item, thatPair);
				}
			}
		},

		//点击每一个列表的操作并且给下一个列表赋值
		showNextLevel(item) {
			if (item.children && item.children.length > 0) this.parentsChange(item);
			//先清空，后赋值，否则会导致多级列表同时存在
			this.activeItem = "";
			if (item.disabled) return;
			setTimeout(() => {
				this.activeItem = item;
			}, 10);
		},

		//父级双击全选
		showDblNextLevel(item) {
			if (item.children && item.children.length > 0){
				if (item.selectValue == this.parent.selectValue) {
					let checked = item.checked ? false : true;
					item.checked = checked;
					item.children.forEach(i => {
						i.checked = checked;
						this.checkChange(i);
					});
					return;
				}
				this.selectedValues = [];
				this.parent = item;
				this.$emit("getParent", item);
				this.clearAllData();
				//先清空，后赋值，否则会导致多级列表同时存在
				this.activeItem = "";
				if (item.disabled) return;
				setTimeout(() => {
					this.activeItem = item;
				}, 10);
			}
		},
	}
};
</script>
<style lang='scss' scoped>
.popver-content {
  display: flex;
  justify-content: space-between;
  .search-filter {
    margin: 0 0 10px 10px;
    .el-input--suffix {
      height: 35px !important;
    }
  }
}
.multiCascader-multil-content {
  display: inline-block;
  max-height: 250px;
  overflow-y: auto;
  // border-right: 1px solid red;
}
.check-box-content {
  label {
    cursor: pointer;
  }
}
.check-box-input {
  margin-left: 10px;
  vertical-align: middle;
}
.multiCascader-menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style-type: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  outline: none;
  padding: 8px 20px;
  font-size: 14px;
  &:hover {
    background-color: rgba(125, 139, 169, 0.1);
  }
}
.item-disabled {
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>
