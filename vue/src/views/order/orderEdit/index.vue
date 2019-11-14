<!--  -->
<template>
    <div class="order-edit">
        <p class="order-edit-title">订单详情</p>
        <el-row type="flex" justify="space-between">
            <el-col :span="9" class="order-edit-title-list">
                <div class="flex-start">
                    <p>订单号：</p>
                    <p>{{formatData(detailData, 'orderId')}}</p>
                </div>
                <div class="flex-start">
                    <p>订单类型：</p>
                    <p>{{formatSpcData(detailData, 'orderType')}}</p>
                </div>
                <div class="flex-start"> 
                    <p>订单状态：</p>
                    <p>{{formatSpcData(detailData, 'orderStatus')}}</p>
                </div>
                <!-- <div class="flex-start">
                    <p>支付方式：</p>
                    <p>微信支付</p>
                </div> -->
                <div class="flex-start">
                    <p>下单时间：</p>
                    <p>{{formatData(detailData, "orderTime")}}</p>
                </div>
                <div class="flex-start">
                    <p>店铺：</p>
                    <p>{{formatData(detailData, "storeName")}}</p>
                </div>
            </el-col>
            <el-col :span="6" class="order-edit-title-list">
                <div class="flex-start">
                    <p>商品总价：</p>
                    <p>{{formatValue(detailData.sourcePayPrice)}}</p>
                </div>
                <div class="flex-start">
                    <p>运费：</p>
                    <p>{{formatData(detailData, "postFee")}}</p>
                </div>
                <!-- <div class="flex-start">
                    <p>优惠：</p>
                    <p>微信支付</p>
                </div>
                <div class="flex-start">
                    <p>抵扣</p>
                    <p>0.00</p>
                </div> -->
                <div class="flex-start">
                    <p>订单金额</p>
                    <p class="money">{{formatValue(detailData.sourcePayPrice)}}</p>
                </div>
            </el-col>
            <el-col :span="8" class="order-edit-title-list">
                <div class="flex-start">
                    <p>收货人：</p>
                    <p>{{formatData(detailData, "address.receiverName")}}</p>
                </div>
                <div class="flex-start">
                    <p>联系电话：</p>
                    <p>{{formatData(detailData, "address.receiverTel")}}</p>
                </div>
                <div class="flex-start align-start">
                    <p>收货地址：</p>
                    <p>{{formatSpcData(detailData, 'address')}}</p>
                </div>
            </el-col>
        </el-row>

        <div class="order-edit-list">
            <el-row class="order-list-title">
                <el-col :span="12">
                    <p>商品名称/ID</p>
                </el-col>
                        
                <el-col :span="6">
                    <p>产品（规格）/ID</p>
                </el-col>

                <el-col :span="6">
                    <p>单价/数量</p>
                </el-col>
            </el-row>

            <el-row class="order-list-card" type="flex" v-for="(item,index) in detailData.children" :key="index">
                <el-col :span="12" class="order-list-card-item flex-start">
                    <img :src="item.sourceImg" alt="">
                    <div >
                        <p class="margin-bottom">{{formatValue(detailData.sourceName)}}</p>
                        <p>{{formatValue(detailData.sourceId)}}</p>
                    </div>
                </el-col>
                        
                <el-col :span="6" class="order-list-card-item flex-column">
                    <p class="margin-bottom txt-center order-num"><span v-if="detailData.combinationNum && detailData.combinationNum > 1 && detailData.storeSkuId">{{ detailData.combinationNum + 'x '}}</span>{{formatValue(detailData.storeSkuId)}}</p>
                    <p class="txt-center">{{formatSku(detailData["skuProperties"])}}</p>
                </el-col>

                <el-col :span="6" class="order-list-card-item flex-column">
                    <p class="margin-bottom txt-center">{{formatValue(detailData.sourcePrice)}}</p>
                    <p class="txt-center">{{formatValue(detailData.sourceNum)}}</p>
                </el-col>
            </el-row>
        </div>

        <div class="order-mark" v-if="detailData.failDesc">
            <el-row class="order-mark-title" type="flex" justify="space-between">
                <el-col :span="12">
                    <p>备注</p>
                </el-col>

                <el-col :span="6">
                    <p>编辑</p>
                </el-col>
            </el-row>

            <el-row class="order-mark-card" type="flex" v-for="(item,index) in detailData.children" :key="index">
                <el-col :span="18" class="flex-center order-mark-txt">
                    <p class="">{{detailData.failDesc}}</p>
                </el-col>

                <el-col :span="6" class="flex-center">
                    <el-button size="mini" type="primary" @click="handelEditMark">修改</el-button>
                </el-col>
            </el-row>
        </div>

        <div class="order-edit-package">
             <el-tabs v-model="packageName" type="card">
                <el-tab-pane label="包裹" name="1" class="tab-pane">
                    <div class="flex-start">
                        <p>包裹号：</p>
                        <p>{{formatData(detailData, "cargoMallOrderId")}}</p>
                    </div>
                    <!-- <div class="flex-start">
                        <p>物流公司：</p>
                        <p></p>
                    </div>
                    <div class="flex-start">
                        <p>物流单号：</p>
                        <p></p>
                    </div>
                    <div class="flex-start">
                        <p>物流状态：</p>
                        <p></p>
                    </div> -->
                </el-tab-pane>
            </el-tabs>
        </div>

        <div class="order-edit-footer flex-center">
            <el-button plain @click="back">返回</el-button>
        </div>

        <!-- 悬浮按钮 -->
        <fixed-btn :btnNum="1" :topInit="146" :rightInit="20">
            <a href="javascript:void(0)" @click="back">返回</a>
        </fixed-btn>

         <!--收货信息-->
        <xm-dialog
            :dialogVisible.sync="addressDialog.show"
            :dialogTitle="addressDialog.title"
            :sureClose="false"
            :loading="addressDialog.loading"
            @handleSure="addressDialogSure"
            @handleClose="addressDialogClose"
        >
            <el-form :model="addressFormData" ref="addressDialog" label-width="100px" label-position="left" :rules="addressRules">
                <el-form-item label="收货人" prop="name">
                    <el-input v-model="addressFormData.name" type="number" placeholder="请输入收货人姓名"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input v-model="addressFormData.phone" type="number" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" prop="address">
                    <el-cascader
                        v-model="addressFormData.address"
                        placeholder="请选择省市区"
                        :options="addressOption"
                        filterable
                    ></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="addressDetail">
                    <el-input v-model="addressFormData.addressDetail" placeholder="请输入详细地址"></el-input>
                </el-form-item>
            </el-form>
        </xm-dialog>

         <!-- 备注 -->
        <xm-dialog
            :dialogVisible.sync="markObj.show"
            :dialogTitle="markObj.title"
            :sureClose="false"
            :loading="markObj.loading"
            @handleSure="markObjDialogSure"
            @handleClose="markObjDialogClose"
        >
            <el-input v-model="markObjData.failDesc" disabled type="textarea" show-word-limit :rows="5" placeholder="最多可输入250字" :maxlength="250"></el-input>
        </xm-dialog>
    </div>
</template>

<script>
import FixedBtn from "_c/FixedBtn";
import { orderStatus, orderType} from "./../orderList/defaultData";
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
import XmDialog from '_c/XmDialog';
export default {
    components: {
        FixedBtn,
        XmDialog
    },

    props:{
        detailData: {
            type: Object
        }
    },

    data () {
        return {
            packageName: "1",
            addressDialog: {
                show: false,
                title: "修改收货信息",
                loading: false,
            },
            addressFormData: {
                phone: null,
                name: null,
                address: null,
                addressDetail: null
            },
            addressOption: regionData,
            addressRules: {
                name: [{ required: true, message: '请输入收货人姓名', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入联系电话', trigger: 'blur' }],
                address: [{ required: true, message: '请选择省市区', trigger: 'blur' }],
                addressDetail: [{ required: true, message: '请输入详细地址', trigger: 'blur' }]
            },

            markObj: {
                show: false,
                title: '备注',
                loading: false,
            },
            markObjData: {
                failDesc: '',
                orderId: ''
            }
        };
    },

    computed: {},

    mounted() {
        
    },

    methods: {
        back() {
            this.$emit('back');
        },

        addressDialogSure() {

        },

        addressDialogClose() {

        },

        handelEditMark() {
            this.markObjData = {
                failDesc: this.detailData.failDesc,
                orderId: this.detailData.orderId
            }
            this.markObj.show = true;
        },

        markObjDialogSure() {
            this.markObj.show = false;
        },

        markObjDialogClose() {
            this.markObj.show = false;
        },

        formatSku(skuProperties) {
            let str = '';
            if(skuProperties.length == 0) {
                str = '-';
            }else{
                skuProperties.forEach(item => {
                    str += item.v + '，';
                })
                str = str.slice(0, str.length - 1);
            }
            
            return str;
        },

        formatData(obj, key){ //格式化
            let value = this.$util.CommonUtils.getDeepObj(obj, key);
            if(value === 0 || value === '0') {
                return value
            }
            return value ? value : '-';
        },
        
        formatSpcData(data, key) {
            if(key == 'sourceNum') {
                let sourcePayPrice = data['sourcePayPrice'] || 0;
                let sourceNum = data['sourceNum'] || 0;
                return (sourcePayPrice * sourceNum).toFixed(2)
            }else if(key == 'orderType') {
                let obj = orderType.find(item => {
                    return item.value == data['orderType']
                })
                let label = obj ? obj.label : '全部'
                return label
            }else if(key == 'orderStatus') {
                let obj = orderStatus.find(item => {
                    return item.value == data['orderStatus']
                })
                let label = obj ? obj.label : '-'
                return label
            }else if(key == 'address'){
                let str = '';
                let deliveryCity = this.$util.CommonUtils.getDeepObj(data, 'address.deliveryCity') || '-';
                let deliveryDistrict = this.$util.CommonUtils.getDeepObj(data, 'address.deliveryDistrict') || '-';
                let deliveryAddress = this.$util.CommonUtils.getDeepObj(data, 'address.deliveryAddress') || '-';
                return deliveryCity + deliveryDistrict + deliveryAddress;
            }else{
                return '-'
            }
        },

        formatValue(value){ //格式化
            if(value === 0 || value === '0') {
                return value
            }
            return value ? value : '-';
        },
    }
}
</script>
<style lang='scss' scoped>
@import './index.scss';
</style>
<style lang="scss">
    .order-edit {
        .el-tabs__header {
            margin-bottom: 0px;
            border-color: #d3d3d3;
            .el-tabs__nav {
                border-color: #d3d3d3;
            }
        }

        .el-cascader {
            width: 100%;
            .el-cascader__label {
                line-height: 30px;
            }
        }
    }
</style>
