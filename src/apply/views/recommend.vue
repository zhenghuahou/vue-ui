<template>
    <div class="qqd-apply">
        <panel cname='panel-form'>
            <grid label="所在城市">
                <select-input :selected='selected' :selectedList='cityList' @selectedChange='selectedChange'></select-input>
            </grid>
            <grid label="贷款金额">
               <input class='input' v-model='money' name='money' @input='onInput' @blur='onBlur' type='text' placeholder="请输入金额"  maxlength="10"/>
               <span v-show='money'>万元</span>
            </grid>
            <grid label="客户姓名">
               <input class='input' v-model='username' name='username' @input='onInput' @blur='onBlur' type='text' placeholder="请输入姓名"  maxlength="10" />
            </grid>
            <grid label="手机号">
               <input class='input' v-model='tel' name='tel' @input='onInput' @blur='onBlur' type='text' placeholder="请输入手机号"  maxlength="15" />
            </grid>
        </panel>

        <a  class='submit-btn' :class="{diable:disabled}" @click='onSubmit'>立即推荐</a>

    </div>
</template>

<script>
import Panel from '../../components/panel';
import XInput from '../../components/input'
import Grid from '../../components/grid'
import selectInput from '../../components/select'

import Api from '../api';

//提示信息
let messages ={
  'money':'请输入贷款金额',
  'username':'请输入正确的姓名',
  'tel':'请输入正确的手机号',
}

//校验规则
let matchRules = {
  'username':/[\u4e00-\u9fa5_a-zA-Z·]{1,10}/,
  'money':/^[1-9]\d*$/,
  'tel':/\d{11,15}/
}

//替换规则
let replaceRules= {
  'money':/\D/g,
  'tel':/\D/g,
  'username':/[^\u4e00-\u9fa5_a-zA-Z·]/ 
}


export default {
    components: {
        Panel,
        Grid,
        XInput,
        selectInput
    },
    data () {
        let {locationsJson,provinceid} = pageConfig;
        return {
            money:'',
            username:'',
            tel:'',
            cityList:locationsJson,
            messages:Object.assign({},messages),
            moneycode:false,
            usernamecode:false,
            telcode:false,
            disabled:true,
            selected:'',
            onsub:true,
            Submit:false

        }
    },
    created(){

    },
    mounted(){
        this.selected = pageConfig.provinceid;
    },
    beforeRouteLeave(to,form,next){
        if(this.Submit){
            next();
        }else{
            next(false);
            wx.closeWindow(); 
        }
    },
    methods:{
        //表单校验
        // validate(){
        //   let arr = ['money','username','tel'];
        //   let isValid = true;
         
        //   for (let name of arr) {
        //     let message = this.messages[name]
        //     if(message){
        //         this.$toast(message);
        //         return isValid = false;
        //     }
        //   }
        //   return isValid;
        // },
         /* 输入框失去焦距数据处理*/
        onBlur(event){
            let {name,value}=event.target;
            let message = matchRules[name].test(value) ? '' : messages[name];
            console.info(arguments,' onBlur:',name,' message:',message,' -------->', matchRules[name].test(value))
            this.messages[name] = message;
        },
  
        onInput (event) {
            let {name,value} = event.target;
            let {[name]:rule} = replaceRules;
            let labelname =  name+'code';

            value = value.replace(rule,'')
            //贷款金额
            if(name =='money'){
                value = value.replace(/^0+/g,'');
            }

            if(value != '' && labelname != 'telcode'){
                this[labelname] = true;
            }else if(labelname == 'telcode'&& value.length >=11){
                this[labelname] = true;
            }else if(labelname == 'telcode'&& value.length < 11){
                this[labelname] = false;
            }else{
                this[labelname] = false;
            }

            if(this.moneycode == true && this.usernamecode ==true && this.telcode == true){
                this.disabled = false;
            }else{
                this.disabled = true;
            }

            this[name] = value;
        },

        onSubmit(e){
            e.preventDefault();

            if(this.disabled){
                return;
            }

            if(!this.onsub){
                return;
            }

            this.onsub = false

            // if(!this.validate()){
            //   return;
            // }

            let cb =(res)=>{
                //验证码验证失败
                if (res.status == 0) {
                    this.Submit = true
                    this.$router.push({name:'result', params: { type: 2 }})
                }else{
                    this.$toast(res.msg);
                }


                this.onsub = true;
            //     //弹出表单弹出层
            //     this.props.onhandleSubmit(res);
            }

            let data = {
                userName: this.username,
                cityId: this.selected,
                mobile:this.tel,
                loanAmount:this.money*10000
            }

            // //发送数据请求
            Api('recommendUser')(data)(cb);

        },
        selectedChange(msg){
            this.selected = msg;
        }
       
    }
   
}
</script>

<style lang="sass">
    @import '../../global/qqd/variable.scss';

    .qqd-apply{
        .city-list{
            line-height: 1;
        }
        .panel-form{
            margin-top: 0;

            .panel-hd{
                padding-bottom: 0;
            }
        }

        .submit-btn{
            display: block;
            margin:16px 30px 0;
            line-height: 40px;
            height: 40px;
            background-color:$orange;
            text-align: center;
            border-radius:5px;
            font-size: 16px;
            color:$white;
            &.diable{
                color:rgba(255,255,255,.54);
            }
        },
        .code{
            margin-bottom: -1px;
        }
        .input-iphone{
            margin: 0;
            .label{
                width: 5em;
            }
           
        }
    }

    .panel-form{

        .grid-cell{
            padding-left:0;
            padding-right: 0;
            border-left:none;
            border-right:none;
            line-height: 20px;;
            height: 20px;
            margin-bottom: -1px;
           &:first-child{
            border-top:none;
           }
            .label{
                color:$light-gray;
                width: 5em;
            }
            .input{
                height: 100%; 
                border:none;
                // width: 100%;
                flex: 1;
                display:block;
            }

        }
    }
    
</style>