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
            highlight: (code) => {
              return highlight.highlightAuto(code).value;
            },
          })
        : "";
    },
  },
};
</script>

<style lang="less">
.doc {
  padding: 20px;
  user-select: text;
  font-size: 13px;
  font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Helvetica,
    Segoe UI, Arial, Roboto, "PingFang SC", "Hiragino Sans GB",
    "Microsoft Yahei", sans-serif;

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
    position: relative;
    display: block;
    overflow-x: auto;
    color: #58727e;
    font-weight: 400;
    font-size: 13.4px;
    font-family: "Source Code Pro", "Monaco", "Inconsolata", monospace;
    line-height: 26px;
    white-space: pre-wrap;
    word-wrap: break-word;
    -webkit-font-smoothing: auto;
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
Monokai Sublime style. Derived from Monokai by noformnocontent http://nn.mit-license.org/
*/

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    background: #23241f;
  }

  .hljs,
  .hljs-tag,
  .hljs-subst {
    color: #f8f8f2;
  }

  .hljs-strong,
  .hljs-emphasis {
    color: #a8a8a2;
  }

  .hljs-bullet,
  .hljs-quote,
  .hljs-number,
  .hljs-regexp,
  .hljs-literal,
  .hljs-link {
    color: #ae81ff;
  }

  .hljs-code,
  .hljs-title,
  .hljs-section,
  .hljs-selector-class {
    color: #a6e22e;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-name,
  .hljs-attr {
    color: #f92672;
  }

  .hljs-symbol,
  .hljs-attribute {
    color: #66d9ef;
  }

  .hljs-params,
  .hljs-class .hljs-title {
    color: #f8f8f2;
  }

  .hljs-string,
  .hljs-type,
  .hljs-built_in,
  .hljs-builtin-name,
  .hljs-selector-id,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-addition,
  .hljs-variable,
  .hljs-template-variable {
    color: #e6db74;
  }

  .hljs-comment,
  .hljs-deletion,
  .hljs-meta {
    color: #75715e;
  }

  /*
Atom One Light by Daniel Gamage
Original One Light Syntax theme from https://github.com/atom/one-light-syntax
base:    #fafafa
mono-1:  #383a42
mono-2:  #686b77
mono-3:  #a0a1a7
hue-1:   #0184bb
hue-2:   #4078f2
hue-3:   #a626a4
hue-4:   #50a14f
hue-5:   #e45649
hue-5-2: #c91243
hue-6:   #986801
hue-6-2: #c18401
*/

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #383a42;
    background: #fafafa;
  }

  .hljs-comment,
  .hljs-quote {
    color: #a0a1a7;
    font-style: italic;
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #a626a4;
  }

  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e45649;
  }

  .hljs-literal {
    color: #0184bb;
  }

  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta-string {
    color: #50a14f;
  }

  .hljs-built_in,
  .hljs-class .hljs-title {
    color: #c18401;
  }

  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #986801;
  }

  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #4078f2;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-link {
    text-decoration: underline;
  }
  /*
Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax
base:    #282c34
mono-1:  #abb2bf
mono-2:  #818896
mono-3:  #5c6370
hue-1:   #56b6c2
hue-2:   #61aeee
hue-3:   #c678dd
hue-4:   #98c379
hue-5:   #e06c75
hue-5-2: #be5046
hue-6:   #d19a66
hue-6-2: #e6c07b
*/

  .hljs {
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #abb2bf;
    background: #282c34;
  }

  .hljs-comment,
  .hljs-quote {
    color: #5c6370;
    font-style: italic;
  }

  .hljs-doctag,
  .hljs-keyword,
  .hljs-formula {
    color: #c678dd;
  }

  .hljs-section,
  .hljs-name,
  .hljs-selector-tag,
  .hljs-deletion,
  .hljs-subst {
    color: #e06c75;
  }

  .hljs-literal {
    color: #56b6c2;
  }

  .hljs-string,
  .hljs-regexp,
  .hljs-addition,
  .hljs-attribute,
  .hljs-meta-string {
    color: #98c379;
  }

  .hljs-built_in,
  .hljs-class .hljs-title {
    color: #e6c07b;
  }

  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-type,
  .hljs-selector-class,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-number {
    color: #d19a66;
  }

  .hljs-symbol,
  .hljs-bullet,
  .hljs-link,
  .hljs-meta,
  .hljs-selector-id,
  .hljs-title {
    color: #61aeee;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-link {
    text-decoration: underline;
  }
}
</style>
