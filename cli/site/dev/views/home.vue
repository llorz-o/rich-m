<template>
  <div class="home">
    <div
      class="editor"
      contenteditable="true"
      @change="onChange"
      @input="onInput"
      @keydown="onKeydown"
      @keypress="onKeypress"
      @keyup="onKeyup"
    >
      12
    </div>
    <div>
      <table>
        <tr>
          <th>charCode</th>
          <th>code</th>
          <th>key</th>
          <th>keyCode</th>
          <th>type</th>
          <th>which</th>
        </tr>
        <tr v-for="(item, index) in list" :key="index">
          <td>{{ item.charCode }}</td>
          <td>{{ item.code }}</td>
          <td>{{ item.key }}</td>
          <td>{{ item.keyCode }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.which }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    onKeydown(e) {
      console.log("keydown", e);
      let { charCode, code, key, keyCode, type, which } = e;
      this.list.unshift({
        charCode,
        code,
        key,
        keyCode,
        type,
        which,
      });
    },
    onKeypress(e) {
      console.log("keypress", e);
      let { charCode, code, key, keyCode, type, which } = e;
      this.list.unshift({
        charCode,
        code,
        key,
        keyCode,
        type,
        which,
      });
    },
    onKeyup(e) {
      console.log("keyup", e);
      let { charCode, code, key, keyCode, type, which } = e;
      this.list.unshift({
        charCode,
        code,
        key,
        keyCode,
        type,
        which,
      });
    },
    onInput(e) {
      console.log("input", e);
    },
    onChange(e) {
      console.log("change", e);
    },
  },
};
</script>

<style lang="less">
.home {
  .editor {
    width: 100vw;
    height: 200px;
    border: 2px solid black;
  }
  button {
    height: 30px;
    line-height: 30px;
    min-width: 60px;
    margin: 0 5px;
    &.active {
      outline: 3px solid red;
    }
  }
  table {
    width: 100vw;
    tr,
    th {
      width: 100vw;
      td {
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
  }
}
</style>
