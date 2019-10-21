<template>
  <div id="app" class="fixed inset-0 flex flex-col">
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data() {
    return {
    }
  },
  computed: {
  }
}
</script>

<style>
*{
  font-size: 14px;
}
#app {
  font-family: Arial, "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.formBar::before{
  position: absolute;
  left:0;
  top: 14px;
  content: '';
  width: 4px;
  height:13px;
  background-image: linear-gradient( #ff8b00 10%, #ffce00 80%);
}
.formBar::after{
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 16px;
  border-bottom: 1px solid #ebedf0;
  -webkit-transform: scaleY(.5);
  transform: scaleY(.5);
}

</style>
