<!-- 上传 -->
<template>
    <el-upload
        ref="upload"
        drag
        :accept="accept"
        :data="params"
        :on-change="handleChange"
        :on-error="handleError"
        :on-success="handleSuccess"
        :on-remove="handleRemove"
        :auto-upload="false"
        :headers="headers"
        :file-list="fileList"
        :action="uploadUrl"
    >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将{{uploadName}}拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip" v-if="showTips">
            <p class="pointer download-text" @click="downloadDemo">点击下载模板: <span>{{demoName}}</span></p>
        </div>
    </el-upload>
</template>

<script>
import { getToken } from '@/utils/util';
import request from '@/utils/request';
export default {
    props:{
        params:{
            type: Object,
        },
        uploadUrl:{
            type: String,
            required: true
        },
        uploadDemo:{
            type: String,
            required: false
        },
        demoName:{
            type: String,
            required: false,
            default: 'demo.xlsx'
        },
        accept: {
            type: String,
            required: false,
            default: '.xlsx'
        },
        uploadName: {
            type: String,
            required: false,
            default: '*.xlsx文件'
        },
        showTips: {
            type: Boolean,
            required: false,
            default: true
        },
    },
    data() {
        return {
            fileList: [],
            headers: {
                token: getToken()
            }
        };
    },
    computed: {},

    mounted() {},

    methods: {
        // 确认上传
        upLoadSure(){
            this.$refs.upload.submit();
        },
        // 成功上传
        handleSuccess(response, file, fileList){
            let msg = '';
            if(!response.data || !response.data.import_succ_num || response.data.import_succ_num == 0 ){
                if(response.result.status == -402){
                    msg = response.result.msg;
                    this.$store.dispatch('LogOut').then(() => {
                        setTimeout(()=>{
                            location.reload(); 
                        },1500)
                    })
                }else if(response.result.status == 0){
                    msg = '导入失败';
                }else{
                    response.data.error_msg_list.forEach(item=>{msg += `<p>${item}</p>`})
                }
                this.fileList = [];
                this.$notify({
                    duration: 0,
                    title: '导入失败',
                    type: 'error',
                    dangerouslyUseHTMLString: true,
                    message: msg
                });
            }else{
                this.$msg(`成功导入${response.data.import_succ_num}条数据`,'success');
                if(response.data.error_msg_list && response.data.error_msg_list.length > 0){
                    response.data.error_msg_list.forEach(item=>{msg += `<p>${item}</p>`})
                    this.$notify({
                        duration: 0,
                        title: '部分导入失败',
                        type: 'error',
                        dangerouslyUseHTMLString: true,
                        message: msg
                    });
                }
                this.$emit('handleSuccess');
            }
            this.$refs.upload.clearFiles();
        },
        // 上传出错
        handleError(err, file, fileList){
            this.$msg(err,'error');
            this.$emit('handleError');
        },
        handleChange(file, fileList){
            if(file.response && (file.response.result.status === 0 || file.response.data.import_succ_num === 0 )) return;
            this.fileList = [file];
        },
        handleRemove(file, fileList) {
            let uid = file.uid;
            let index = this.fileList.findIndex((item => { return item.uid === uid}));
            this.fileList.splice(index,1);
        },
        handleUpLoadClose(){
            this.fileList = [];
        },
        downloadDemo(){
            request({
                fullUrl: this.uploadDemo,
                method: 'get',
                responseType:'arraybuffer',
                headers: {
                    Accept: 'application/vnd.ms-excel,*/*'
                }
            }).then(res => {
                this.$util.download(res,this.demoName ,'application/vnd.ms-excel');
            })
        }
    }
};
</script>
<style lang='scss' scoped>
    @import 'index';
</style>
