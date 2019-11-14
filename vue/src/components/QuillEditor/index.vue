<template>
    <fullscreen class="fullscreen" ref="fullscreen" @change="fullscreenChange">
        <div class="quill-editor">
            <quill-editor 
                class="hljs xml"
                ref="quillEditor"
                v-model="content" 
                :options="editorOption"
                @change="onChange"
            >
            </quill-editor>
        </div>
        <slot></slot>
    </fullscreen>
</template>

<script>
import hljs from 'highlight.js';
import icons from './icons';
import VueQuillEditor, { Quill } from 'vue-quill-editor';
import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);
const Font = Quill.import('formats/font');
Font.whitelist = ['Arial', '宋体', '黑体', '微软雅黑'];
Quill.register(Font, true);
export default {
    props: {
        placeholder: {
            type: String,
            default: "请输入内容"
        },
        height: {
            type: Number,
            default: 400
        },
    },
    data() {
        return {
            fullscreen: false,
            content: '',
            editorOption: {
                theme:'snow',
                modules: {
                    toolbar:{
                        container:[
                            ['bold', 'italic', 'underline', 'strike'],    //加粗，斜体，下划线，删除线
                            ['blockquote', 'code-block'],     //引用，代码块
                            [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                            [{ 'script': 'sub'}, { 'script': 'super' }],   // 上下标
                            [{ 'indent': '-1'}, { 'indent': '+1' }],     // 缩进
                            [{ 'direction': 'rtl' }],             // 文本方向
                            [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                            [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                            [{ 'font': ['Arial', '宋体', '黑体', '微软雅黑'] }],     //字体
                            [{ 'align': [] }],    //对齐方式
                            ['clean'],    //清除字体样式
                            ['image','video']   //上传图片、上传视频
                        ],
                        handlers: {
                            'image': () => {
                                this.editor.format('image', false)
                            }
                        }
                    },
                    // imageResize: {
                    //     displayStyles: {
                    //         backgroundColor: 'black',
                    //         border: 'none',
                    //         color: 'white'
                    //     },
                    //     modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                    // }
                },
                placeholder: this.placeholder
            },
        };
    },
    computed: {
        editor() {
            return this.$refs.quillEditor.quill;
        },
        contentCode() {
            return hljs.highlightAuto(this.content).value
        },
    },
    watch: {

    },
    created() {
       
    },
    mounted() {
        this.setHeight();
        this.initFullBtn();
        this.initImg();
    },
    methods: {
        initImg() {
            let imgup = document.querySelector('.quill-editor .ql-image');
            imgup.onclick = () => {
                this.$emit('imgup');
            }
        },

        initFullBtn () {
            let childs = this.$refs.quillEditor.$el.children;
            let fullBtn = document.createElement('SPAN');
            fullBtn.className = 'ql-formats';
            fullBtn.id = 'ql-fullscreen';
            let that = this;
            function setSizeBtn (bol) {
                let icon = ''
                if (bol) {
                    icon = icons.minsize
                } else {
                    icon = icons.maxsize
                }
                
                fullBtn.innerHTML = '<button type="button" class="ql-fullscreen">' + icon + '</button>';
            }
            setSizeBtn(false);
            fullBtn.addEventListener('click', () => {
                this.toggle();
            }, false)
            for (let i in childs) {
                if (childs[i].className.indexOf('ql-toolbar') > -1) {
                    childs[i].append(fullBtn)
                    break
                }
            }
        },

        setHeight() {
            // 设置编辑器高度
            console.log(this.height);
            // this.editor.container.style.height = `${this.height}px`;
        },

        setSizeBtn(bol) {
            let fullBtn = document.querySelector('#ql-fullscreen');
            let icon = ''
            if (bol) {
                icon = icons.minsize
            } else {
                icon = icons.maxsize
            }  
            fullBtn.innerHTML = '<button type="button" class="ql-fullscreen">' + icon + '</button>';
        },

        onChange() {
            // 告知父组件内容发生变化
            this.$emit("input", this.content);
        },
        toggle () {
            this.$refs['fullscreen'].toggle() // recommended
        },
        fullscreenChange(fullscreen) {
            this.setSizeBtn(fullscreen);
			this.fullscreen = fullscreen;
		}
    }
};
</script>

<style lang="scss" scoped>
    @import 'index';
</style>
<style lang="scss">
    .ql-snow .ql-editor img {
        width: 100%;
    }
    .ql-editor {
        min-height: 300px;
    }
    .quill-editor{
        /*工具栏内用*/
        .ql-font {
            span[data-value="Arial"]::before {
                content: "Arial" !important;
                font-family: "Arial";
            }

            span[data-value="宋体"]::before {
                content: "宋体" !important;
                font-family: "宋体";
            }

            span[data-value="黑体"]::before {
                content: "黑体" !important;
                font-family: "黑体";
            }

            span[data-value="微软雅黑"]::before {
                content: "微软雅黑" !important;
                font-family: "微软雅黑";
            }
        }

        /*编辑器内容用*/
        .ql-font-Arial {
            font-family: "Arial";
        }

        .ql-font-宋体 {
            font-family: "宋体";
        }

        .ql-font-黑体 {
            font-family: "黑体";
        }

        .ql-font-微软雅黑 {
            font-family: "微软雅黑";
        }
    }
</style>

