<template>
	<div
		class="siderbar"
		:style="{
			width: `${width}px`
		}"
	>
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
			{{ item | textFirstUppercase }}
		</router-link>
	</div>
</template>

<script>
export default {
	props: {
		width: String
	},
	filters: {
		textFirstUppercase(v) {
			return v.replace(/[\w\W]/, match => match.toUpperCase());
		}
	}
};
</script>

<style lang="less">
.siderbar {
	position: fixed;
	top: 50px;
	left: 0;
	bottom: 0;
	font-size: 15px;
	a {
		position: relative;
		text-decoration: none;
		display: block;
		line-height: 35px;
		text-align: center;
		height: 35px;
		margin: 10px 5px;
		border-radius: 8px;
		font-size: 17px;
		font-weight: bold;
		color: #fff;
		text-shadow: -2px 2px 2px #b7bcc5;
		background: linear-gradient(-45deg, #cfd4d9, #eff1f0);
		box-shadow: -4px 4px 5px #a8b2b8, inset 1px -1px 2px #cbd4d9,
			inset -1px 1px 2px #f0f4f5;
		&:hover,
		&:visited,
		&:active {
			color: #fff;
			text-shadow: -2px 2px 2px #b7bcc5;
		}
		&::after {
			display: block;
			content: "";
			position: absolute;
			top: 2px;
			left: 2px;
			right: 2px;
			bottom: 2px;
			user-select: none;
			border-radius: 7px;
			box-shadow: inset -1px 1px 4px rgba(206, 209, 216, 0.2),
				inset -1px 1px 4px rgba(232, 232, 233, 0.2),
				1px -1px 1px rgba(234, 235, 237, 1);
		}
	}
}
</style>
