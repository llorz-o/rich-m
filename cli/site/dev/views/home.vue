<template>
	<div class="home">
		<button @click="insertStyleBlock">red</button>
		<button @click="insertStyleBlock2">blue</button>
		<button @click="insertStyleBlock3">insert image</button>
		<editor ref="editor" />
	</div>
</template>

<script>
export default {
	methods: {
		insertStyleBlock() {
			this.$refs.editor.insertStyleBLock("red", {
				color: "red"
			});
		},
		insertStyleBlock2() {
			this.$refs.editor.insertStyleBlock("blue", {
				color: "blue"
			});
		},
		insertStyleBlock3() {
			this.$refs.editor.insertStyleBlock("blue", {
				color: "blue"
			});
		}
	}
};
</script>

<style lang="less">
.home {
	button {
		height: 30px;
		line-height: 30px;
		min-width: 60px;
	}
}
</style>
