<template>
  <layout>
    <Header slot="header" left-text="返回" title="上拉加载" @click-left="$router.go(-1)" />

    <Block title="基本使用">
      <Tabs>
        <Tab title="上拉加载1">
          <Fill>
            <PullupLoading>

            </PullupLoading>
          </Fill>
        </Tab>
        <Tab title="上拉加载2">
          <Fill>
            <PullupLoading>

            </PullupLoading>
          </Fill>
        </Tab>
      </Tabs>
    </Block>
  </layout>
</template>

<script>
/** @format */

export const name = '上拉加载'
export default {}
</script>
