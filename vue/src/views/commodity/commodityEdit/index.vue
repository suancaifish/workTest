<!--  -->
<template>
    <div class="commodity-edit" v-loading="editLoading">
        <!-- 基本信息 -->
        <div class="base-info">
            <div class="title">基本信息</div>
            <el-form :model="infoData" label-width="100px" label-position="left" ref="infoForm" class="base-info-form" :rules="infoRule">
                <el-form-item label="商品名称：" prop="sourceName" class="base-width">
                    <el-input v-model="infoData.sourceName" type="textarea" autosize :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="商品卖点：" prop="sellPoint" class="base-width">
                    <el-input v-model="infoData.sellPoint" type="textarea" autosize :maxlength="100"></el-input>
                </el-form-item>
                <el-form-item label="商品图片：" prop="sourceImgArr" ref="imgForm">
                    <div>
                        <upload-img ref="upload" :fileList="infoData.sourceImgArr" :autoUpload="true" :uploadUrl="uploadUrl" @change="handleImgChange" @response="handleResponse">
                            <template slot="tip">
                                <p>{{`注：最多可上传15张 (${infoData.sourceImgArr.length}/15)`}}</p>
                            </template>
                        </upload-img>
                    </div>
                </el-form-item>

                <el-form-item label="类目：" prop="category"  class="base-width" ref="categoryForm">
                    <el-cascader v-model="infoData.category" :props="cascaderProps" separator=" - " @change="clearAttu" ref="cascaderCategory"></el-cascader>
                </el-form-item>
                
                <el-form-item label="属性：" prop="attributeParams" ref="attributeForm">
                    <div class="base-info-attribute">
                        <ul>
                            <li v-for="(item,index) in infoData.attributeParams" :key="index">
                                <div class="flex-start">
                                    <p class="base-info-attribute-label">属性名：</p>
                                    <el-select v-model="item.id" filterable @change="handleAttuChange(index)" clearable placeholder="请选择" class="base-info-attribute-input">
                                        <el-option
                                            v-for="o in attuOption"
                                            :disabled="o.disabled"
                                            :key="o.id"
                                            :label="o.name"
                                            :value="o.id"
                                        >
                                        </el-option>
                                    </el-select>
                                    <div class="base-info-attribute-create" @click="handleAddValue(2)">没有适用的属性名？立即新增+</div>
                                </div>
                                <div class="flex-start base-info-attribute-value-wrap">
                                    <p class="base-info-attribute-label">属性值：</p>
                                    <div class="flex-start base-info-attribute-value">
                                        <div class="base-info-attribute-content">
                                            <el-select v-model="item.valIds" multiple :disabled="!item.id" filterable placeholder="请选择" class="base-info-attribute-input">
                                                <el-option
                                                    v-for="val in getAttuOptionChild(item.id)"
                                                    :key="val.id"
                                                    :label="val.value"
                                                    :value="val.id"
                                                >
                                                </el-option>
                                            </el-select>
                                            <div class="close-icon" v-if="item.valIds.length > 1" @click="handleCloseAttuValue(index)"><i class="el-icon-error"></i></div>
                                        </div>
                                        <p class="base-info-attribute-add" @click="handleAddValue(3, index)">没有适用的属性值？立即新增+</p>
                                    </div>
                                </div>
                                <div class="close-icon" @click="handleCloseAttu(index)"><i class="el-icon-error"></i></div>
                            </li>
                        </ul>
                        <el-button plain @click="handleAddAttu" :disabled="infoData.category.length == 0">添加属性</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!-- 价格库存 -->
        <div class="price-inventory">
            <div class="title">价格库存</div>
            <el-form :model="priceData" :inline="true" label-width="100px" label-position="left" ref="priceForm" class="price-inventory-form" :rules="priceRule">
                <el-form-item label="编码明细：">
                    <div class="price-detail cancel-inline flex-between">
                        <el-form-item label="组合数量" prop="combinationAmount">
                            <div class="tip-wrap">
                                <el-input v-model.number="priceData.combinationAmount" :disabled="priceData.minBuyAmount > 1" type="number" v-only-number="{max: 9999, min: 1, precision: 0}" @blur="handleCombination"></el-input>
                                <div class="combinationAmount-tip">
                                    <el-tooltip class="item" effect="dark" content="用户下单数量为1时，实际销售该商品的数量" placement="top">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                </div>
                                <div class="combinationAmount-x">x</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="产品ID" prop="storeSourceId">
                            <el-input v-model="priceData.storeSourceId" :maxlength="100"></el-input>
                        </el-form-item>
                        <el-form-item label="划线价" prop="originPrice">
                            <el-input v-model.number="priceData.originPrice" type="number" :max="99999999"></el-input>
                        </el-form-item>
                        <el-form-item label="销售价" prop="sourcePrice" >
                            <el-input v-model.number="priceData.sourcePrice" :disabled="priceData.skuParams.length > 0" type="number" :max="99999999"></el-input>
                        </el-form-item>
                        <el-form-item label="成本价" prop="costPrice">
                            <el-input v-model.number="priceData.costPrice" type="number" :disabled="priceData.skuParams.length > 0" :max="99999999"></el-input>
                        </el-form-item>
                        <el-form-item label="库存" prop="inventory">
                            <el-input v-model.number="priceData.inventory" type="number" :disabled="priceData.skuParams.length > 0" :max="99999999"></el-input>
                        </el-form-item>
                        <el-form-item label="起购数量" prop="minBuyAmount">
                            <div class="tip-wrap">
                                <el-input v-model.number="priceData.minBuyAmount" :disabled="priceData.combinationAmount > 1" type="number" v-only-number="{max: 9999, min: 1, precision: 0}" @blur="handlePurchase"></el-input>
                                <div class="minBuyAmount-tip">
                                    <el-tooltip class="item" effect="dark" content="用户最低购买商品的数量" placement="top">
                                        <i class="el-icon-question"></i>
                                    </el-tooltip>
                                </div>
                            </div>
                        </el-form-item>
                        <div class="border-line"></div>
                    </div>
                </el-form-item>
                <el-form-item label="商品规格：">
                    <div class="price-size">
                        <ul>
                            <li v-for="(item,index) in priceData.replaceTemp" :key="index">
                                <div class="flex-start">
                                    <p class="price-size-label">规格名：</p>
                                    <el-select v-model="item.k" filterable @change="handleSelectChange" placeholder="请选择" class="price-size-input">
                                        <el-option
                                            v-for="o in storeSkuOptions"
                                            :disabled="o.disabled"
                                            :key="o.value"
                                            :label="o.label"
                                            :value="o.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="flex-start price-size-value-wrap">
                                    <p class="price-size-label">规格值：</p>
                                    <div class="flex-start price-size-value">
                                        <div v-for="(child, childIndex) in item.properties" :key="childIndex" class="price-size-content">
                                            <el-input v-model="child.v" class="price-size-input" @blur="handleBlur(index, childIndex)"></el-input>
                                            <div class="close-icon" v-if="item.properties.length > 1" @click="handleCloseSize(index,childIndex)"><i class="el-icon-error"></i></div>
                                        </div>
                                        <p class="price-size-add" @click="handleAddSize(index)">+ 添加规格值</p>
                                    </div>
                                </div>
                                <div class="close-icon" @click="handleCloseList(index)"><i class="el-icon-error"></i></div>
                            </li>
                        </ul>
                        <el-button plain @click="handleAddList" v-show="priceData.replaceTemp.length <3">添加规格</el-button>
                    </div>
                </el-form-item>
                <el-form-item label="规格明细：" v-if="priceData.replaceTemp.length > 0">
                    <div class="price-size-detail">
                        <el-table
                            :data="priceData.skuParams"
                            border
                            ref="table"
                            style="width: 100%"
                        >
                            <el-table-column
                                v-for="(column) in detailColumn"
                                :key="column.value"
                                :label="column.label"
                                :fixed="column.fixed || ''"
                                :min-width="column.width"
                                align="center"
                                :render-header="renderHeader"
                            >
                                <template slot-scope="scope">
                                    <div  v-if="column.input">
                                        <el-input 
                                            v-model="scope.row[column.value]" 
                                            :type="column.inputType || 'text'" 
                                            @blur="handleInput(column.value,scope)"  
                                            v-only-number="!column.onlyNumbel ? {type: 'none'} : {max: 9999, min: 1, precision: 0} "  
                                            :disabled="(column.value == 'minBuyAmount' && priceData.skuParams[scope.$index].combinationAmount > 1) || (column.value == 'combinationAmount' && priceData.skuParams[scope.$index].minBuyAmount > 1)"
                                            @mousewheel.native.prevent
                                        ></el-input>
                                    </div>
                                    <div v-else>
                                        {{ formatting(scope,column) }}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-form-item>
                <el-form-item label="库存计算：" prop="inventorySubtractType">
                    <div>
                        <el-radio-group v-model="priceData.inventorySubtractType">
                            <el-radio :label="1">付款减库存</el-radio>
                            <el-radio :label="2">拍下减库存</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!-- 商品描述 -->
        <div class="commodity-description">
            <div class="title">商品描述</div>
            <div class="flex-center description-info-form">
                <quill-editor ref="quillEditor" class="ql-editor-main" @input="onEditorInput" @imgup="handleUpImg">
                    <xm-dialog
                        :dialogTitle="dialog.title"
                        :dialogVisible="dialog.show"
                        :closeDisabled="dialog.loading"
                        :loading="dialog.loading"
                        @handleClose="handleCloseDialog"
                        @handleSure="handleSureDialog"
                    >
                        <upload-img
                            ref="uploadDialog"
                            :fileList="dialogData.sourceImgArr"
                            :limit="0"
                            :uploadUrl="uploadUrl"
                            @change="handleDialogChange"
                            @response="handleDialogResponse"
                        >
                        </upload-img>
                    </xm-dialog>
                </quill-editor>
                <!-- <div class="ql-snow ql-editor-cp">
                    <div class="max-text" :style="{height: editHeightHead, lineHeight: editHeightHead, opacity: originSourceDesc.length > 0 ? 1 : 0}" >最大字符数:<span>{{originSourceDesc.length}}</span>/25000</div>
                    <div class="ql-editor" v-loading="cpLoading" :style="{height: editHeightContent, minHeight: 0}" v-html="originSourceDesc"></div>
                </div> -->
            </div>
        </div>
        
        <!-- 其它信息 -->
        <div class="other-info">
            <div class="title">其它信息</div>
            <el-form :model="otherInfo" label-width="100px" label-position="left" ref="otherForm" class="other-info-form" :rules="otherRule">
                <el-form-item label="运费方式：" prop="postFeeTemplateId">
                    <div class="flex-start">
                        <div class="other-select"><select-menu :selectData.sync="otherInfo.postFeeTemplateId" :options="postFeeTemplateOption" :customParam="['templateName', 'templateId']"></select-menu></div>
                        <el-button size="mini" class="margin-right-10" :disabled="!otherInfo.postFeeTemplateId" plain @click="handleEditTemp">编辑运费模板</el-button>
                        <el-button size="mini" class="margin-right-10" plain @click="handleCreateTemp">新建运费模板</el-button>
                        <el-button size="mini" plain @click="handleRefreshTemp">刷新模板数据</el-button>
                    </div>
                </el-form-item>

                <el-form-item label="上架时间：" prop="issue" v-if="!(sourceId && otherInfo.issue)">
                    <div>
                        <el-radio-group v-model="otherInfo.issue">
                            <el-radio :label="true">立即上架售卖</el-radio>
                            <el-radio :label="false">暂时保存到待上架</el-radio>
                        </el-radio-group>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <div class="footer flex-center">
            <el-button class="margin-right-20"  type="primary" @click="handelSure">确定</el-button>
            <el-button plain @click="handelClose">返回</el-button>
        </div>

        <fixed-btn :btnNum="1">
            <a href="javascript:void(0)" @click="handelBtnSure">确定</a>
            <a href="javascript:void(0)" @click="handelBtnClose">返回</a>
        </fixed-btn>

        <!--查看详情-->
        <xm-dialog
            :dialogVisible.sync="addDialog.show"
            :dialogTitle="'新增' + addDialog.title"
            :sureClose="false"
            :loading="addDialog.loading"
            @handleSure="addDialogSure"
            @handleClose="addDialogClose"
        >
            <el-input v-model="addDialog.value" :placeholder="`请输入${addDialog.title}`"></el-input>
        </xm-dialog>

    </div>
</template>

<script>

import QuillEditor from '_c/QuillEditor';
import UploadImg from '_c/UploadImg';
import SelectMenu from "_c/SelectMenu";
import { columns, modalData } from './defaultData';
import { mapGetters, mapActions } from 'vuex';
import { uploadImgUrl } from '@/api/commodity/commodityEdit';
import XmDialog from '_c/XmDialog';
import FixedBtn from "_c/FixedBtn";
import { setInterval, setTimeout } from 'timers';
export default {
    components: {
        QuillEditor,
        UploadImg,
        XmDialog,
        FixedBtn,
        SelectMenu
    },
    
    name: 'CommodityEdit',

    activated() {
        this.$nextTick().then(() => {
            this.$refs.table.doLayout();
        })
    },

    data() {
        const _self = this;
        return {
            postFeeTemplateOption: [],
            editLoading: false,
            readyCategory: false,
            // 基本信息
            infoData: {
                sourceName: '',
                sellPoint: '',
                sourceImgArr: [],
                sourceImg: '',
                category: [],
                attributeParams: [],
                primaryCategoryId: "",
                secondaryCategoryId: "",
                thirdlyCategoryId: ""
            },

            //上传
            quillEditorSelection: '',
            uploadUrl: uploadImgUrl,
            uploadCount: 0,
            cascaderProps: {
                lazy: true,
                lazyLoad (node, resolve) {
                    _self.getCategory(node,resolve);
                }
            },
            infoRule: {
                sourceName: [{ required: true, message: '请输入商品名称 ', trigger: 'blur' }],
                sourceImgArr: [{ required: true, message: '请上传图片', trigger: 'blur' }],
                category: [{ required: true, message: '请选择类目', trigger: 'blur' }]
            },
            attuOption: [], // 属性名option
            attuOptionSave: [], // 属性名保存
            needAttu: true, // 是否需要填写属性值
            // 价格库存
            priceData: {
                minBuyAmount: 1,
                combinationAmount: 1,
                storeSourceId: '',
                sourcePrice: '',
                costPrice: '',
                inventory: '',
                originPrice: '',
                inventorySubtractType: 1,
                replaceTemp: [],
                skuParams: []
            },
            storeSkuOptions: [],
            skuOptions: [],
            detailColumn: [...columns],
            priceRule: {
                combinationAmount: [{ required: true, message: '请输入组合数量', trigger: 'blur' }],
                storeSourceId: [{ required: true, message: '请输入商品编码', trigger: 'blur' }],
                sourcePrice: [{ required: true, message: '请输入销售价', trigger: 'blur' }],
                costPrice: [{ required: true, message: '请输入成本价', trigger: 'blur' }],
                originPrice: [{ required: true, message: '请输入划线价', trigger: 'blur' }],
                inventory: [{ required: true, message: '请输入库存', trigger: 'blur' }],
                inventorySubtractType: [{ required: true, message: '请选择库存计算方式', trigger: 'blur' }],
            },

            // 商品描述
            originSourceDesc: '',
            sourceDesc: '',

            //  其它信息
            otherInfo: {
                postFeeType: 3,
                postFeeTemplateId: '',
                issue: true
            },

            otherRule: {
                postFeeTemplateId: [{ required: true, message: '请选择运费模板', trigger: 'blur' }],
                issue: [{ required: true, message: '请选择上架时间', trigger: 'blur' }]
            },

            editHeightHead: '',
            editHeightContent: '',

            dialog: {
                show: false,
                closeDisabled: false,
                loading: false,
                title: '请选择图片'
            },
            dialogUploadCount: 0,
            dialogData: {
                sourceImgArr: []
            },

            cpLoading: false,
            skuIdList: {},

            // 增加弹窗
            addDialog: {
                show: false,
                title: "",
                value: "",
                loading: false
            },

        };
    },

    computed: {
		...mapGetters([
            'sourceId',
            'upDateSourceId'
		])
	},


	beforeDestroy() {
        this.setSourceId('');
        this.setUpDateSourceId(false);
    },

    mounted() {
        this.init();
	},

    methods: {
        ...mapActions([
            'setSourceId',
            'setUpDateSourceId'
        ]),

        initData() {
            if(this.sourceId) {
                let data = { sourceId: this.sourceId };
                this.getSourceDetail(data);
            }else {
                this.initSourceData({});
            }
        },

        fNumber(num) {
            if(num === undefined || num === null || num === '') return '';
            const max = 99999999;
            num = Number(num);
            num = num > max ? max : num;
            return Math.abs(num);
        },

        fFloor(num) {
            if(num === undefined || num === null || num === '') return '';
            return Math.floor(Number(num));
        },

        fToFixed(num) {
            if(num === undefined || num === null || num === '') return '';
            return Number(Number(num).toFixed(2));
        },

        fStrLength(str) {
            if(str === undefined || str === null || str === '') return '';
            str = String(str);
            return str.length > 100 ? str.slice(0,100) : str;
        },

        async init() {
            await this.listSkuProperties();
            await this.getPostFeeTemplateOption();
            this.initData();
        },

        getPostFeeTemplateOption() {
            return this.$api.commodityEdit.all_postTemplate({storeId: 1}).then(res => {
                this.postFeeTemplateOption = res.data;
            })
        },

        deepCopy(obj) {
            function deepCopy(obj){
                let newObj = obj.constructor === Array ? []: {}   //判断是深拷贝对象还是数组
                for(let i in obj){
                    if(typeof obj[i] === 'object') {
                        newObj[i] = deepCopy(obj[i])    //  如果要拷贝的对象的属性依然是个复合类型，递归
                    } else {
                        newObj[i] = obj[i]
                    }
                }
                return newObj
            }

            return deepCopy(obj);
        },

        handleCombination() {
            if(this.priceData.combinationAmount > 1) {
                this.priceData.minBuyAmount = 1;
            }
            if(!this.priceData.combinationAmount) {
                this.priceData.combinationAmount = 1;
            }
        },

        handlePurchase() {
            if(this.priceData.minBuyAmount > 1) {
                this.priceData.combinationAmount = 1;
            }
            if(!this.priceData.minBuyAmount) {
                this.priceData.minBuyAmount = 1;
            }
        },

        listSkuProperties() {
            return this.$api.commodityEdit.listSkuProperties().then(res => {
                let arr = res.data.data || [];
                arr = arr.map(item => {
                    return {
                        label: item.name,
                        value: item.id
                    }
                })
                arr.unshift({
                    label: "默认",
                    value: 2696
                })
                this.storeSkuOptions = this.deepCopy(arr);
                this.skuOptions = this.deepCopy(arr);
            })
        },

        getSourceDetail(data) {
            this.editLoading = true;
            return this.$api.commodityEdit.getSourceDetail(data).then(res => {
				let resData = res.data && res.data.responseFuture && res.data.responseFuture.data || {};
				let skuIdString = res.data && res.data.skuIdString || [];
				skuIdString.forEach((item,index) =>{
					resData.skuParams[index].skuId = item;
				})
                this.initSourceData(resData);
            }).finally(() => {
                this.editLoading = false;
            });
        },

        sortAttr() {
            if (rev == undefined) {
                rev = 1;
            } else {
                rev = rev ? 1 : -1;
            }
            return function(a, b) {
                a = a[attr];
                b = b[attr];
                if (a < b) {
                    return rev * -1;
                }
                if (a > b) {
                    return rev * 1;
                }
                return 0;
            };
        },

        async initSourceData(resData) {
            await this.listSkuProperties();
            let sourceImgArr = [];
            let sourceImg = resData.sourceImg || '';
            if(sourceImg) {
                sourceImg.split(';').forEach(item => {
                    if(item) sourceImgArr.push({url: item});
                })
            }
            let category = [];
            let attributeParams = [];
            
            if(resData.categoryAttributes) {
                resData.categoryAttributes.forEach(item => {
                    let obj = {
                        id: item.attributeId,
                        valIds: item.attributeVals.map(child => child.valId)
                    }
                    attributeParams.push(obj);
                })
            }
            
            if(resData.primaryCategoryId) category.push(Number(resData.primaryCategoryId));
            if(resData.secondaryCategoryId) category.push(Number(resData.secondaryCategoryId));
            if(resData.thirdlyCategoryId) category.push(Number(resData.thirdlyCategoryId));

            if(category.length > 0) {
                await this.listAttributeOf(category[category.length - 1]);
                this.$refs.infoForm.clearValidate();
            }

            let infoData = {
                sourceName: resData.sourceName || '',
                sellPoint: resData.sellPoint || '',
                sourceImgArr: sourceImgArr || [],
                sourceImg: resData.sourceImg || '',
                category: category || [],
                attributeParams: attributeParams || []
            }

            let otherInfo = {
                postFeeType: 3,
                postFeeTemplateId: resData.postFeeTemplateId || '',
                issue: resData.sourceStatus == 0
            }

            let replaceTemp = [];
            let skuIdList = {};
            if(resData.skuParams) {
                resData.skuParams = resData.skuParams.sort((a, b) => {
                    a = a.properties[0].vid;
                    b = b.properties[0].vid;
                    if (a < b) {
                        return -1;
                    }
                    if (a > b) {
                        return 1;
                    }
                });
                resData.skuParams.forEach(item => {
                    item.properties.forEach(child => {
                        let skuObj = this.skuOptions.find(o => o.label == child.k);
                        let value = '';
                        if(skuObj) {
                            value = skuObj.value;
                        }else{
                            return this.$msg(`无法查找规格名：${child.k}`, 'error', 5000)
                        }
                        let index = replaceTemp.findIndex(i => {return i.k == value});
                        if(index > -1 ) {
                            let childIndex = replaceTemp[index].properties.findIndex(c => c.label == child.vid);
                            if(childIndex == -1) replaceTemp[index].properties.push({label: child.vid, v: child.v});
                        }else{
                            let obj =  {
                                k: value,
                                properties: [{label: child.vid, v: child.v}]
                            }
                            replaceTemp.push(obj);
                        }
                    })
                    skuIdList[item.storeSkuId] = item.skuId; // 简历映射关系
                })
            }


            let priceData =  {
                minBuyAmount: this.fNumber(resData.minBuyAmount) || 1,
                combinationAmount: this.fNumber(resData.combinationAmount) || 1,
                storeSourceId: resData.storeSourceId || '',
                sourcePrice: this.fNumber(resData.sourcePrice),
                costPrice: this.fNumber(resData.costPrice),
                inventory: this.fNumber(resData.inventory),
                originPrice: this.fNumber(resData.originPrice),
                inventorySubtractType: this.fNumber(resData.inventorySubtractType) || 1,
                replaceTemp: replaceTemp,
                skuParams: resData.skuParams || []
            }

            this.infoData = infoData;
            this.uploadCount = 0;
            this.$refs.quillEditor.content = resData.originSourceDesc || '';
            this.sourceDesc = resData.sourceDesc || ''; // 保存富文本生成的图片
            this.otherInfo = otherInfo;
            this.priceData = priceData;
            this.skuIdList = skuIdList; 
            this.handleSelectChange();
            this.$nextTick().then(() => {
                this.readyCategory = true; //类目数据获取完毕
                window.bus.$emit("backToZero");
            })
        },

        // 获取类目属性
        listAttributeOf(categoryId) {
            return this.$api.commodityEdit.listAttributeOf({categoryId: categoryId}).then((res) => {
                this.attuOption = res.data.data;
                this.attuOptionSave = res.data.data;
                let infoRule = {
                    sourceName: [{ required: true, message: '请输入商品名称 ', trigger: 'blur' }],
                    sourceImgArr: [{ required: true, message: '请上传图片', trigger: 'blur' }],
                    category: [{ required: true, message: '请选择类目', trigger: 'blur' }]
                }
                // if(res.data.data.length > 0) {
                //     infoRule.attributeParams = [{ required: true, message: '请选择商品属性', trigger: 'blur' }]
                // }
                this.needAttu = res.data.data.length > 0;
                this.infoRule = infoRule;
                this.$nextTick().then(() => {
                    this.$refs.infoForm.clearValidate();
                })
                
            })
        },

        // 获取类目属性值
        getAttuOptionChild(id) {
            if(!id) return;
            
            let obj = this.attuOptionSave.find(item => item.id == id);
            let arr = obj.values || [];
            return arr;
        },

        // 属性选择
        handleAttuChange(index) {
            let attuOption = this.deepCopy(this.attuOptionSave);
            let valArr = [];
            this.infoData.attributeParams.forEach(item => {
                valArr.push(item.id);
            })
            attuOption.forEach(item => {
                if(valArr.includes(item.id)) {
                    item.disabled = true;
                }
            })
            this.$set(this.infoData.attributeParams[index], 'valIds', []);
            this.attuOption = attuOption;
            if(this.infoData.attributeParams.length > 0) {
                this.$refs.attributeForm.clearValidate();
            }
        },
    
        // 获取类目
        async getCategory(node, resolve) {
            if(this.infoData.category.length == 0 && this.sourceId) { // 用于更新回显
                let resolveRequest = () => {
                    return new Promise((resolve,reject) =>{
                        let _this = this;
                        function readData(cb) {
                            if(_this.readyCategory) {
                                cb && cb()
                                return
                            }
                            setTimeout(() => {
                                readData(cb)
                            },200)
                        }
                        readData(resolve)
                    })
                }
                await resolveRequest();
            }

            const { level } = node;
            switch(level) {
                case 0:
                    return this.$api.commodityList.listRootCategory().then((res) => {
                        let data = res.data;
                        const nodes = data.map(item => ({
                            value: item.id,
                            label: item.name,
                            leaf: item.leaf
                        }));
                        resolve(nodes);
                    })
                default:
                    return this.$api.commodityList.listSubCategory({id: node.data.value}).then((res) => {
                        let data = res.data;
                        let hasSecond = data.some(item => item.depth == 2);
                        if(hasSecond) data = data.filter(item => item.depth == 2);
                        const nodes = data.map(item => ({
                            value: item.id,
                            label: item.name,
                            leaf: item.leaf
                        }));
                        resolve(nodes);
                    })
            }
        },

        clearAttu() {
            this.listAttributeOf(this.infoData.category[this.infoData.category.length - 1]);
            this.infoData.attributeParams = [];
        },

        handleAddValue(type, index) {
            if(this.infoData.category.length == 0) {
                return this.$msg("请先选择类目");
            }

            let addDialog = {
                show: true,
                title: '',
                value: "",
                type: type
            };

            switch(type) {
                case 2:
                    addDialog.title = "属性名";
                    break
                case 3:
                    if(!this.infoData.attributeParams[index].id) {
                        return this.$msg("请先选择属性名");
                    }
                    addDialog.title = "属性值";
                    addDialog.attributeId = this.infoData.attributeParams[index].id;
                    break
            }

            this.addDialog = addDialog;
        },

        addDialogSure() {
            if(!this.addDialog.value) {
                return this.$msg('请输入新增的' + this.addDialog.title)
            }

            let param = {
                storeId: 1
            }

            this.addDialog.loading = true;
            switch(this.addDialog.type) {
                case 2:
                    param.categoryId = this.infoData.category[this.infoData.category.length - 1];
                    param.name = this.addDialog.value;
                    this.$api.commodityEdit.createAttribute({param}).then((res) => {
                        this.addDialog.show = false;
                        this.listAttributeOf(this.infoData.category[this.infoData.category.length - 1]);
                        this.$msg('属性名新增成功', 'success')
                    }).finally(() =>{
                        this.addDialog.loading = false;
                    })
                    break;
                case 3:
                    param.attributeId = this.addDialog.attributeId;
                    param.value = this.addDialog.value;
                    this.$api.commodityEdit.createAttributeVal({param}).then((res) => {
                        this.addDialog.show = false;
                        this.listAttributeOf(this.infoData.category[this.infoData.category.length - 1]);
                        this.$msg('属性值新增成功', 'success')
                    }).finally(() =>{
                        this.addDialog.loading = false;
                    })
                    break;
            }
        },

        addDialogClose() {
            
        },

        // 添加属性
        handleAddAttu() {
            if(this.infoData.category.length == 0) {
                return this.$msg("请先选择类目")
            }
            if(this.infoData.attributeParams.length == 0) {
                return this.listAttributeOf(this.infoData.category[this.infoData.category.length - 1]).then(() => {
                    this.infoData.attributeParams.push({id: '', valIds: []})
                });
            }
            this.infoData.attributeParams.push({id: '', valIds: []})
        },

        // 删除属性
        handleCloseAttu(index) {
            this.infoData.attributeParams.splice(index, 1);
        },

        // 删除属性值
        handleCloseAttuValue(index, childIndex) {
            this.$set(this.infoData.attributeParams[index], 'valIds', []);
        },

        handleResponse(response, uid) {
            this.uploadCount -= 1;
            if(response.data && response.data[0].code === 0) {
                let sourceImgArr = this.infoData.sourceImgArr;
                let index = sourceImgArr.findIndex(item => item.uid == uid);
                sourceImgArr[index].url = response.data[0].message;
                this.$set(this.infoData, 'sourceImgArr', sourceImgArr);
            }
            // if(this.uploadCount <= 0) {
            //     this.handlePostForm();
            // }
        },

        onEditorInput(originSourceDesc) {
            this.originSourceDesc = originSourceDesc;
        },

        handleSelectChange() {
            let valArr = [];
            let storeSkuOptions = [];
            let skuOptions = this.deepCopy(this.skuOptions);
            this.priceData.replaceTemp.forEach(item => {
                if(item.k) {
                    valArr.push(item.k)
                }
            })
            skuOptions.forEach(item => {
                if(valArr.includes(item.value)) {
                    item.disabled = true;
                }
                storeSkuOptions.push(item);
            })
            this.storeSkuOptions = storeSkuOptions;
            this.formatResult();
            this.handleInput();
        },

        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        },

        handleImgChange(fileList) {
			this.infoData.sourceImgArr = fileList;
			if(fileList.length > 0) {
				this.$refs.imgForm.clearValidate();
			}
        },

        handleAddList() {
            let obj =  {
                k: "",
                properties: [{label: (this.priceData.replaceTemp.length + 1) * 1000 , v: ''}]
            }
            this.priceData.replaceTemp.push(obj);
        },

        handleCloseList(index) {
            this.priceData.replaceTemp.splice(index, 1);
            this.handleSelectChange();
        },

        handleAddSize(index) {
            if(!this.priceData.replaceTemp[index].k) {
                return this.$msg('请选填写规格名');
            }
            let properties = this.priceData.replaceTemp[index].properties;
            let label = properties.length > 0 ?  properties[properties.length - 1].label + 1 : 1000 * (index + 1) + properties.length; //每次+1，保证不同
            let obj = {label: label, v: ''};
            properties.push(obj);
            this.$set(this.priceData.replaceTemp[index], 'properties', properties);
        },

        handleCloseSize(index, childIndex) {
			let k = this.priceData.replaceTemp[index].k;
			let value = this.priceData.replaceTemp[index].properties[childIndex].v;
			if(value !== undefined) {
				let arr = this.priceData.skuParams.filter(item => item[k] !== value);
				this.$set(this.priceData, "skuParams", arr);
			}
			this.priceData.replaceTemp[index].properties.splice(childIndex, 1);
            this.formatResult();
            this.handleInput();
        },

        // 二维数组排列组合
		doExchange(arr) { //  [[{"颜色": 1},{"颜色": 2}],[{"尺寸": 1},{"尺寸": 2}],[{"高度": 1}, {"高度": 2}]]
			let results = [];
            let result = [];
            
			function doExchange(arr, index){
				for (let i = 0; i<arr[index].length; i++) {
					result[index] = arr[index][i];
					if (index != 0) {
						doExchange(arr, index - 1);
					} else {
						let obj = {
							storeSkuId: '',
							sourcePrice: '',
                            costPrice: '',
                            inventory: '',
                            combinationAmount: 1,
                            minBuyAmount: 1
						}
						result.forEach(item => {
							obj = Object.assign({},obj,item)
						})
						results.push(obj)
					}
				}
            }
            if(arr.length > 0) {
                doExchange(arr, arr.length - 1); //最后的放在第一位
            }
			return results;
		},

		handleBlur(index, childIndex) {
            let count = 0;
            let replaceTemp = this.priceData.replaceTemp;
            let value = replaceTemp[index].properties[childIndex].v;
            let label = replaceTemp[index].properties[childIndex].label;
            for(let i=0; i<replaceTemp.length; i++) {
                let properties = replaceTemp[i].properties;
                for(let y=0; y<properties.length; y++) {
                    if(properties[y].v == value && value !== '') {
                        ++count;
                        if(count >= 2) {
                            this.priceData.replaceTemp[index].properties.splice(childIndex, 1, {label: label, v: ''});
                            this.$msg('规格值不允许重复');
                            this.formatResult();
                            this.handleInput();
                            return
                        }
                    }
                }
            }
            console.log(this.priceData.replaceTemp)
            this.formatResult();
			this.handleInput();
		},
        
        // 组装数据 （表格数据）
        formatResult() {
            let columnArr = [...columns];
            let exArr = []; // [[{"颜色": 1},{"颜色": 2}],[{"尺寸": 1},{"尺寸": 2}],[{"高度": 1}, {"高度": 2}]]
            this.priceData.replaceTemp.forEach((item,index) => {
                // 此处k代表规格名的value, v代表规格名下的值
                if(item.k && item.properties[0].v || item.k && item.properties[0].v === '0' || item.k && item.properties[0].v === 0) {
                    let label = this.skuOptions.find(o => o.value == item.k).label;
                    if(columnArr.findIndex(i => i.value == label) == -1) {
                        let columnTemp = {
                            label: label,
                            value: label,
                            width: 100
                        };
                        columnArr.push(columnTemp);
					}
					let vArr = [];
					item.properties.forEach((v,i) => {
						if(v.v) {
							let vObj = {
                                [label]: v.v,
							}
							vArr.push(vObj);
						}
					})
					exArr.push(vArr);
                }
			})

            let result = this.doExchange(exArr);  
			let skuParams = this.deepCopy(this.priceData.skuParams);

            // 组装数据
            let key = ["storeSkuId","sourcePrice","costPrice","inventory", "combinationAmount", "minBuyAmount"];
            result.forEach(item => {
                Object.keys(item).forEach(k => {
                    if(!key.includes(k)) {
                        let kid = this.skuOptions.find(o => o.label == k).value; // 获取规格名下拉值，此处k为下拉的label
                        let tempObj = this.priceData.replaceTemp.find(o => o.k == kid).properties; // 根据下拉值找到对应的分组数据
                        let vid = tempObj.find(o => o.v == item[k]).label; // 找到分组下面规格值对应值一样的vid;
                        let kv = {k: k, kid: kid, v: item[k], vid: vid};
                        if(!item.properties) {
                            item.properties = [kv];
                        }else{
                            item.properties.push(kv);
                        }
                    }
                })
            })

            //绑定之前的输入
            result.forEach(item => {
                let saveObj = skuParams.find(i => {
                    let count = 0;
                    for(let x=0; x<i.properties.length; x++) {
                        if(item.properties.findIndex(y => y.vid == i.properties[x].vid) > -1) {
                            ++count;
                        }else{
                            break;
                        };
                    }

                    return (count == i.properties.length && count != 0);
                })
                if(saveObj) {
                    item.storeSkuId = this.fStrLength(saveObj.storeSkuId);
                	item.sourcePrice =  this.fToFixed(this.fNumber(saveObj.sourcePrice));
                	item.costPrice =  this.fToFixed(this.fNumber(saveObj.costPrice));
                    item.inventory =  this.fFloor(this.fNumber(saveObj.inventory));
                    item.combinationAmount = this.fNumber(saveObj.combinationAmount) || 1;
                    item.minBuyAmount = this.fNumber(saveObj.minBuyAmount) || 1;
                }
            })

            this.detailColumn = columnArr.reverse();
            if(result.length > 0) {
                this.clearFormItemValidate();
            }
            this.priceData.skuParams = result;
            console.log('result', result);
        },

        handleInput(column, scope) { // 校验输入以及同步父级数据

            // 起购大于1时，组合数量只能为1
            if(column == 'minBuyAmount' && this.priceData.skuParams[scope.$index].minBuyAmount > 1) {
                this.priceData.skuParams[scope.$index].combinationAmount = 1;
            }

            // 组合大于1时，起购数为空
            if(column == 'combinationAmount' && this.priceData.skuParams[scope.$index].combinationAmount > 1) {
                this.priceData.skuParams[scope.$index].minBuyAmount = 1;
            }
            
            // 组合至少为1
            if(column == 'combinationAmount' && !this.priceData.skuParams[scope.$index].combinationAmount) {
                this.priceData.skuParams[scope.$index].combinationAmount = 1;
            }

            // 起购至少为1
            if(column == 'minBuyAmount' && !this.priceData.skuParams[scope.$index].minBuyAmount) {
                this.priceData.skuParams[scope.$index].minBuyAmount = 1;
            }

            if(column == 'storeSkuId') {
                let count = 0
                let index = scope.$index;
                let skuParams = this.priceData.skuParams;
                for(let i=0; i<skuParams.length; i++) {
                    if(scope.row.storeSkuId == skuParams[i].storeSkuId && scope.row.storeSkuId !== '') {
                        ++count;
                        if(count >= 2) {
                            skuParams[index].storeSkuId = '';
                            this.$set(this.priceData.skuParams, index, skuParams[index]);
                            return this.$msg('产品规格ID不允许重复');
                        }
                    }
                }
                // this.priceData.skuParams[scope.$index].skuId && delete this.priceData.skuParams[scope.$index].skuId; //修改就删除
            }
            
            // 统计编码明细中的值
			if (this.priceData.skuParams.length > 0) {
				let sourcePrice = undefined;
				let costPrice = undefined;
				let inventory = 0;
				this.priceData.skuParams.forEach(item => {
					if(item.sourcePrice || item.sourcePrice === '0') {
						sourcePrice = sourcePrice === undefined  ? item.sourcePrice : Math.min(item.sourcePrice, sourcePrice)
					}
					if(item.costPrice || item.sourcePrice === '0') {
						costPrice = costPrice === undefined ? item.costPrice : Math.min(item.costPrice, costPrice)
					}
					if(item.inventory || item.sourcePrice === '0'){
						inventory += Number(item.inventory);
					}
				})
				this.priceData.sourcePrice = this.fToFixed(this.fNumber(sourcePrice)) || 0;
				this.priceData.costPrice = this.fToFixed(this.fNumber(costPrice)) || 0;
				this.priceData.inventory = this.fFloor(this.fNumber(inventory)) || 0;
            }
        },

        clearFormItemValidate() {
            this.$refs.priceForm.clearValidate(['sourcePrice', 'costPrice', 'inventory']);
        },

        handlePreUpload() {
            let uploadCount = 0;
            this.infoData.sourceImgArr.forEach(item => {
                if(item.raw && item.url.includes('blob:')) ++uploadCount;
            })
            this.uploadCount = uploadCount;
            this.editLoading = true;
            
            if(uploadCount > 0) {
                this.$refs.upload.upLoadSure();
            }else{
                this.handlePostForm();
            }
        },

        handlePostForm () {
            let imgStr = '';
            let imgcount = 0;
            this.infoData.sourceImgArr.forEach(item => {
                if(!item.url.includes('blob:')){
                    imgStr = `${imgStr}${item.url};`;
                    ++imgcount
                }
            })

            this.infoData.sourceImg = imgStr;
            if(this.infoData.category[0]) this.infoData.primaryCategoryId = this.infoData.category[0];
            if(this.infoData.category[1]) this.infoData.secondaryCategoryId = this.infoData.category[1];
            if(this.infoData.category[2]) this.infoData.thirdlyCategoryId = this.infoData.category[2];
            this.infoData.attributeParams = this.infoData.attributeParams.filter(item => { return item.id});
            let param = Object.assign({sourceDesc: this.originSourceDesc , originSourceDesc: this.originSourceDesc, storeId: 1}, this.infoData, this.priceData, this.otherInfo);
            let formatArr = ['sourcePrice', 'costPrice', 'inventory', 'originPrice', 'combinationAmount', 'minBuyAmount'];
            let formatFloorArr = ['inventory'];
            let formatFixedArr = ['sourcePrice', 'costPrice', 'originPrice'];
            formatArr.forEach(item => {
                param[item] = this.fNumber(param[item]);
                if(formatFloorArr.includes(item)) {
                    param[item] = this.fFloor(param[item]);
                }else if(formatFixedArr.includes(item)) {
                    param[item] = this.fToFixed(param[item]);
                }
            })

            //建立映射关系
            if(Object.keys(this.skuIdList).length > 0) {
                param.skuParams.forEach(item => {
                    if(this.skuIdList[item.storeSkuId]) {
                        item.skuId = this.skuIdList[item.storeSkuId]
                    }
                })
            } 
            
            let data = {
                "param": param
            }
            
            param.postFee = 10;

            if(this.sourceId) {
                data.param.sourceId = this.sourceId;
                this.handleUpdate(data);
            }else{
                this.handleCreate(data);
            }
        },

        handleCreate(data) {
            this.$api.commodityEdit.createSource(data).then(res => {
                if(res.data.code === 0) {
                    this.goList();
                }else{
                    this.$msg("创建失败", 'error');
                }
            }).finally(() => {
                this.editLoading = false;
            })
        },

        handleUpdate(data) {
            this.$api.commodityEdit.updateSource(data).then(res => {
                if(res.data.code === 0) {
                    this.goList();
                }else{
                    this.$msg("更新失败", 'error');
                }
            }).finally(() => {
                this.editLoading = false;
            })
        },

        goList() {
            this.setSourceId('');
            this.$emit('loadData');
        },

        handelSure() {
			new Promise((resolve, reject) => {
				this.$refs.infoForm.validate((valid) =>{
                    if(valid) {
                        if(this.needAttu) {
                            this.infoData.attributeParams.forEach(item => {
                                // if(!item.id) {
                                //     reject({msg: '请选择商品属性'});
                                // }

                                if(item.id && item.valIds.length == 0) {
                                    reject({msg: '请选择商品属性值，无合适属性值可不选属性'});
                                }
                            })
                        }else{
                           this.infoData.attributeParams = []; 
                        }
                        resolve(valid);
                    }else{
                        reject(valid);
                    }
                })
			}).then(res1 => {
				new Promise((resolve, reject) => {
					this.$refs.priceForm.validate((valid) => {
						if(valid) {
                            this.priceData.skuParams.forEach(item => {
                                if(this.$util.CommonUtils.judgeObjSomeNull(item)) {
                                    reject({msg: '规格明细需全部填写'});
                                }
                            })
                            resolve(valid);
                        }else{
                            reject(false);
                        }
					})
				}).then(res2 => {
                    if(!this.originSourceDesc) return this.$msg("请填写商品描述", "error");
                    if(this.originSourceDesc.length > 25000) return this.$msg("商品描述超过最大限制", "error");
                    this.$refs.otherForm.validate((valid) => {
                        if(valid) {
                            this.handlePreUpload();
                        }else{
                            this.$msg("其它信息未填写完整", "error");
                        }
                    })
                }).catch(err2 => {
                    if(err2) {
                        this.$msg(err2.msg, "error");
                    }else{
                        this.$msg("价格库存未填写完整", "error");
                    }

                })
			}).catch(err1 => {
                if(err1) {
                    this.$msg(err1.msg, "error");
                }else{
                    this.$msg("基本信息未填写完整", "error");
                }
            })
        },

        handelBtnSure() {
            let conStr = `是否提交`;
            this.$confirm(conStr, "提示", {
                confirmButtonText: "提交",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.handelSure();
            }).catch(err => {
                console.log(err);
            });
        },

        handelBtnClose() {
            let conStr = `是否返回`;
            this.$confirm(conStr, "提示", {
                confirmButtonText: "返回",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.handelClose();
            }).catch(err => {
                console.log(err);
            });
        },

        handleCloseDialog() {
            if(this.dialog.loading) {
                return this.$msg("正在上传图片，请稍等");
            }
            this.dialog = {
                show: false,
                closeDisabled: false,
                loading: false,
            },
            this.dialogUploadCount =  0;
            this.dialogData = {
                sourceImgArr: []
            };
        },

        handleSureDialog() {
            let dialogUploadCount = 0;
            this.dialogData.sourceImgArr.forEach(item => {
                if(item.raw && item.url.includes('blob:')) ++dialogUploadCount;
            })

            this.dialogUploadCount = dialogUploadCount;
            this.dialog.loading = true;
            if(dialogUploadCount > 0) {
                this.$refs.uploadDialog.upLoadSure();
            }else{
                this.$msg('请选择图片');
                this.dialog.loading = false;
            }
        },

        handleUpImg() {
            let editor = this.$refs.quillEditor.editor;
            let selection = editor.getSelection();
            if(selection) {
                this.quillEditorSelection = selection.index;
            }else{
                this.quillEditorSelection = '';
            }
            this.dialog.show = true;
        },

        handleDialogChange(fileList) {
            this.dialogData.sourceImgArr = fileList;
        },

        handleDialogResponse(response, uid) {
            this.dialogUploadCount -= 1;
            if(response.data && response.data[0].code === 0) {
                let sourceImgArr = this.dialogData.sourceImgArr;
                let index = sourceImgArr.findIndex(item => item.uid == uid);
                sourceImgArr[index].url = response.data[0].message;
                this.$set(this.dialogData, 'sourceImgArr', sourceImgArr);
            }

            if(this.dialogUploadCount <= 0) {
                this.dialogData.sourceImgArr.forEach(item => {
                    let editor = this.$refs.quillEditor.editor;
                    let imgUrl = item.url;
                    let line = editor.getLines();
                    let length = editor.getLength();
                    let position = this.quillEditorSelection;
                    if(!position){
                        editor.setSelection(length);
                        position = editor.getSelection().index;
                    }
                    
                    editor.insertEmbed(position, 'image', imgUrl);
                    editor.setSelection(position + 1);
                })
                this.dialog.loading = false;
                this.handleCloseDialog();
            }
        },

        handelClose() {
            this.$emit('close');
        },

        handelRefresh() {
            window.bus.$emit('refreshSelectedTag', this.$route);
        },

        handleEditTemp() {
            let host = location.host;
            let hash = `/#/freight?type=update&templateId=${this.otherInfo.postFeeTemplateId}`;
            let url = 'http://' + host + hash;
            window.open(url, '_blank');
        },

        handleCreateTemp() {
            let host = location.host;
            let hash = '/#/freight?type=create';
            let url = 'http://' + host + hash;
            window.open(url, '_blank');
        },

        handleRefreshTemp() {
            this.editLoading = true;
            this.getPostFeeTemplateOption().finally(() => {
                this.editLoading = false;
            });
        },

        formatting(scope, column) {
			if (this.$util.CommonUtils.isEmptyOrNull(scope.row[column.value]) && scope.row[column.value] !== 0){
				return "-";
			}

			return scope.row[column.value];
        },

        handleClick(label) {
            if(this.priceData.skuParams.length == 0) return;
            let key = '';
            switch(label) {
                case '销售价':
                    key = 'sourcePrice'
                    break;
                case '成本价':
                    key = 'costPrice'
                    break;
                case '库存':
                    key = 'inventory'
                    break;
            }
            let initData = this.priceData.skuParams[0][key];
            initData = key == 'inventory' ? (this.fFloor(this.fNumber(initData))) : (this.fToFixed(this.fNumber(initData)));
            this.priceData.skuParams.forEach(item => {
                item[key] = initData
            })
            this.handleInput();
        },

        renderHeader(h, { column }) {
            // console.log(column)
            let tableColumn = this.detailColumn.find(item => {
                return column.label === item.label;
            })
            let headerFormat = tableColumn.headerFormat;
            let tipsFormat = tableColumn.tipsFormat;
            if(headerFormat) {
                if(column.label == "产品规格ID") {
                    return (
                        <div class="table-header">
                            <p>
                                <span>*</span>
                                {[column.label]}
                            </p>
                        </div>
                    )
                }
                return (
                    <div class="table-header">
                        <p>
                            <span>*</span>
                            {[column.label]}
                            <i class="el-icon-caret-bottom" title="基于第一项的值复制整列" onClick={() => {this.handleClick(column.label)}}></i>
                        </p>
                    </div>
                )
            }else if(tipsFormat == 'combinationAmount') {
                return (
                    <p class="table-header">
                        <span>*</span>
                        {[column.label]}
                        <div class="table-combinationAmount-tip">
                            <el-tooltip class="item" effect="dark" content="用户下单数量为1时，实际销售该商品SKU的数量" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </div>
                    </p>
                )
                
            }else if(tipsFormat == 'minBuyAmount') {
                return (
                    <p class="table-header">
                        {[column.label]}
                        <div class="table-minBuyAmount-tip">
                            <el-tooltip class="item" effect="dark" content="用户最低购买商品SKU的数量" placement="top">
                                <i class="el-icon-question"></i>
                            </el-tooltip>
                        </div>
                    </p>
                )
            }else{
                return h("div", [column.label]);
            }
        }

    },
    watch: {

    }
};
</script>
<style lang='scss' scoped>
    @import "index";
</style>

<style lang='scss'>
    .commodity-edit {
        .base-info-attribute-input {
            .el-input {
                height: auto;
            }
        }
        .price-inventory {
            .price-detail {
                .el-form-item__label {
                    width: 100% !important;
                    text-align: center;
                    line-height: 40px;
                    margin-bottom: 20px;
                }
                .el-form-item {
                    display: inline-block;
                    margin-right: 20px;
                }
            }

            .el-form-item {
                display: flex;
                margin-right: 0px;
            }

            .el-form-item__label {
                min-width: 100px;
            }
            .el-form-item__content {
                width: 100%;
            }
        }
        .el-upload-list__item {
            transition: none;
        }
        
        .table-header {
            position: relative;
            span {
                margin-right: 3px;
                color: #f56c6c;
            }
            .el-icon-caret-bottom {
                cursor: pointer;
                &:hover {
                    color: #267AFA;
                }
            }

            .table-combinationAmount-tip {
                position: absolute;
                left: 50%;
                top: -4px;
                margin-left: 25px;
                color: #606266;
                &:hover {
                    color: #3d3e41;
                }
            }

            .table-minBuyAmount-tip {
                position: absolute;
                    left: 50%;
                    top: -4px;
                    margin-left: 20px;
                color: #606266;
                &:hover {
                    color: #3d3e41;
                }
            }
        }

        .other-info-form {
            .el-form-item__content {
                margin-left: 60px;
                width: 600px;
            }
        }
    }

</style>
