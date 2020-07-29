<template>
	<div>
		<router-link
			:to="item.path"
			v-for="(item, index) in $root.localRoutes"
			:key="index"
		>
			{{ item.path }}
		</router-link>
		<router-view></router-view>
	</div>
</template>

<script>
export default {};
</script>

<style lang="less">
@import "../../../src/sty/index.less";
.block {
	height: 300px;
	border: 1px solid #555;
}
a {
	line-height: 20px;
	padding: 0 10px;
	margin: 2px 4px;
	border: 1px solid red;
}
</style>
