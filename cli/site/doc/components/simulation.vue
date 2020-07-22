<template>
	<div class="simulation">
		<iframe height="667" width="375" :src="iframeSrc"></iframe>
	</div>
</template>

<script>
export default {
	data() {
		return {
			origin: "http://localhost:5001"
		};
	},
	computed: {
		iframeSrc() {
			return this.origin + "/#" + this.$route.fullPath;
		}
	}
};
</script>

<style lang="less">
.simulation {
	width: 400px;
	top: 50px;
	padding-top: 50px;

	iframe {
		border-radius: 10px;
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
	}
}
</style>
