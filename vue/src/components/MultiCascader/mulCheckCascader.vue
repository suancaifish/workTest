<template>
    <div class='multil-cascader'>
        <el-popover popper-class="multi-cascader-popover" :visible-arrow="showArrow" trigger="click" @hide="whenPopoverHide" @show="whenPopoverShow">
            <muContent
                ref="muContent"
                :height="height"
                :width="width"
                :option="options"
                @handleOutPut="whenOutPut"
                :selectedValues="selectedValues"
                :outputType="outputType"
                :disabledPair="disabledPair">
            </muContent>
            <el-input popper-class="slect-panel" v-if="activeItem[0] && activeItem[0].level === 0" readonly slot="reference" :suffix-icon="inputArrow"/>
        </el-popover>
    </div>
</template>

<script>
import muContent from "./mulitContent";
export default {
    name: "multiCascader",
    props: {
        options: {
            type: Array,
            default() {
                return [];
            }
        },
        width: {
            type: String,
            default: ""
        },
        height: {
            type: String,
            default: ""
        },
        // 输出值的类型
        outputType: {
            type: String,
            default() {
                return "value";
            }
        },
        // 互斥对儿
        disabledPair: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            // 被选中的值
            selectedValues: [],
            showArrow: true,
            activeItem: [],
            outputValue: [],
            optionDicts: [],
            inputArrow: "el-icon-arrow-down",
            popoverWidth: "",
            // 展开之后的数组， 将每一个children 展开
            flatOptions: [],
            parent: {},
            inputValue: ''
        };
    },
    watch: {
        "options": function () {
            this.initData();
        }
    },
    components: {
        muContent
    },
    created() {
        this.initData();
        this.setOptionDicts(this.options);
        this.toFlatOption(this.options);
    },
    methods: {
        whenPopoverHide() {
            this.inputArrow = "el-icon-arrow-down";
            this.$refs.muContent.$refs.muContentChild.searchFilter = '';
            this.$refs.muContent.$refs.muContentChild.handleFilter('');
        },

        whenPopoverShow() {
            this.inputArrow = "el-icon-arrow-up";
        },

        // 初始化数据 对于每一项 options 添加相关字段并且获取到当前被点击到的元素
        initData() {
            this.setLevel();
            const { width, height } = this;
            const checkedValues = [];
            let childrenValues = [];
            const getChecked = (item) => {
                const { checked, value, children, level, siblingValues,selectValue } = item;
                if (siblingValues) {
                    const tempValues = [...siblingValues];
                    item.siblingValues = tempValues;
                }
                childrenValues.push(selectValue);
                if (children && children.length > 0) {
                    children.forEach(child => {
                        getChecked(child);
                    });
                } else {
                    if (checked && item[this.outputType]) checkedValues.push(item[this.outputType]);
                }
            };
            this.activeItem = this.options;
            this.options.forEach(child => {
                getChecked(child);
                // 设置当前item 的 childrenValues, 包含当前item 下的所有值的 value
                child.childrenValues = [...childrenValues];
                childrenValues = [];
            });
            this.selectedValues = checkedValues;
            this.whenOutPut(this.selectedValues);
        },

        getTypeOptions(values, outputType) {
            const outputValues = [...values];
            const finalOutputArr = [];
            return this.flatOptions.reduce((pev, cur) => {
                const { selectValue: curVal } = cur;
                if (outputType === "item") {
                    if (outputValues.includes(curVal)) pev.push(cur);
                } else {
                    if (outputValues.includes(curVal) && cur[outputType]) pev.push(cur[outputType]);
                }
                return pev;
            }, []);
        },

        // 展开配置中的各项， [{}], 排除 children 属性
        toFlatOption(option) {
            const getItems = (arr, cur) => {
                const keys = Object.keys(cur);
                const newObj = {};
                const curChild = cur.children;
                const hasChild = curChild && curChild.length > 0;
                keys.forEach(key => key !== "children" && (newObj[key] = cur[key]));
                arr.push(newObj);
                return (hasChild ? curChild.reduce(getItems, arr) : arr);
            };
            this.flatOptions = option.reduce(getItems, []);
        },

        // 设置配置的字典
        setOptionDicts(options) {
            if (!Array.isArray(options)) {
                const { label, selectValue } = options;
                this.optionDicts.push({ selectValue, label });
                const children = options.children;
                if (children) {
                    this.setOptionDicts(children);
                }
            } else {
                options.forEach(opt => {
                    this.setOptionDicts(opt);
                });
            }
        },

        // 触发 on-selected 事件
        whenOutPut(value) {
            this.outputValue = [];
            // 根据选中的值数组 value 输出特定 outputType 类型
            if (this.outputType !== "value") {
                this.outputValue = this.getTypeOptions(value, this.outputType);
            } else {
                this.outputValue = value;
            }
            this.$emit("on-selected", this.outputValue);
        },

        formatName(arr){
            let name = '';
            let parent = '';
            arr.forEach((item,index) => {
                if(index != arr.length - 1){
                    name += `${item.selectLabel};` ;
                }else{
                    name += item.selectLabel;
                }

            })
            return name;
        },

        // 设定层级
        setLevel() {
            const siblingValues = [];
            let tempLevel = 0;
            if (this.options.length) {
                const addLevel = option => {
                    const optChild = option.children;
                    if (option.level === tempLevel) {
                        siblingValues.push(option.value);
                    }
                    if (optChild) {
                        optChild.forEach(opt => {
                            opt.level = option.level + 1;
                            opt.selectValue = option.value + ',' + opt.value;
                            opt.selectLabel = option.label + '/' + opt.label;
                            addLevel(opt);
                        });
                    }
                };
                this.options.forEach(option => {
                    if (!option.level) {
                        option.level = 0;
                        option.selectValue = option.value;
                        option.selectLabel = option.label;
                        tempLevel = option.level;
                    }
                    addLevel(option);
                    option.siblingValues = siblingValues;
                });
            }
        },
        
        showSecondLevel(item) {
            this.activeItem = item;
        }
    },
};
</script>
<style lang='scss' scoped>
.vk-menu-item {
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
    width: 100%;
    &:hover {
        background-color: rgba(125,139,169,.1);
    }
}
.multil-cascader{
    width: 155px;
    display: inline;
}
.multil-cascader:hover{
    cursor: pointer;
}

</style>
