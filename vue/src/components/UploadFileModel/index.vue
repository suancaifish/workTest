<!--  -->
<template>
    <!-- 上传 -->
    <xm-dialog  
        :sureClose="false"
        :dialogVisible.sync="dialogVisibleUpLoad"
        :dialogTitle="dialogTitle"
        :loading="loading"
         @handleSure="upLoadSure"
         @handleClose="handleUpLoadClose">
        <el-upload
            ref="upload"
            drag
            :name="name"
            :data="params"
            :on-change="handleChange"
            :on-error="handleError"
            :on-success="handleSuccess"
            :auto-upload="false"
            :headers="headers"
            :file-list="fileList"
            :action="uploadUrl"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将*.xlsx文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
                <p class="pointer download-text" @click="downloadDemo">点击下载模板: <span>{{demoName}}</span></p>
            </div>
        </el-upload>
    </xm-dialog>
</template>

<script>
import XmDialog from "_c/XmDialog";
import { getToken } from '@/utils/util';
import request from '@/utils/request';
export default {
    components:{
        XmDialog
    },
    props:{
        dialogTitle: {
            type: String,
            required: false,
            default: '导入'
        },
        params:{
            type: Object,
        },
        uploadUrl:{
            type: String,
            required: true
        },
        uploadDemo:{
            type: String,
            required: true
        },
        demoName:{
            type: String,
            required: false,
            default: 'demo.xlsx'
        },
        name: {
            type: String,
            required: false,
            default: 'file'
        },
        methodFn: {
            type: Function,
            required: false,
        },
        handleSuccessFn: {
            type: Function,
            required: false
        }
    },
    data() {
        return {
            //上传
            dialogVisibleUpLoad: false,
            fileList: [],
            loading: false,
            headers: {
                token: getToken()
            },
        };
    },
    computed: {

    },

    mounted() {},

    methods: {
        //确认上传
        upLoadSure(){
            if(this.fileList.length == 0) {
                return this.$msg('请选择文件导入','warning');
            }
            this.loading = true;
            this.$refs.upload.submit();
        },
        handleSuccess(response, file, fileList){
            let msg = '';
            console.log(typeof this.handleSuccessFn == 'function')
            if(typeof this.handleSuccessFn == 'function') {
                this.handleSuccessFn(response, file, fileList);
            }else{
                if(response.data) {
                    this.dialogVisibleUpLoad = false;
                    this.$msg('导入成功','success');
                    this.$emit('success');
                }else{
                    if(response.result.status == -402){
                        msg = response.result.msg;
                        this.$store.dispatch('LogOut').then(() => {
                            setTimeout(()=>{
                                location.reload(); 
                            },1500)
                        })
                    }else{
                        msg = '导入失败';
                    }
                    this.fileList = [];
                    this.$notify({
                        duration: 0,
                        title: '导入失败',
                        type: 'error',
                        dangerouslyUseHTMLString: true,
                        message: msg
                    });
                }
            }
            this.$refs.upload.clearFiles();
            this.loading = false; 
        },
        handleError(err, file, fileList){
            this.$msg(err,'error');
            this.loading = false;
        },
        handleChange(file, fileList){
            if(file.response && (file.response.result.status === 0 || file.response.data.import_succ_num === 0 )) return;
            this.fileList = [file];
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
