<template>
  <router-view :key="$route.path"></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  }
}
</script>

<style>

*{
  margin: 0;
  padding: 0;
}

</style>
