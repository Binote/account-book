<template>
  <div id="app">
    <router-view></router-view>
    <router-view name="layout">

        <transition name="fadeTran">
          <router-view name="content"></router-view>
        </transition>

      </router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  /* CSS */
html,body{
  height: 100%;
  width: 100%;
}
#app {
  position: relative;
  height: 100%;
  width: 100%;
}
.fadeTran-enter-active {
  transition: all 1s;
}
.fadeTran-enter {
  transform: translateX(-40px);
  opacity: 0;
}
</style>
