<template>
    <section class="panel" :class="[cname]">
        <div class="panel-hd" v-if="title">
            <slot name='title'></slot>
        </div>
        <div class="panel-bd">
            <slot></slot>
        </div>
    </section>
</template>

<script>
    export default {
        props: {
            title: {// 是否显示Panel标题
                type: [String, Boolean],
                default: false
            },
            cname:{
                type: [String],
                default: ''
            }

        },
        created(){
        }
    }
</script>

<style lang="sass">
    @import "../../global/qqd/variable.scss";
        
    .panel{
        margin-top: 10px;
    }
    
    .panel{
        .panel-hd{
            padding: 0 16px 8px;
            color: $light-gray;
            font-size: 12px;
        }
        .panel-bd{
            border-bottom:1px solid $border-color;
            padding:0 16px;
            background-color: $white;
        }
    }

   
</style>