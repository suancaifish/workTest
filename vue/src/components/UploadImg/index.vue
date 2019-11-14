<template>
    <div class="upload-img">
        <el-upload
            ref="upload"
            :list-type="listType"
            accept="image/gif,image/jpeg,image/jpg,image/png"
            :auto-upload="autoUpload"
            :limit="limit"
            :multiple="multiple"
            :action="uploadUrl"
            :headers="headers"
            :http-request="httpRequest"
            :file-list="fileList"
            :on-preview="handlePictureCardPreview"
            :on-success="handleSuccess"
            :on-change="handleChange"
            :on-exceed="handleExceed"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
            <div slot="tip" class="el-upload__tip"><slot name="tip"></slot></div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
import { getToken } from '@/utils/util';
export default {
    props: {
        autoUpload: {
            type: Boolean,
            default: false,
            required: false
        },
        listType: {
            type: String,
            default: 'picture-card',
            required: false
        },
        params:{
            type: Object,
        },
        multiple: {
            type: Boolean,
            default: true,
            required: false
        },
        fileList: {
            type: Array,
            default: () => [],
            required: false
        },
        limit: {
            type: Number,
            default: 15,
            required: false
        },
        uploadUrl:{
            type: String,
            default: "https://jsonplaceholder.typicode.com/posts/",
            required: false
        },
        exceedMsg: {
            type: String,
            default: "上传图片不能超过15张",
            required: false
        },
        methodFn: {
            type: Function,
            required: false,
        },
        httpRequest: {
            type: null,
            required: false,
        },
        maxSize: {
            type: Number || String,
            default: 1024 * 1024,
            required: false
        }
    },

    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            headers: {
                token: getToken()
            }
        };
    },

    methods: {
        //确认上传
        upLoadSure(){
            this.$refs.upload.submit();
        },
        handleSuccess(response, file, fileList) {
            console.log(file, fileList);
            this.$emit('response', response, file.uid);
        },
        handleRemove(file, fileList) {
            this.$emit('change', fileList);
        },
        handleChange(file, fileList){
            if(file.size > this.maxSize) {
                let index = this.$refs.upload.uploadFiles.findIndex(i => i.uid);
                this.$refs.upload.uploadFiles.splice(index, 1);
                return this.$msg("上图片不能超过" + (this.maxSize/(1024*1024)).toFixed(2) + 'M')
            }
            this.$emit('change', fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleExceed(files, fileList) {
            this.$msg(this.exceedMsg, "error");
        },
        handleClearFiles() {
            this.$refs.upload.clearFiles();
        }
    }
}

</script>
<style lang='scss' scoped>
    @import 'index';
</style>

<style lang="scss">
    .upload-img {
        .el-upload {
            box-sizing: border-box;
            width: 148px;
            height: 148px;
            margin: 0 8px 8px 0;
            display: inline-block;
            i {
                line-height: 148px;
            }
        }
    }
</style>
