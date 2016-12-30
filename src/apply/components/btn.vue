<template>
    <a  class='submit-btn' @click='onClick' :class='cname'>{{text}}</a>
</template>

<script>

export default {
    props:{
        text:'',
        cname:''
    },
    created(){
    },
    methods:{
       onClick(event){
            this.$emit('onSubmit',event);
       }
    }
   
}
</script>

<style lang="sass">
    @import '../../global/qqd/variable.scss';
    .submit-btn{
        display: block;
        margin:24px 0;
        line-height: 40px;
        height: 40px;
        background-color:$orange;
        text-align: center;
        border-radius:5px;
        font-size: 16px;
        color:$white;
        &.disable{
            color:rgba(255,255,255,.54);
        }
    }
</style>
