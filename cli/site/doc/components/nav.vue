<template>
	<div class="nav">
		<router-link to="/" class="logo">rich-m</router-link>
	</div>
</template>

<style lang="less" scoped>
.nav {
	top: 0;
	position: sticky;
	height: 50px;
	width: 100vw;
	background-color: #5a4c4c;
	color: #ffffff;
	padding-left: 300px;
	display: flex;
	.logo {
		line-height: 50px;
		text-transform: uppercase;
		font-size: 24px;
		font-weight: bolder;
		padding: 0 20px;
		&:hover,
		&:active,
		&:visited {
			color: white;
		}
	}
}
</style>
