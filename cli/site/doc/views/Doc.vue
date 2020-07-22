<template>
	<div class="doc" v-html="renderMarkdown2Html"></div>
</template>

<script>
import Marked from "marked";
import highlight from "highlight.js";
export default {
	computed: {
		renderMarkdown2Html() {
			return this.$root.doc
				? Marked(this.$root.doc, {
						highlight: code => {
							return highlight.highlightAuto(code).value;
						}
				  })
				: "";
		}
	}
};
</script>

<style lang="less">
.doc {
	padding: 20px;
	user-select: text;
	* {
		color: #303030;
		user-select: text;
		font-family: inherit;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-weight: bold;
		padding: 5px 0;
		margin: 10px 0;
	}
	h1 {
		font-size: 25px;
	}
	h2 {
		font-size: 22px;
	}
	h3 {
		font-size: 19px;
	}
	h4 {
		font-size: 16px;
	}
	h5 {
		font-size: 13px;
	}
	h6 {
		font-size: 10px;
	}

	pre {
		margin: 10px 0;
		background-color: #303030;
		color: white;
		padding: 10px;
		border-radius: 5px;
		font-size: 15px;
		font-weight: 500;
		line-height: 20px;
		letter-spacing: normal;
		* {
			color: white;
		}
	}

	p {
		font-size: 13px;
		line-height: 20px;
		font-weight: 500;
		code {
			display: inline-block;
			border-radius: 2px;
			background-color: #d1e3db;
			padding: 0 3px;
			margin: 0 2px;
		}
	}

	table {
		width: 100%;
		border: 1px solid #4f506d;
		thead {
			background-color: #5a4c4c;

			th {
				color: white;
				text-align: left;
			}
		}
		tr,
		thead {
			&:nth-child(2n) {
				background-color: #e1dbcd;
			}
			th,
			td {
				height: 30px;
				border-right: 1px solid #4f506d;
				padding: 0 5px;
			}
			th {
			}
			td {
			}
		}
	}

	/*
Monokai style - ported by Luigi Maselli - http://grigio.org
*/

	.hljs {
		display: block;
		overflow-x: auto;
		padding: 0.5em;
		background: #272822;
		color: #ddd;
	}

	.hljs-tag,
	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-strong,
	.hljs-name {
		color: #f92672;
	}

	.hljs-code {
		color: #66d9ef;
	}

	.hljs-class .hljs-title {
		color: white;
	}

	.hljs-attribute,
	.hljs-symbol,
	.hljs-regexp,
	.hljs-link {
		color: #bf79db;
	}

	.hljs-string,
	.hljs-bullet,
	.hljs-subst,
	.hljs-title,
	.hljs-section,
	.hljs-emphasis,
	.hljs-type,
	.hljs-built_in,
	.hljs-builtin-name,
	.hljs-selector-attr,
	.hljs-selector-pseudo,
	.hljs-addition,
	.hljs-variable,
	.hljs-template-tag,
	.hljs-template-variable {
		color: #a6e22e;
	}

	.hljs-comment,
	.hljs-quote,
	.hljs-deletion,
	.hljs-meta {
		color: #75715e;
	}

	.hljs-keyword,
	.hljs-selector-tag,
	.hljs-literal,
	.hljs-doctag,
	.hljs-title,
	.hljs-section,
	.hljs-type,
	.hljs-selector-id {
		font-weight: bold;
	}
}
</style>
