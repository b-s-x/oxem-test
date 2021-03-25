<template>
  <div id="app">
    <main-page/>
  </div>
</template>

<script>

import MainPage from "./pages/Main"

export default {
  name: 'App',
  components: {
    MainPage
  },

  data() {
    return {

    }
  },
}
</script>

<style lang="scss">

#app {
  display: flex;
  justify-content: center;
  align-items: center;
}


</style>
