<!--  -->
<template>
    <div class="freight-detail" v-loading="globalLoading">
        <div class="box-layout flex-between freight-detail-header">
            <div class="flex-start freight-detail-header-title">
                <p>模板名称</p>
                <div><el-input v-model="name" placeholder="请输入模板名称"></el-input></div>
                <div class="update-btn" v-if="detailType == 2"><el-button size="mini" plain @click="handleUpdateName">更新模板名称</el-button></div>
            </div>
            <button-list
                :layout="['add']"
                addText="新增明细"
                buttonSize="mini"
                @handleAdd="handleAdd"
            ></button-list>
        </div>

        <div class="freight-detail-main">
            <!-- 表格 -->
            <table-list
                class="table-list"
                ref="tableList"
                :operationWidth="'100'"
                :operation="detailType == 2"
                :showOverflowTooltip="false"
                :tableData="tableData"
                :columns="expandColumns"
                :tableTitle="tableTitle"
                :tableFormat="formatting"
            >
                <!-- 操作按钮 -->
                <template slot="operation" slot-scope="scope" v-if="detailType == 2">
                    <button-list
                        :customButton="['edit', 'delete']" 
                        :tableData="tableData"
                        :buttonData="[scope.data.row,scope.data.$index]"
                    >
                        <!-- 自定义按钮 -->
                        <template slot="edit" slot-scope="data">
                            <el-button size="mini" class="margin-right-10" plain @click="handleEdit(data.buttonData)">{{data.buttonData[0].openLock ? '保存' : '修改'}}</el-button>
                        </template>

                        <template slot="delete" slot-scope="data">
                            <el-button size="mini" plain @click="handleDelete(data.buttonData)">删除</el-button>
                        </template>
                    </button-list>
                </template>

                 <!-- 自定义渲染实例-->
                    <template slot="deliveryAreaMap" slot-scope="scope">
                        <div 
                            v-html="formatArea(scope.data.row['deliveryAreaMap'])" 
                            :class="scope.data.row['openLock'] || detailType == 1 ? 'pointer' : ''"
                            @click="handleClickArea(scope.data)"
                        >
                        </div>
                    </template>

                    <template slot="firstNum" slot-scope="scope">
                        <el-input v-model="scope.data.row['firstNum']" :disabled="detailType == 2 && !scope.data.row['openLock']"></el-input>
                    </template>

                    <template slot="firstFee" slot-scope="scope">
                        <el-input v-model="scope.data.row['firstFee']" :disabled="detailType == 2 && !scope.data.row['openLock']"></el-input>
                    </template>

                    <template slot="secondNum" slot-scope="scope">
                        <el-input v-model="scope.data.row['secondNum']" :disabled="detailType == 2 && !scope.data.row['openLock']"></el-input>
                    </template>

                    <template slot="secondFee" slot-scope="scope">
                        <el-input v-model="scope.data.row['secondFee']" :disabled="detailType == 2 && !scope.data.row['openLock']"></el-input>
                    </template>
            </table-list>

            <div class="box-layout freight-detail-footer flex-center">
                <el-button type="primary" style="marginRight: 30px" @click="handleSave()" v-if="detailType == 1">保存</el-button>
                <el-button plain @click="handleBack()">返回</el-button>
            </div>
        </div>

        <!--查看详情-->
        <xm-dialog
            class="logistics-tree"
            dialogWidth="1000px"
            scrollHeight="600px"
            :sureClose="false"
            :dialogVisible.sync="treeDialog.show"
            :dialogTitle="treeDialog.title"
            @handleSure="treeDialogSure"
            @handleClose="treeDialogClose"
        >
            <el-tree
                ref="tree"
                :data="logisticsData"
                show-checkbox
                highlight-current
                node-key="id"                
                :default-expanded-keys="defaultExpandedKeys"
                :render-content="renderContent"
                :expand-on-click-node="false"
                @node-expand="handleExpand"
            >
            </el-tree>
        </xm-dialog>
    </div>
</template>

<script>
import { expandColumns } from '../defaultData';
import TableList from "_c/TableList";
import XmDialog from "_c/XmDialog";
import ButtonList from '_c/ButtonList';
export default {
    components: {
        TableList,
        ButtonList,
        XmDialog
    },

    props: {
        detailData: {
            type: Object,
            default: () => {}
        },

        detailType: { // 1、新增 2、更新
            type: Number,
            default: 1
        },

        realLogisticsData: {
            type: Array,
            default: () => []
        },

        defaultExpandedKeys: {
            type: Array,
            default: () => []
        },

        formatArea: {
            type: Function,
            default: null
        }

    },

    data () {
        return {
            globalLoading: false,
            name: '',
            id: '',
            expandColumns: expandColumns,
            tableTitle: '配送运费明细',
            tableData: [],

            treeDialog: {
                show: false,
                title: '请选择区域',
                type: 1 // 1、新建 2、修改
            },
            logisticsData: [],
            expandedKeys: [], // 展开
            lastExpandKey: '', // 记录展开

            disabledArr: [], // 禁止勾选
            clickIndex: '', // 记录列表点击区域的index
            saveCheckArr: [], // 记录所有勾选的数组
            saveDisabledArr: [], // 记录禁止勾选的数组，用于取消时恢复历史记录
        };
    },

    computed: {},

    mounted() {
        this.initData();
        this.initListen();
    },

    activated() {
        window.addEventListener("click", this.toggleExpand);
    },

    deactivated() {
        window.removeEventListener("click", this.toggleExpand);
    },

    beforeDestroy() {
        window.removeEventListener("click", this.toggleExpand);
    },

    methods: {
        initData() {
            this.logisticsData = this.$util.CommonUtils.deepCopy(this.realLogisticsData);
            if(this.detailType == 2) {
                this.name = this.detailData.name;
                this.id = this.detailData.id;
                let tableData = this.$util.CommonUtils.deepCopy(this.detailData.deliveryDetailList);
                let disabledArr = [];
                tableData.forEach((temp) => {
                    let deliveryAreaMap = temp.deliveryAreaMap;
                    Object.keys(deliveryAreaMap).forEach(item => {
                        disabledArr.push(...deliveryAreaMap[item]);
                    })
                })
                this.disabledArr = disabledArr;
                this.saveDisabledArr = disabledArr;
                this.saveCheckArr = disabledArr;
                this.tableData = tableData;
            }
        },
        
        initListen() {
            let dom = document.querySelector('.logistics-tree');
            dom.addEventListener('click', this.toggleExpand);
        },

        handleBack() {
            this.$emit('handleBack', 1);
        },

        toggleExpand() {
            if(this.lastExpandKey) {
                this.$refs.tree.store.nodesMap[String(this.lastExpandKey)].expanded = false;
            }
            this.lastExpandKey = '';
        },
        
        handleUpdateName() {
            if(!this.name) {
                return this.$msg('请输入模板名称');
            }
            let param = {
                name: this.name,
                id: this.id
            }
            this.globalLoading = true;
            this.$api.freight.update_template (param).then((res) => {
                console.log(res);
            }).finally(() => {
                this.globalLoading = false;
            })
        },

        handleSave() {
            if(!this.name) {
                return this.$msg('请输入模板名称');
            }
            let param = {
                name: this.name,
                storeId: 1,
                DeliveryReqList: this.tableData
            }
            for(let i=0; i<this.tableData.length;i++) {
                let keyArr = ['firstNum', 'firstFee', 'secondNum', 'secondFee'];
                let bol = true;
                keyArr.forEach(item => {
                    if(this.tableData[i][item] === '') {
                        bol = false;
                    }
                })
                if(!bol) {
                    return this.$msg('请完善信息');
                }
            }
            this.globalLoading = true;
            this.$api.freight.save(param).then((res) => {
                this.$emit('handleBack', 1, true);
            }).finally(() => {
                this.globalLoading = false;
            })
        },
        
        handleDelete(btnData) {
            if(this.tableData.length < 2) {
                return this.$msg('至少保留一条记录');
            }
            this.$confirm('是否删除', "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let data = btnData[0];
                let index = btnData[1];
                let keyArr = [];
                Object.keys(data.deliveryAreaMap).forEach(item => {
                    keyArr.push(...data.deliveryAreaMap[item]);
                })
                let param = {
                    id: data.id
                }
                this.globalLoading = true;
                this.$api.freight.delete_delivery(param).then((res) => {
                    this.disabledArr = this.disabledArr.filter(item => !keyArr.includes(item));
                    this.saveDisabledArr = this.saveDisabledArr.filter(item => !keyArr.includes(item));
                    this.saveCheckArr = this.saveCheckArr.filter(item => !keyArr.includes(item));;
                    this.tableData.splice(index, 1);
                    this.$msg('删除成功', 'success');
                }).finally(() => {
                    this.globalLoading = false;
                })
            }).catch(err => {
                console.log(err);
            });
        },

        handleUpdateArea(btnData) {
            let data = btnData[0];
            let index = btnData[1];
            let keyArr = ['firstNum', 'firstFee', 'secondNum', 'secondFee'];
            let bol = true;
            keyArr.forEach(item => {
                if(data[item] === '') {
                    bol = false;
                }
            })
            if(!bol) {
                return this.$msg('请完善信息');
            }
            let param = {
                DeliveryReqList: [
                    {
                        deliveryAreaMap: data.deliveryAreaMap,
                        firstNum: data.firstNum,
                        firstFee: data.firstFee,
                        secondNum: data.secondNum,
                        secondFee: data.secondFee,
                        PostFeeTemplateId: this.id,
                    }
                ],
                id: this.id
            }
            this.globalLoading = true;
            if(data.id) {
                param.DeliveryReqList[0].id = data.id;
                this.$api.freight.update_delivery(param).then((res) => {
                    this.$msg('更新成功', 'success');
                    this.$set(this.tableData[index], 'openLock', false)
                }).finally(() => {
                    this.globalLoading = false;
                })
            }else{
                this.$api.freight.add_delivery(param).then((res) => {
                    this.$msg('新增成功', 'success');
                    this.$set(this.tableData[index], 'openLock', false)
                }).finally(() => {
                    this.globalLoading = false;
                })
            }
        },

        handleDisabled(nowArr = []) {
            this.saveDisabledArr = this.disabledArr; // 保存禁用记录, 用于关闭恢复
            if(nowArr.length > 0) {
                this.disabledArr = this.disabledArr.filter(item => { return !nowArr.includes(item)});
            }
            // 禁用非此次选择的
            this.disabledArr.forEach(item => {
                this.setDisabled(item, true);
            })
            // 启用此次选择的
            nowArr.forEach(item => {
                this.setDisabled(item, false);
            })

            this.$nextTick().then(() => {
                this.$refs.tree.setCheckedKeys([]);
                setTimeout(() => {
                    this.$nextTick().then(() => {
                        this.$refs.tree.setCheckedKeys(this.saveCheckArr);
                    })
                }, 30);
            });
        },

        setDisabled(id, bol) {
            let logisticsData = this.logisticsData;
            for(let i=0; i<logisticsData.length; i++) {
                for(let y=0; y<logisticsData[i].children.length; y++) {
                    let index = logisticsData[i].children[y].children.findIndex(city => {return city.id == id });
                    if(index > -1) {
                        this.$set(this.logisticsData[i].children[y].children[index], 'disabled', bol);
                        return 
                    }
                }
            }
        },

        handleAdd() {
            this.treeDialog.type = 1;
            this.treeDialog.show = true;
            this.handleDisabled([]);
        },

        handleExpand(data, node, target) {
            if(this.lastExpandKey) {
                this.$refs.tree.store.nodesMap[String(this.lastExpandKey)].expanded = false;
            }
            if(this.lastExpandKey && this.lastExpandKey != data.id) {
                this.$refs.tree.store.nodesMap[String(this.lastExpandKey)].expanded = false;
            }else if(this.lastExpandKey && this.lastExpandKey == data.id) {
                let bol = this.$refs.tree.store.nodesMap[String(this.lastExpandKey)].expanded ? false : true;
                this.$refs.tree.store.nodesMap[String(this.lastExpandKey)].expanded = bol;
            }
            this.lastExpandKey = node.data.id;
        },

        handleEdit(data) {
            let openLock = false;
            if(!this.tableData[data[1]].openLock) { // 修改
                openLock = true;
                this.$set(this.tableData[data[1]], 'openLock', openLock)
            }else{  // 保存
                this.handleUpdateArea(data)
            }
        },

        handleClickArea(data) {
            if(!data.row.openLock && this.detailType == 2) return;
            this.clickIndex = data.$index;
            let nowArr = [];
            Object.keys(data.row.deliveryAreaMap).forEach(item => {
                nowArr.push(...data.row.deliveryAreaMap[item]);
            })
            
            this.treeDialog.type = 2;
            this.treeDialog.show = true;
            this.handleDisabled(nowArr);
        },

        treeDialogSure() {
            let checkArr = this.$refs.tree.getCheckedNodes();
            if(checkArr.length == 0) return this.$msg('请选择配送区域');
            let deliveryAreaMap = {};
            let disabledArr = this.disabledArr;
            checkArr.forEach(item => {
                if(item.level == 3) {
                    if(disabledArr.includes(item.id)) return;
                    if(deliveryAreaMap[item.provinceId]) {
                        deliveryAreaMap[item.provinceId].push(item.id);
                    }else{
                        deliveryAreaMap[item.provinceId] = [item.id];
                    }
                    disabledArr.push(item.id);
                }
            })
            if(Object.keys(deliveryAreaMap).length == 0) return this.$msg('请选择配送区域');
            if(this.treeDialog.type == 1) {
                let obj = {
                    deliveryAreaMap: deliveryAreaMap, 
                    firstNum : 0, 
                    firstFee : 0, 
                    secondNum : 0, 
                    secondFee : 0,
                    openLock: true
                }
                this.tableData.push(obj);
            }else{
                this.$set(this.tableData[this.clickIndex], 'deliveryAreaMap', deliveryAreaMap);
            }
            
            this.disabledArr = disabledArr;
            this.saveDisabledArr = disabledArr;
            this.saveCheckArr = this.$refs.tree.getCheckedKeys(); // 保存勾选记录
            this.treeDialog.show = false;
        },

        treeDialogClose() {
            this.disabledArr = this.saveDisabledArr;
        },

        renderContent(h, { node, data, store }) {
            let classname = '';
            if (node.level === 2) {
                classname = 'levelFloat';
            }

            return (
                <div class={'logistics-tree-node ' + classname}>
                    <span>{node.label}</span>
                </div>
            );
        },

        formatting(scope, column) {
			//格式化
			if (this.$util.CommonUtils.isEmptyOrNull(scope.row[column.value]) && scope.row[column.value] !== 0 && scope.row[column.value] !== '0'){
				return "-";
			}else {
				return scope.row[column.value];
			}
        },
    }
}

</script>
<style lang='scss' scoped>
    @import './index.scss';
</style>

<style lang="scss">
    .freight-detail {
        .el-tree {
            >.el-tree-node  {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 30px;
                >.el-tree-node__content {
                    >.el-tree-node__expand-icon {
                        display: none;
                    }
                }
                >.el-tree-node__children {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    overflow: visible;
                    >.el-tree-node {
                        position: relative;
                        >.el-tree-node__content {
                            margin-left: 10px;
                        }
                        >.el-tree-node__children {
                            position: absolute;
                            border-radius: 6px;
                            left: 0px;
                            transition: 0s;
                            background: rgb(255, 255, 255);
                            width: 220px;
                            max-height: 230px;
                            overflow: auto;
                            z-index: 999;
                            box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 10px 1px;
                            .el-tree-node__content {
                                padding-left: 0px !important;
                            }
                        }
                    }
                }

            }
        }

        .logistics-tree-node {
            margin-left: 5px;
        }

        .logistics-tree {
            .el-dialog {
                margin-top: 5vh !important;
            }
        }

        .province-text {
            margin: 10px 0;
        }

    }
</style>
