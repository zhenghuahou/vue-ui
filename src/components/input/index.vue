<template>
	<div class="input-iphone">
		<div class="iphone input">
			<slot name='iphone'></slot>
			<input type="tel" v-model="tel" name="tel" :placeholder="phoneplaceholder" maxlength="15"   @input="onInput">
			<span class="getCode" :class="{sendCode:sendCodeAble}" @click="sendCode">{{codeText}}</span>
		</div>
		<div class="code input">
			<slot name='code'></slot>
			<input type="tel" v-model="scode" name="scode" :placeholder="codeplaceholder" maxlength="4"   @input="onInput">
		</div>
	</div>
</template>

<script>

import Api from './api';

//提示信息
let messages ={
  'tel':'请输入正确的手机号',
  'scode':'验证码有误,请重新输入',
}

//校验规则
let matchRules = {
  'tel':/\d{11,15}/,
  'scode':/\d{4}/
}

//替换规则
let replaceRules= {
  'tel':/\D/g,
  'scode':/\D/g,
}

let codeTime = 60;

export default{
	props:{
		phoneplaceholder:{
			default:'请输入手机号'
		},
		codeplaceholder:{
			default:'请输入验证码'
		}
	},
	data(){

		return{
			tel:"",
			scode:"",
			codeTime,
			sendCodeAble:null,
			timer:null,
			codeText:"获取验证码",
			messages:Object.assign({},messages)
		}
	},
	
	mounted () {
	},

	methods:{
		 countdown(){
			clearTimeout(this.timer);
			if(this.codeTime <= 1 ){
				this.codeTime = codeTime;
				this.sendCodeAble =  matchRules.tel.test(this.tel) ? true:false;//可以再次发送验证码
				this.codeText = "重新获取";
				return ;
			}else{
				this.codeTime -- ;
				this.codeText = "还剩"+ this.codeTime +"s";
			}
			this.timer = setTimeout(()=>this.countdown(),1000);
		},
		
		sendCode(){
			// console.info('发送验证码:',this.sendCodeDisable);
			if(!this.sendCodeAble){
        		return false;
      		}
      		this.sendCodeAble = false;
      		
			let callback = (res) => {
				console.info(' res:',res,'类型:',typeof res);
				if(res.status != 0){
					this.$toast(res.msg);
					this.sendCodeAble = true;
					return;
				}
				this.countdown();
			}

			let formData = {
				mobile: this.tel,
			}

			Api('sendCode')(formData)(callback).catch(function(err){
				this.sendCodeAble = true;
				this.$toast('网络异常');
			})
		},
		onInput (event) {
            let {name,value} = event.target;
            let {[name]:rule} = replaceRules;
            value = value.replace(rule,'');
            if(name == 'tel'){
            	//this.codeTime == codeTime 是考虑在验证码倒计时的过程,如果用户修改手机号，这个时候验证码的状态不能改变
            	if(matchRules.tel.test(this.tel) && this.codeTime == codeTime){
					this.sendCodeAble = true;
            	}else{
            		this.sendCodeAble = false;
            	}
            }
            this[name] = value;
            this.$emit('input', event,value);
        },
	}
}
</script>

<style lang="sass">
	@import "../../global/qqd/variable.scss";

	.input-iphone{
		margin-left: 32px;
		margin-right: 32px;
		.label{
			color:$light-gray;
			display: block;
		}
		.input{
			border-bottom: 1px solid $border-color;
			display: flex;	
			height: 46px;
			align-items:center;
			position: relative;
			.iconfont{
				color: #E5E5E5;
				margin-left: 12px;
				margin-right: 12px;
			}
	
			.icon{
				width: 18px;
				height: 18px;
				display: inline-block;
				text-align: center;
				vertical-align: middle;
				margin-right: 10px;
				.iphone-icon{
					width: 10px;
					height: 18px;
				}
				.code-icon{
					width: 14px;
					height: 10px;
				}
			}
			input{
				display: inline-block;
				vertical-align: middle;
				font-size: 15px;
				background: none;
				border: none;
				flex: 1;
				// width: 0;
			}
			.getCode{
				height: 32px;
				line-height: 32px;
				width: 76px;
				border: 1px solid $border-color;
				display: inline-block;
				text-align: center;
				color: $gray;
				font-size: 13px;
				border-radius: 3px;
				&.sendCode{
					color: $link-color;
					border: 1px solid $link-color;
				}
			}
		}
	}
</style>