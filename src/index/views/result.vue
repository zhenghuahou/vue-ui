<template>
    <div class="qqd-result">
        <h3 class="hd">
             <i class="iconfont icon-succeed"></i>
             <span class="txt">{{detail.title}}</span>
        </h3>
        <p class="content">{{detail.content}}</p>
        <Btn text='查看我的业绩' @onSubmit='onSubmit' v-if='loginFrom == "myperformance"'></Btn>
        <Btn :text='detail.btnText' @onSubmit='onSubmit' v-else></Btn>
    </div>
</template>

<script>
import Btn from'../components/btn.vue';

var  detail = [
    {
        'title':'手机绑定成功',
        'content':'您已成功绑定鹊桥贷，赶快推荐客户赚佣金吧。',
        'btnText':'马上推荐客户'
    },
     {
        'title':'客户推荐成功',
        'content':'贷款专家将会在1个工作日内与客户联系,请保持手机畅通。',
        'btnText':'确认'
    }

]

var link = {
    'recommend':'recommend',
    'myperformance':'myperformance',
}

var Submit = false

export default {
    components: {
        Btn
    },
    data () {
        var {type} = this.$route.params;
        type = type - 1 || 0;
        console.log(" type:",type,typeof type);
        return {
            type,
            detail:detail[type],
            loginFrom:null,
        }
    },
    created(){
    },
    beforeRouteEnter(to,from,next){
        next(vm =>{
            if(from.query.from){
                vm.loginFrom = from.query.from
            }
        })        
    },
    beforeRouteLeave(to,from,next){
        if(Submit){
            next();
        }else{
            next(false);
            wx.closeWindow();
        }   
    },
    methods:{
       onSubmit(){
            // 绑定手机成功页,回到微信页面
            if(this.loginFrom){
                Submit = true;
                 this.$router.push({'name':link[this.loginFrom]});
            }
            
       }
    }
   
}
</script>

<style lang="sass">
    @import '~modulepath/variable.scss';

    
    .qqd-result{
        padding:45px 30px;
        background: $white;
        height: 100%;
        position: fixed;
        box-sizing: border-box;
        width: 100%;
        h3{
            font-size: 16px;
            text-align: center;
            .txt{
                display: block;
                margin: 16px 0; 
            }
            .icon-succeed{
                font-size: 72px;
                color:#41974D;
                line-height: 1;
            }
        }
        .content{
            color: $light-gray;
        }
       
    }
   


</style>
