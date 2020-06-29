<template>
  <div class="Home">
    <div class="topNav">12</div>
    <div class="bottomContent">
      <div class="leftNav">
        <router-link to="/home">home</router-link>
        <router-link to="/tabs">tabs</router-link>
      </div>
      <div class="context">
        <router-view></router-view>
      </div>
      <Simulator />
    </div>
  </div>
</template>
