<!--  -->
<template>
    <div class="flex-between range-input">
        <el-input v-model="start" :type="type" @input="startChange" @blur="startBlur"></el-input>
        <p class="separate">{{separate}}</p>
        <el-input v-model="end" :type="type" @input="endChange" @blur="endBlur"></el-input>
    </div>
</template>

<script>
export default {
    name: "RangerInput",
    props:{
        start: {
            type: null,
            required: true
        },
        
        separate: {
            type: String,
            default: '—',
            required: false
        },

        end: {
            type: null,
            required: true
        },

        type:{
            type: String,
            default: 'number',
            required: false
        },
        
        integer: {
            type: Boolean,
            default: false,
            required: false
        }
    },

    data() {
        return {};
    },

    computed: {},

    mounted() {

    },

    methods: {
        startBlur() {
            let start = this.start;
            if(this.type == 'number' && (start || start === 0 || start === '0')) {
                start = Number(start);
                if(this.integer) {
                    start = parseInt(start);
                }

                if(this.end || this.end === 0 || this.end === '0'){
                    if(start > this.end) {
                        this.$emit('update:start', null);
                        this.$emit('startBlur', null);
                        return this.$msg("开始数值禁止大于结束数值");
                    }
                }
                
            }

            this.$emit('update:start', start);
            this.$emit('startBlur', start);
        },

        endBlur() {
            let end = this.end;
            
            if(this.type == 'number' && (end || end === 0 || end === '0')) {
                end = Number(end);
                if(this.integer) {
                    end = parseInt(end);
                }
                if(this.start || this.start === 0 || this.start === '0') {
                    if(end < this.start) {
                        this.$emit('update:end', null);
                        this.$emit('endChange', null);
                        return this.$msg("结束数值禁止小于开始数值");
                    }
                }
            }

            this.$emit('update:end', end);
            this.$emit('endBlur', end);
        },

        startChange(val) {
            this.$emit('update:start', val);
            this.$emit('startChange', val);
        },

        endChange(val) {
            this.$emit('update:end', val);
            this.$emit('endChange', val);
        }
    },

    watch: {

    }
    
};
</script>
<style lang='scss' scoped>
    @import 'index';
</style>
