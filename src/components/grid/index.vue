<template>
    <div class="grid-cell" >
        <span class="label">{{label}}</span>
        <span class="side"><slot></slot></span>
    </div>
</template>

<script type="text/babel">
    export default {
        props:{
            label:{
                type: String
            },
            txt:{
                type:String
            }
        }
    }
   
</script>

<style lang="sass">

     @import '../../global/qqd/variable.scss';
    
    .grid-cell{
        overflow: hidden;
        padding:12px 16px;
        line-height:20px;
        border:1px solid $border-color;
        background: $white;
        display: flex;
        .label{
            display: block;
        }
        .side{
            flex: 1;
            word-wrap: break-word;
            overflow:auto;
            display:flex;
            font-size: 14px;
           justify-content:space-between;
        }
    
    }
    
    
</style>