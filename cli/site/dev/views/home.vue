<template>
	<div class="home">
		<button
			v-for="(item, index) in styleOptions"
			:key="index"
			@click="() => insertStyleBlock(item)"
			:class="activeSty === item.styleId ? 'active' : ''"
		>
			{{ item.styleId }}
		</button>
		<button @click="insertImage">insert image</button>
		<editor ref="editor" @style="currentSty" />
	</div>
</template>

<script>
/* <img class={["img"]} src="http://www.divcss5.com/uploads/allimg/130204/1_130204153950_1.png" alt="" /> */
export default {
	data() {
		return {
			activeSty: "__black",
			styleOptions: [
				{
					styleId: "red",
					style: {
						color: "red"
					}
				},
				{
					styleId: "blue",
					style: {
						color: "blue"
					}
				},
				{
					styleId: "green",
					style: {
						color: "green"
					}
				}
			]
		};
	},
	methods: {
		insertStyleBlock({ styleId, style }) {
			this.$refs.editor.registerColor(styleId, style);
		},
		insertImage() {
			this.$refs.editor.insertImage(
				"http://www.divcss5.com/uploads/allimg/130204/1_130204153950_1.png"
			);
		},
		currentSty(styleId) {
			this.activeSty = styleId;
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
		margin: 0 5px;
		&.active {
			outline: 3px solid red;
		}
	}
}
</style>
