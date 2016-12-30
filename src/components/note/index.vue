<template>
	<div class='note-box'>
		<div class='note-content'>
			<div class="note-word">
				<h1>{{title || ''}}</h1>
				<p>{{msg || ''}}</p>
			</div>
			<div class="note-btn">
				<p class="cancel" @click="cancelBtn(cancelCb)">{{cancel || '取消'}}</p>
				<p class="confirm" @click="confirmBtn(confirmCb)">{{confirm || '确认'}}</p>
			</div>
		</div>
	</div>
</template>

<script>

</script>

<style lang='sass'>
.note-box{
	position: fixed;
	background: rgba(0,0,0,0.54);
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	z-index: 999999;
	.note-content{
		background: rgba(255,255,255,0.87);
		left: 0;
		right: 0;
		margin: 0 auto;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 288px;
		border-radius: 12px;
		.note-word{
			text-align: center;
			margin: 24px 16px;
			h1{
				font-size:24px;
			}
			p{
				font-size: 18px;
			}
		}
		.note-btn{
			display: flex;
			border-top: 1px solid #BEC1C5;
			p{
				font-size: 16px;
				color: #007AFF;
				text-align: center;
				flex: 1;
				height: 50px;
				line-height: 50px;
				&:nth-child(2){
					border-left:1px solid #BEC1C5;
				}
			}
		}
	}
}
</style>