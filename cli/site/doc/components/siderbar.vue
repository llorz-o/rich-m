<template>
	<div class="siderbar">
		<router-link
			:to="{
				path: `/${item}`,
				query: {
					component: item
				}
			}"
			v-for="(item, index) in $root.componentsKeys"
			:key="index"
		>
			{{ item }}
		</router-link>
	</div>
</template>

<style lang="less">
.siderbar {
	width: 120px;
	position: fixed;
	top: 50px;
	left: 0;
	bottom: 0;
	a {
		text-decoration: none;
		display: block;
		line-height: 35px;
		text-align: center;
		height: 35px;
	}
}
</style>
