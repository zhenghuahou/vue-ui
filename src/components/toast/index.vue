<template>
	<div class='toast-box' id='toastBox' v-bind:style='animation'>
		<p class='toast-msg'>{{msg}}</p>
	</div>
</template>

<script>
	export default{
		mounted(){
			let self = this;
			this.animation['animation-duration'] = this.time + 's';
			this.animation['-webkit-animation-duration'] = this.time + 's';
			console.log(self.time *1000);
			setTimeout(function(){
				self.$el.style.display = 'none';
			},self.time*1000);
		}
	}
</script>

<style lang="sass">
	.toast-box{
		position: fixed;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		right: 0;
		margin: auto;
		text-align: center;
		opacity: 0;
		.toast-msg{
			background: rgba(0,0,0,0.8);
			color: #fff;
			display: inline-block;
			padding: 8px 12px;
			font-size: 14px;
			line-height: 18px;
			border-radius: 8px;
			max-width: 70%;
		}
	}

	@keyframes toastTran{
		0% {
			opacity: 0;
		}
		25% {
			opacity: 1;
		}
		75% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>