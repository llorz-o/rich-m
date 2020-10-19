<template>
  <div>

  </div>
</template>

<script>
/** @format */
import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('db')
const db = low(adapter)

export const title = 'Lowdb 本地存储数据库'
export default {
    created() {
        db.defaults({posts: []}).write()
        db.get('posts').push({title: 'lowdb'}).write()
    },
}
</script>
