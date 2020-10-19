<template>
  <div>

  </div>
</template>

<script>
/** @format */

import WebStorageCache from 'web-storage-cache'

export const title = 'WebStorageCache'
export default {
    created() {
        const cache = new WebStorageCache({
            storage: 'sessionStorage',
        })

        cache.set(
            'k',
            {
                name: 'jojo',
            },
            {
                exp: 100,
            },
        )

        console.log(cache.get('k'))
    },
}
</script>
