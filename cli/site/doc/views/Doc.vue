<template>
	<div v-html="renderMarkdown2Html"></div>
</template>

<script>
import Marked from "marked";
export default {
	computed: {
		renderMarkdown2Html() {
			return this.$root.doc ? Marked(this.$root.doc, {}) : "";
		}
	}
};
</script>
