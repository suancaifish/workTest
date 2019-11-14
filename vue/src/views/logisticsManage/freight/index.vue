<!--  -->
<template>
    <div class="freight">
        <div v-show="detailShowType == 1" v-loading="globalLoading">
            <div class="box-layout flex-between freight-header">
                <div class="freight-header-title">
                    <p>店铺计费方式 <a @click="handleRule">店铺计费规则说明</a></p>
                    <div>
                        <el-radio v-model="chargeMode.label" label="1">
                            <el-tooltip effect="dark" :content="chargeMode.tips" placement="right">
                                <span>
                                    商品累加运费<i class="el-icon-info info-icon"></i>
                                </span>
                            </el-tooltip>
                        </el-radio>
                    </div>
                </div>
                <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" @click="handleAdd">新增运费模板</el-button>
            </div>
            
            <div class="box-layout freight-body">
                <p class="freight-body-title">配送运费明细</p>
                <el-table
                    :data="tableData"
                    v-loading="searchLoading"
                    style="width: 100%"
                    row-key="templateId"
                    :expand-row-keys="expandRowKeys"
                    @expand-change="expandChange"
                    @row-click="handleRowClick"
                >
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table
                                :data="props.row.deliveryDetailList"
                                class="none-table-background"
                            >
                                <el-table-column
                                    v-for="(child) in expandColumns"
                                    :key="child.value"
                                    :label="child.label"
                                    :min-width="child.width"
                                    :align="child.align ? child.align : 'center'"
                                >
                                    <template slot-scope="scope">
                                        <div  v-if="child.parentCustom">
                                            <div v-html="formatArea(scope.row['deliveryArea'])"></div>
                                        </div>
                                        <div v-else>{{ formatChild(scope,child) }}</div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    
                    <el-table-column
                        v-for="(column) in columns"
                        :key="column.value"
                        :label="column.label"
                        :min-width="column.width"
                        align="center"
                        show-overflow-tooltip
                    >
                        <template slot-scope="scope">
                            <div class="beyond-ellipsis">
                                {{ formatting(scope,column) }}
                            </div>
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="操作"
                        min-width="100"
                        align="center"
                    >   
                        <template slot-scope="scope">
                            <button-list
                                :customButton="['edit', 'delete']" 
                                :tableData="tableData"
                                :buttonData="[scope.row,scope.$index]"
                                class="freight-button-list"
                            >
                                <!-- 自定义按钮 -->
                                <!-- <template slot="copy" slot-scope="data">
                                    <el-button size="mini" class="margin-right-10"  plain @click="handleCopy(data)">复制</el-button>
                                </template> -->

                                <template slot="edit" slot-scope="data">
                                    <el-button size="mini" class="margin-right-10"  plain @click.stop="handleEdit(data)">修改</el-button>
                                </template>

                                <template slot="delete" slot-scope="data">
                                    <el-button size="mini" plain @click.stop="handleDelete(data)">删除</el-button>
                                </template>
                            </button-list>
                        </template>
                    </el-table-column>
                </el-table>

                <pagination 
                    class="pagination" 
                    :currentPage="formData.pageNo" 
                    :total="formData.pageTotal"
                    @currentChange="currentChange" 
                    @sizeChange="sizeChange"
                ></pagination>
            </div>
        </div>
        
        <detail 
            v-if="detailShowType == 2" 
            @handleBack="handleBack" 
            :detailData="detailData" 
            :detailType="detailType"
            :realLogisticsData="logisticsData"
            :defaultExpandedKeys="defaultExpandedKeys"
            :formatArea="formatArea"
        ></detail>

        <rule v-if="detailShowType == 3" @handleBack="handleBack"></rule>
    </div>
</template>

<script>
import { columns, expandColumns, areaOption } from './defaultData';
import Pagination from "_c/Pagination";
import ButtonList from '_c/ButtonList';
import Detail from './detail';
import Rule from './rule';

export default {
    components: {
        ButtonList,
        Detail,
        Rule,
        Pagination
    },

    data () {
        return {
            globalLoading: false,
            searchLoading: false,
            detailShowType: 1, // 1、主页 2、详情 3、规则
            chargeMode: {
                label: '1',
                tips: '分别计算处理商品使用模板的运费和统一运费的最大值，再进行累加。'
            },
            formData: {
                pageNo: 1,
                pageSize: 50,
                storeId: 1,
                pageTotal: 0,
            },
            columns: columns,
            expandColumns: expandColumns,
            tableData: [],
            detailData: [],
            detailType: 1,
            logisticsData:  [], // 地址查询
            defaultExpandedKeys: [], // 默认展开区域
            expandRowKeys: [], //展开行
        };
    },

    computed: {},

    mounted() {
        this.init();
    },

    methods: {
        async init() {
            await this.getLogistics();
            await this.pageQuery();
            let queryType = this.$route.query.type;
            if(queryType == 'create') {
                this.handleAdd();
            }else if(queryType == 'update') {
                let templateId = this.$route.query.templateId;
                let index = this.tableData.findIndex(item => item.templateId = templateId);
                let data = {
                    buttonData: [this.tableData[index], index]
                };
                this.handleEdit(data);
            }
        },

        pageQuery() {
            this.searchLoading = true;
            return this.$api.freight.list_for_page(this.formData).then(res => {
                this.tableData = res.data.totalDatas;
                this.formData.pageTotal = res.data.totalCount;
            }).finally(() => {
                this.searchLoading = false;
            })
        },

        getLogistics() {
            this.searchLoading = true;
            return this.$api.freight.getAllAddress().then(res => {
                // 物流数据转化
                let data = res.data;
                let logisticsData = [];
                let defaultExpandedKeys = [];
                Object.keys(data).forEach((area) => {
                    let areaObj = {
                        id: area,
                        label: areaOption[area],
                        children: [],
                        level: 1
                    }
                    defaultExpandedKeys.push(area);

                    Object.keys(data[area]).forEach((province) => {
                        let provinceObj = {
                            id: province,
                            label: data[area][province][0].province,
                            children: [],
                            level: 2
                        }
                        
                        data[area][province].forEach((city) => {
                            let cityObj = {
                                id: city.id,
                                label: city.city,
                                provinceId: province,
                                level: 3
                            }
                            provinceObj.children.push(cityObj);
                        })
                        areaObj.children.push(provinceObj);
                    })

                    logisticsData.push(areaObj);
                })
                console.log(logisticsData)
                this.logisticsData = logisticsData;
                this.defaultExpandedKeys = defaultExpandedKeys;
            })
        },

        handleRule() {
            this.detailShowType = 3;
        },

        handleBack(val, bol) {
            this.detailShowType = val;
            if(bol) {
                this.formData.pageNo = 1;
                this.formData.pageSize = 50;
            }
            this.pageQuery();
        },

        handleAdd() {
            this.detailType = 1;
            this.detailData = {};
            this.detailShowType = 2;
        },

        handleEdit(rowArr) {
            let data = rowArr.buttonData[0];
            this.detailType = 2;
            let deliveryDetailList = [];
            data.deliveryDetailList.forEach(item => {
                let obj = Object.assign(item, {deliveryAreaMap: item.deliveryArea})
                deliveryDetailList.push(obj);
            })

            this.detailData = {
                id: data.templateId,
                name: data.templateName,
                deliveryDetailList: data.deliveryDetailList
            };
            this.detailShowType = 2;
        },

        handleDelete(rowArr) {
            let data = rowArr.buttonData[0];
            let conStr = `是否删除运费模板：${data.templateName}`;
            
            this.$confirm(conStr, "提示", {
                confirmButtonText: "删除",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.globalLoading = true;
                this.$api.freight.delete_template({id: data.templateId}).then(() => {
                    this.$msg('删除成功', 'success');
                    this.pageQuery();
                }).finally(() => {
                    this.globalLoading = false;
                })
            }).catch(err => {
                console.log(err);
            });
        },

        handleCopy(rowArr) {
            console.log(rowArr)
        },

        sizeChange(pageSize) { //每页条数选项变化
            this.formData.pageSize = pageSize;
            this.pageQuery();
        },

        currentChange(pageNo) { //页数变化
            this.formData.pageNo = pageNo;
            this.pageQuery();
        },

        expandChange(row, expandedRow) {
            let expandRowKeys = [];
            expandedRow.forEach(item => {
                expandRowKeys.push(item.templateId);
            })  
            this.expandRowKeys = expandRowKeys;
        },

        handleRowClick(row, column, event) {
            let index = this.expandRowKeys.findIndex(item => item == row.templateId);
            if(index > -1) {
                this.expandRowKeys.splice(index, 1);
            }else{
               this.expandRowKeys.push(row.templateId); 
            }
        },

        formatting(scope, column) {
			//格式化
			if (this.$util.CommonUtils.isEmptyOrNull(scope.row[column.value]) && scope.row[column.value] !== 0 && scope.row[column.value] !== '0'){
				return "-";
			}else {
				return scope.row[column.value];
			}
        },
        
        formatArea(deliveryAreaMap) {
            let str = '';
            Object.keys(deliveryAreaMap).forEach(item => {
                for(let i=0; i<this.logisticsData.length; i++) {
                    let provinceObj = this.logisticsData[i].children.find( province => {return province.id == item});
                    if(provinceObj) {
                        let cityArr = provinceObj.children;
                        str += `<p class="province-text">${provinceObj.label}：`;
                        deliveryAreaMap[item].forEach( cityId => {
                            let cityObj = cityArr.find(city => { return city.id == cityId });
                            str += `${cityObj.label}，`;
                        })
                        str = str.slice(0, str.length - 1) + ';</p>';
                        break;
                    }
                }
            })
            return str;
        },

        formatChild(scope, column) {
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
    .freight {
        .el-table--striped .el-table__body tr.el-table__row--striped td {
            background: rgb(236, 235, 235);
        }

        .province-text {
            margin: 10px 0;
        }

        .freight-button-list {
            justify-content: center;
        }

        .freight-body {
            .none-table-background th.is-leaf {
                background: #ecebeb;
            }

            .el-table__expanded-cell {
                .el-table__row {
                    td {
                        background: #F5F7FA;
                    }
                }
            }
        }
        
    }
</style>
