<template>
  <layout class="l1" :promise.sync="promiseList">
    <template #header>
      <div class="header">
        layout1
      </div>
    </template>
    <div class="block">
      <router-link to="/layout2" replace>
        layout2
      </router-link>
    </div>
    <div v-for="(item) in list" :key="item">{{item}}</div>
    <div v-for="(item) in list2" :key="item">{{item}}</div>
    <template #footer>
      <div class="footer">
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
      </div>
    </template>
  </layout>
</template>

<script>
/** @format */

export default {
    data() {
        return {
            list2: [],
            list: [],
            promiseList: [],
        }
    },
    methods: {
        getData() {
            setTimeout(() => {
                this.promiseList.push(() => {
                    this.list = 5
                })
            }, 4000)
        },
        getData2() {
            setTimeout(() => {
                this.promiseList.push(() => {
                    this.list2 = ['a', 'b', 'c', 'd', 'e']
                })
            }, 0)
        },
    },
    created() {
        this.getData()
        this.getData2()
    },
}
</script>

<style lang="less">
/** @format */
.l1 {
    .rich-layout__content {
        &::before {
            height: 40px;
        }
        &::after {
            height: 50px;
        }
    }
}
.block {
    height: 200px;
}
.header {
    height: 40px;
    color: white;
    line-height: 40px;
    text-align: center;
    background-color: red;
    .fixed {
        position: fixed;
        left: 0;
        right: 0;
    }
}
.footer {
    height: 50px;
    width: 100vw;
    display: flex;
    background-color: #d5d5d5;
    white-space: nowrap;
    span {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        text-align: center;
        flex: 1;
    }
}
</style>
