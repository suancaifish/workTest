<template>
    <div class="upload-container">
        <div class="drag-area" ref="drageArea" :class="{'dragenter': isDragenter, 'dragleave': !isDragenter, 'multiple': multiple, 'show-list': showList && uploadFilesList.length != 0, 'drage': dragenter}">
            <span v-if="dragenter">拖拽文件到此区域可上传</span>
            <label class="input-file">选择文件<input type="file" @change="addFiles" :multiple="multiple" ref="fileValue"></label>
        </div>
        <div class="upload-list" :class="{'a-select': !multiple}">
            <!-- <xm-scroll :scrollHeight="scrollHeight"> -->
                <div style="padding-right: 10px;">
                    <div class="list-item" v-for="(item,index) in uploadFilesList" :key="index">
                        <div class="file-msg">
                            <div class="file-attr">
                                <span class="file-name" :title="item.file.name">
                                    <i class="file-icon el-icon-document" v-show="item.fileType == 'word'"></i>
                                    <i class="file-icon el-icon-picture" v-show="item.fileType == 'image'"></i>
                                    <i class="file-icon el-icon-document" v-show="item.fileType == 'text'"></i>
                                    <i class="file-icon el-icon-date" v-show="item.fileType == 'excel'"></i>
                                    {{item.file.name}}
                                </span>
                                <span class="file-size">{{item.file.size | setSize}}</span>
                            </div>
                            <div class="upload-action">
                                <span class="upload-tip" :class="{'success': item.uploadState == 1,'error': item.uploadState == 0 || item.uploadState == 3}">{{item.tip}}</span>
                                <i :title="titleTip.error" v-show="item.uploadState == 0" @click="startUploadFile(index)" class="el-icon-upload2"></i>
                                <i :title="titleTip.success" v-show="item.uploadState == 1" class="el-icon-circle-check" style="color: #1dc500;"></i>
                                <i :title="titleTip.wait" v-show="item.uploadState == 2" @click="closeUploadFile(index)" class="el-icon-time"></i>
                                <i :title="titleTip.cancel" v-show="item.uploadState == 3" @click="startUploadFile(index)" class="el-icon-caret-right"></i>
                                <i :title="titleTip.notSupported" v-show="item.uploadState == 4" class="el-icon-information" style="color: red;"></i>
                                <i :title="titleTip.upload" v-show="item.uploadState == 5" @click="closeUploadFile(index)" class="el-icon-loading"></i>
                                <i :title="titleTip.exceedSize" v-show="item.uploadState == 7" class="el-icon-information" style="color: red;"></i>
                                <i :title="titleTip.delete" @click="deleteUploadFile(index)" class="delete el-icon-circle-cross"></i>
                            </div>
                        </div>
                        <div class="progress">
                            <span class="bar">
                                <i :style="{'width': item.percent +'%'}" :class="{'transtion': item.uploadState != 2, 'error': item.uploadState == 0, 'success': item.uploadState == 1, 'pause': item.uploadState == 3}"></i>
                            </span>
                        </div>
                    </div>
                </div>
            <!-- </xm-scroll> -->
        </div>
    </div>
</template>

<script>
/**
 * @param fileType      所支持的文件类型 ['excel','image','word','text','js','html',zip','exe']
 * @param uploadUrl     上传文件的url
 * @param uploadKey     上传文件的文件的key
 * @param params        上传文件时的参数
 * @param multiple      是否支持多选
 * @param dragenter     是否支持拖拽上传
 * @param showList      是否显示上传文件列表
 * @param scrollHeight  滚动高度
 * @event success       上传成功后回调函数
 */

import XmScroll from '_c/XmScroll';

export default {
    components: { XmScroll },
    data() {
        return {
            timer: null,
            uploadCount: 0,             //上传总数量
            errorCount: 0,              //上传失败数量
            successCount: 0,            //上传成功数量
            isDragenter: false,         //是否拖拽到了指定区域
            uploadFilesList: [],        //所有上传的文件
            waitUploadFilesList: [],    //待上传的文件
            beUploadFilesList: [],      //正在上传的文件
            titleTip: {                 //鼠标移上去提示文字
                success: '上传成功',
                error: '上传失败,点击重传',
                wait: '等待上传,点击取消',
                cancel: '已取消,点击重传',
                notSupported: '不支持的文件类型',
                upload: '上传中，点击取消',
                exceedSize: '超出大小限制',
                delete: '点击删除当前上传文件',
            },
            uploadTip: {                //上传提示文字
                success: '导入成功',
                error: '导入失败',
                wait: '等待中',
                cancel: '已取消',
                notSupported: '格式不支持',
                exceedSize: '超出大小限制'
            },
        }
    },
    props: {
        uploadUrl: {        // 上传文件的url
            type: String,
            required: true
        },
        uploadKey: {        // 上传文件的文件的key
            type: String,
            required: true
        },
        params: {           // 上传文件时所需要的参数
            type: Array,
            default: null
        },
        token: {            // 上传文件时所需要的token
            type: String,
            default: null
        },
        multiple: {         // 是否支持多选
            type: Boolean,
            default: false
        },
        dragenter: {        // 是否支持拖拽
            type: Boolean,
            default: false
        },
        showList: {         // 是否显示上传列表
            type: Boolean,
            default: false
        },
        fileType: {         // 上传文件的文件类型  ['excel','image','word','text','js','html',zip','exe']
            type: Array,
            default: null
        },
        maxUploadNum: {     // 同时上传最大个数
            type: Number,
            default: 3
        },
        maxSize: {          // 支持的最大文件大小 单位KB    0 为不限制 
            type: Number,
            default: 0,
        },
        order: {            //排序 ASC 按选择顺序排序   
            type: String,
            default: 'ASC'
        },
        scrollHeight:{
            type: String,
            default: '200px'
        }
    },
    created() {
        if (!this.multiple) {
            this.dragenter = false;  // 如果不支持多选的话, 也不支持拖拽
        } else {
            this.setBeUploadFiles(); //启动定时器， 检测未上传文件
            this.$nextTick(() => {
                if (this.dragenter) { //如果支持拖拽则设置拖拽事件
                    this.setDragEvent()
                }
            })
        }
    },
    destroyed() {
        clearTimeout(this.timer);
        this.timer = null;
    },
    methods: {
        init() { //初始化
            this.uploadCount = 0;
            this.errorCount = 0;
            this.successCount = 0;
            this.isDragenter = false;
            this.uploadFilesList = [];
            this.beUploadFilesList = [];
            this.waitUploadFilesList = [];
        },
        startUploadFile(index) { //开始|继续 上传文件
            this.uploadFilesList[index].uploadState = 2; //上传状态改为2（等待上传）
            this.uploadFilesList[index].tip = this.uploadTip.wait; //上传提示： 等待上传
            this.uploadFilesList[index].percent = 0;    //上传进度变为0 

            if (this.waitUploadFilesList.indexOf(this.uploadFilesList[index]) == -1) { //如果点击开始的在等待列表中找不到， 则将点击的这个添加到等待列表中
                this.waitUploadFilesList.push(this.uploadFilesList[index]);
            }

            if (!this.multiple) { // 不支持多条上传的时候
                setTimeout(() => {
                    this.uploadFilesList[index].xhr = this.setXMLHttpRequest(this.uploadFilesList[index]);
                    this.uploadFilesList[index].xhr.startUpload();
                }, 300);
            }
        },
        closeUploadFile(index) { //取消上传文件
            if (this.uploadFilesList[index].uploadState != 2 && this.uploadFilesList[index].xhr) this.uploadFilesList[index].xhr.closeUpload();

            this.uploadFilesList[index].uploadState = 3;
            this.uploadFilesList[index].tip = this.uploadTip.cancel;

            if (this.waitUploadFilesList.indexOf(this.uploadFilesList[index]) != -1) { //如果点击的是等待上传中列表中的一个， 则将点击的这个从等待上传列表中去掉
                this.waitUploadFilesList.splice(this.waitUploadFilesList.indexOf(this.uploadFilesList[index]), 1);
            }
        },
        deleteUploadFile(index) { //删除上传文件
            if (this.uploadFilesList[index].uploadState != 2 && this.uploadFilesList[index].xhr) this.uploadFilesList[index].xhr.closeUpload();

            this.uploadFilesList.splice(index, 1);

            if (this.waitUploadFilesList.indexOf(this.uploadFilesList[index]) != -1) { //如果点击的是等待上传中列表中的一个， 则将点击的这个从等待上传列表中去掉
                this.waitUploadFilesList.splice(this.waitUploadFilesList.indexOf(this.uploadFilesList[index]), 1);
            }
        },
        /* 设置拖拽事件 */
        setDragEvent() {
            let eventList = ['drag', 'dragenter', 'dragleave', 'dragover', 'drop']
            eventList.forEach((event) => {
                this.$refs.drageArea.addEventListener(event, (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    switch (event) {
                        case 'drop': // 松开鼠标的时候
                            this.addFiles(e);
                            break
                        case 'dragenter': //进入指定区域的时候
                            this.isDragenter = true;
                            break
                        case 'dragleave': //离开指定区域的时候
                            this.isDragenter = false;
                            break
                    }
                })
            })
        },
        /* 添加上传文件 */
        addFiles(e) {
            let files = e.target.files || e.dataTransfer.files; //点击input的时候是target  拖拽的时候是dataTransfer
            this.detectionFileType(files)
            this.$refs.scroll.resize()
        },
        /* 添加并检测上传文件 */
        detectionFileType(files) {
            for (let i = 0, len = files.length; i < len; i++) {
                let fileObj = this.setFilesAttr(files, i); //设置文件属性
                if (!this.multiple) { //如果不是多选的，则显示一条数据
                    this.uploadFilesList = [];
                    this.waitUploadFilesList = []
                    setTimeout(() => {
                        fileObj.xhr = this.setXMLHttpRequest(fileObj);
                        fileObj.xhr.startUpload();
                    }, 300);
                }
                if (this.order.toUpperCase() == 'ASC') {
                    this.uploadFilesList.push(fileObj)
                    if (fileObj.isSupport) {
                        this.waitUploadFilesList.push(fileObj);
                    }
                } else {
                    this.uploadFilesList.unshift(fileObj)
                    if (fileObj.isSupport) {
                        this.waitUploadFilesList.unshift(fileObj);
                    }
                }
            }
        },
        /* 设置文件属性 */
        setFilesAttr(files, index) {
            /* uploadState 上传状态  0 失败     1 成功     2 等待上传  3 取消  4 不支持    5 上传中  6 开始上传  7 文件超出支持大小
             * index 当前文件的序号 
             * isSupport 是否是支持的文件类型
             * fileType 文件的类型
             * percent 上传百分比
             */
            let fileObj = {};
            let type = this.getType(files[index].type, files[index].name); //获取文件类型
            fileObj.fileType = type;
            fileObj.percent = 0;
            fileObj.index = index;
            fileObj.file = files[index];

            //有一个符合的类型都属于支持的文件类型
            if (this.fileType == null || this.fileType.indexOf(fileObj.fileType) != -1) { //fileType为null的时候表示不限制文件类型
                if (this.maxSize == 0 || fileObj.file.size / 1024 < this.maxSize) { //maxSize为0的时候表示不限制大小
                    fileObj.isSupport = true;
                    fileObj.uploadState = 2; //等待上传
                    fileObj.tip = this.uploadTip.wait;
                    return fileObj;
                }
                fileObj.isSupport = false;
                fileObj.uploadState = 7; //超出大小限制
                fileObj.tip = this.uploadTip.exceedSize;
                return fileObj;
            }
            fileObj.tip = this.uploadTip.notSupported;
            fileObj.uploadState = 4; //4 不支持
            fileObj.isSupport = false;
            return fileObj;
        },
        /* 设置XHR */
        setXMLHttpRequest(fileObj) {
            let xhr = new XMLHttpRequest();
            let formData = new FormData();

            if (this.params) { //有参数则设置请求参数
                for (let key in this.params) {
                    formData.append(key, this.params[key])
                }
            }
            formData.append(this.uploadKey, fileObj.file);
            xhr.open("POST", this.uploadUrl)
            if (this.token) xhr.setRequestHeader("token", this.token)
            /* ==== 定义上传完成后的回调函数 ==== */
            xhr.startUpload = (result) => { //开始上传
                this.xhrStartUpload(result, fileObj)();
                xhr.send(formData);
            }

            xhr.onloadstart = (result) => { //触发上传的时候
            
            }

            xhr.onload = (result) => { //成功
                this.xhrOnload(result, fileObj)(xhr);
            }

            xhr.onerror = (result) => { //失败
                console.log('fail....')
                this.xhrOnError(result, fileObj)();
            }

            xhr.upload.onprogress = (result) => { //进度
                this.xhrOnProgress(result, fileObj)();
            }

            xhr.closeUpload = () => { //取消上传
                xhr.abort();
                this.closeUpload(xhr, fileObj)()
            }

            xhr.onreadystatechange = (result) => { //上传状态
                this.onReadyStateChange(result, fileObj)(xhr);
            }

            return xhr;
        },
        xhrStartUpload(result, fileObj) {   //开始上传
            // console.log('准备上传================')
            return () => {
                fileObj.uploadState = 6; //上传开始
                // fileObj.tip = '开始上传';
            }
        },
        xhrOnload(result, fileObj) { // 上传成功回调
            // console.log('上传成功================')
            return (xhr) => {
                let data = JSON.parse(xhr.responseText)
                if (data.code == 500 || data.code == 400) {
                    fileObj.uploadState = 0; //失败
                    this.errorCount++;
                    fileObj.tip = data.code == 400 ? `${this.uploadTip.error} （检测到相同数据）` : this.uploadTip.error;
                    this.$message({
                        showClose: true,
                        message: data.msg,
                        type: "warning"
                    });
                    this.$refs.fileValue.value = '';
                } else {
                    fileObj.uploadState = 1; //成功
                    fileObj.tip = this.uploadTip.success;
                    this.successCount++;
                    this.$emit('success', data);
                    this.$refs.fileValue.value = '';
                }
                this.deleteBeUploadFile(fileObj)
            }
        },
        xhrOnError(result, fileObj) { // 上传失败回调
            // console.log('上传失败================')
            return () => {
                fileObj.uploadState = 0; //失败
                fileObj.tip = this.uploadTip.error;
                this.errorCount++;
                this.$refs.fileValue.value = '';
                this.deleteBeUploadFile(fileObj)
            }
        },
        xhrOnProgress(result, fileObj) { // 上传进度回调
            // console.log('上传进度================')
            return () => {
                if (fileObj.uploadState != 5) fileObj.uploadState = 5;
                if (result.lengthComputable) {
                    let percent = result.loaded / result.total * 100 | 0;
                    fileObj.tip = percent + '%';
                    fileObj.percent = percent;
                }
            }
        },
        onReadyStateChange(result, fileObj) { // 上传状态回调
            // console.log('上传状态================')
            return (xhr) => {
                if (xhr.readyState == 4) {

                }
            }
        },
        closeUpload(result, fileObj) { // 取消上传回调
            // console.log('取消上传================')
            return () => {
                this.errorCount++;
                this.deleteBeUploadFile(fileObj)
            }
        },
        /* 删除正在上传的文件 */
        deleteBeUploadFile(fileObj) {
            let index = this.beUploadFilesList.indexOf(fileObj)
            if (index != -1) this.beUploadFilesList.splice(index, 1);
        },
        /* 设置正在上传的文件列表 */
        setBeUploadFiles(time) {
            if (!time) console.log(time)
            clearTimeout(this.timer)
            this.timer = setTimeout(this.getBeUploadFile, time || 0);
        },
        /* 获取要上传的文件 */
        getBeUploadFile() {
            while (this.beUploadFilesList.length < this.maxUploadNum && this.waitUploadFilesList.length != 0) {
                let obj = null;
                if (this.order.toUpperCase() == 'ASC') {
                    obj = this.waitUploadFilesList.shift()
                } else {
                    obj = this.waitUploadFilesList.pop()
                }
                obj.xhr = this.setXMLHttpRequest(obj);
                obj.xhr.startUpload()
                this.beUploadFilesList.push(obj)
            }
            this.setBeUploadFiles(1000) // 1s检测一次， 看看有没有未上传的文件
        },
        /* 获取文件类型 */
        getType(type, name) {
            let filetype = '';
            switch (type) {
                case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                    filetype = 'excel';
                    break
                case 'application/vnd.ms-excel':
                    filetype = 'excel';
                    break
                case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                    filetype = 'word';
                    break
                case 'text/plain':
                    filetype = 'text';
                    break
                case 'image/jpeg':
                    filetype = 'image';
                    break
                case 'image/png':
                    filetype = 'image';
                    break
                case 'application/x-zip-compressed':
                    filetype = 'zip';
                    break
                case 'application/javascript':
                    filetype = 'js';
                    break
                case 'text/html':
                    filetype = 'html';
                    break
                case 'application/x-msdownload':
                    filetype = 'exe';
                    break
                case "":
                    if (/(\.xls|\.xlsx)$/.test(name.toLowerCase())) {
                        filetype = "excel";
                    }
                    break
            }
            return filetype;
        }
    },
    filters: {
        setSize(v) { //计算文件大小
            if ((v / 1024 / 1024) < 1) {
                return (v / 1024).toFixed(2) + 'K';
            }
            return (v / 1024 / 1024).toFixed(2) + 'M';
        }
    }
}
</script>

<style lang="scss" scoped>
  @import 'index';
</style>
