<template>
	<select class="city-list" v-model="selected">
        <option :value="item.id" v-for="(item,key) in selectedList">{{item.name}}</option>
    </select>
</template>

<script>
	export default{
		props:{
			selected:{
				type:[String,Number]
			},
			selectedList:{
				type:[Array,Object]
			}
		},
		watch:{
			selected:function(val,oldval){
				if(val != oldval){
					this.$emit('selectedChange',val)
				}
			}
		}
	}
</script>

<style lang='sass'>
.city-list{
	line-height: 1;
}
</style>