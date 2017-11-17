<template>
  <div>
    <header-bar></header-bar>
    <nav-bar></nav-bar>
    <icon-bar></icon-bar>
  </div>
</template>
<script>
import HeaderBar from './HeaderBar.vue'
import NavBar from './NavBar.vue';
import IconBar from './IconBar.vue'
export default {
  components: {
      HeaderBar:HeaderBar,
    NavBar:NavBar,
    IconBar:IconBar
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
}
</script>
<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
