<template>
    <div class="qqd-apply">
        <panel cname='panel-form'>
            <grid label="所在城市">
                <select-input :selected='cityId' :selectedList='cityList' @selectedChange='selectedChange'></select-input>
            </grid>
            <grid label="公司">
               <input class='input' v-model='company' name='company' @input='onInput' type='text' placeholder="请输入公司名称"  maxlength="20"/>
            </grid>
            <grid label="姓名">
               <input class='input' v-model='username' name='username' @input='onInput'  type='text' placeholder="请输入姓名"  maxlength="10" />
            </grid>

            <IPhone  @input='onInput'>
                <label slot='iphone' class="label">手机</label>
                <label slot='code' class="label">验证码</label>
            </IPhone>
        </panel>

        <Btn text='登录并绑定' @onSubmit='onSubmit' :cname="submitEnable?'':'disable'"></Btn>
        <div class="agreement">您同意鹊桥贷微信绑定手机号，即代表您已同意<router-link class='link' :to='{name:"protocol"}'>《鹊桥贷用户协议》</router-link>并自动注册鹊桥贷账号。</div>

    </div>
</template>

<script>
import Panel from '../../components/panel';
import IPhone from '../../components/input'
import Grid from '../../components/grid'
import selectInput from '../../components/select'

import Btn from'../components/btn.vue';
import Api from '../api';

//提示信息
let messages ={
  'company':'请输入公司名称',
  'username':'请输入正确的姓名',
  'tel':'请输入正确的手机号',
  'scode':'验证码有误,请重新输入',
}

//校验规则
let matchRules = {
  'company': /[^\s]{1,20}/, //1~20个非空字符
  'username':/[\u4e00-\u9fa5_a-zA-Z·]{1,10}/,
  'tel':/\d{11,15}/,
  'scode':/\d{4}/
}

//替换规则
let replaceRules= {
  'username':/[^\u4e00-\u9fa5_a-zA-Z·]/
}


export default {
    components: {
        Panel,
        Grid,
        Btn,
        IPhone,
        selectInput
    },
    data () {
        let {locationsJson,provinceid} = pageConfig;

        return {
            loading:false,
            submitEnable:false,  //默认不能提交
            cityList:locationsJson,
            cityId:provinceid || '2',
            company:'',
            username:'',
            tel:'',
            scode:'',
            messages:Object.assign({},messages)
        }
    },
    created(){
    },
    methods:{

        //表单校验
        validate(showToast = false){
          let arr = ['company','username','tel','scode'];
         
          for (let name of arr) {
            let message = this.messages[name];
            // console.log(' validate--->message:',message);
            if(message){
                showToast && this.$toast(message);
                return  this.submitEnable = false;
            }
          }
          return this.submitEnable = true;
        },

         /* 输入框失去焦距数据处理*/
        onBlur(event){
            let {name,value}=event.target;
            let message = matchRules[name].test(value) ? '' : messages[name];
            this.messages[name] = message;
        },
  
        onInput (event) {
            let {name,value} = event.target;
            let {[name]:rule} = replaceRules;

            rule && (value = value.replace(rule,''));
            
            // console.log(' name:',name," rule:",rule,' value:',value);
            let message = matchRules[name].test(value) ? '' : messages[name];
            this.messages[name] = message;
            this[name] = value;

            this.validate();
        },
        getParams(){
           /*
             * @param userName 用户姓名
             * @param cityId 城市id
             * @param mobile 用户手机号
             * @param loanAmount 贷款金额（单位：元）
            */
            let params = {};

            params.cityId = this.cityId;
            params.companyName = this.company;
            params.userName = this.username;
            params.mobile = this.tel;
            params.checkCode = this.scode;
            
            return params;

        },
        onSubmit(e){
            e.preventDefault();
            // this.validate(true);

            if(!this.submitEnable){
                console.warn('校验不通过');
              return;
            }

            //数据没有返回 直接返回
            if (this.loading ) {
                return;
            }

            this.loading = true;

            let cb =(res)=>{

                this.loading = false;

                //验证码验证失败
                if (res.status != 0) {
                    // this.messages.scode = res.msg;
                    this.$toast(res.msg);
                    return;
                }

                //跳转到结果页
               this.$router.push({name:'result', params: { type: 1 }});
            }

            //发送数据请求
            Api('bindUser')(this.getParams())(cb);
        },
        selectedChange(msg){
            this.cityId = msg;
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

        .link{
            color:$link-color;
        }
        .panel-form{
            margin-top: 0;

            .panel-hd{
                padding-bottom: 0;
            }
        }

        .submit-btn{
            display: block;
            margin:24px 30px;
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
           
            .label{
                color:$light-gray;
                width: 5em;
            }
            .input{
                height: 100%; 
                border:none;
                width: 100%;
                display: block;
            }

        }
    }

    .agreement{
        margin:0 30px;
        font-size: 12px;
        color: #757575;
    }

</style>
