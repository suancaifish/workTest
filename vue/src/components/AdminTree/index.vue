<!-- 树形 -->
<template>
	<el-tree
		:data="treeData"
		:show-checkbox="showCheckBox"
    :render-after-expand="false"
		:node-key="nodeKey"
    :filter-node-method = "filterNode"
		:default-expanded-keys="expandedKeys"
		:default-checked-keys="checkedKeys"
    :render-content="renderContent"
		:props="defaultProps"
    ref="adminTree"
    @node-click="nodeClick" 
    @check-change="nodeCheck" >
	</el-tree>
</template>

<script>
let all = 0; // 总数
let checkNum = 0; //选择数
// id作为标示
export default {
  name: "AdminTree",
  props: {
    //树形数据
    treeData: {
      type: Array,
      require: true,
      default: () => {
        return [];
      }
    },
    nodeKey:{
      type: String,
      require: false,
      default: "id"
    },
    // 是否可选框
    showCheckBox:{
      type: Boolean,
      required:false,
      default: true
    },
    //默认展开的行数
    expandedKeys: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    //默认勾选
    checkedKeys: {
      type: Array,
      require: false,
      default: () => {
        return [];
      }
    },
    defaultProps: {
      type: Object,
      require: false,
      default: () => {
        return {
          children: "children",
          label: "name"
        };
      }
    },
    // 是否显示统计
    statisticsShow: {
      type: Boolean,
      required:false,
      default: true
    },
    // 自定义图标渲染(Function)
    iconFormat:{
      type: null,
      required:false,
      default: false
    }
  },
  data() {
    return {};
  },

  computed: {},

  mounted() {},

  methods: {
    //获取图标
    getIcon(node){ 
      if(this.iconFormat && typeof(this.iconFormat) == 'function'){
        return this.iconFormat(node);
      }else{
        console.log(node);
        let className = "iconfont";
        if(node.expanded){
          className += " icon-wenjianjia";
        }else if(node.childNodes.length > 0){
          className += " icon-folder";
        }else{
          className += " icon-wenjian";
        }
        return className;
      }
    },
    //统计当前目下的文件总个数
    getCount(data){
      let n = 0; //数组长度
      data = Array.isArray(data) ? data: [data];
      let length = data.length;
      for(let i = 0; i < data.length; i++){
        if (data[i].children && data[i].children.length > 0) {
          length -= 1;
          if (n == length) all += length;
          this.getCount(data[i].children);
          continue;
        }
        n++;
        if (n == length) all += length;
      }
    },
    //统计选择个数
    getCheckNum(node){
      let n = 0; //数组长度
      let c = 0; //选择数
      node = Array.isArray(node) ? node: [node];
      let length = node.length;
      for(let i = 0; i < node.length; i++){
        if (node[i].childNodes.length > 0) {
          length -= 1;
          if (n == length) checkNum += c;
          this.getCheckNum(node[i].childNodes);
          continue;
        }
        if(node[i].checked){
          c++;
        }
        n++;
        if (n == length) checkNum += c;
      }
    },
    //自定义渲染
    renderContent(h, { node, data, store }) {
      let className = this.getIcon(node);
      all = 0;
      checkNum= 0;
      let statisticsStyle = this.statisticsShow ? "": 'display:none';
      if(data.exceed === 1) data.disabled = true; // 无权限禁用
      if(node.childNodes.length > 0){
        this.getCount(data);
        this.getCheckNum(node);
        return (
          <div class="tree-node flex-between">
            <div class="flex-start">
              <i class={className} ></i>
              <p class="tree-node-label">{node.label}</p>
            </div>
            <div>
              <p class="tree-node-num" style={statisticsStyle}><span>{checkNum}</span> / {all}</p>
            </div>
          </div>
        )
      }else{
        return (
          <div class="tree-node flex-between">
            <div class="flex-start">
              <i class={className} ></i>
              <p class="tree-node-label">{node.label}</p>
            </div>
          </div>
        );
      }
    },
    //节点点击
    nodeClick(data, node, store) {
      if(data.disabled) return;
      if(node.childNodes.length == 0){
        this.$refs.adminTree.setChecked(data,!node.checked);
      }
      this.$emit('nodeClick',node);
    },
    //节点选择
    nodeCheck(data, node) {
      let obj = Object.assign({},data,{checked: node});
      this.$emit('nodeCheck',obj);
    },
    // 节点过滤
    filterNode(value, data, node) {

    }
  },
  
};
</script>
<style lang='scss'>
@import "index";
</style>
