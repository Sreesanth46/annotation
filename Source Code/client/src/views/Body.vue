<template>
  <div class="main-body">
    <div class="header">
      <MainHeader />
    </div>
    <div class="side-nav">
      <Sidebar />
    </div>
    <div class="router-view-body">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "../Components/Sidebar.vue";
import MainHeader from "../Components/MainHeader.vue";

export default {
  name: "MainBody",

  components: {
    Sidebar,
    MainHeader,
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  left: 19.5vw;
  right: 0;
  height: 11.5vh;
  background: white;
}

.side-nav {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 19.5vw;
}

.router-view-body {
  position: absolute;
  left: 19.5vw;
  top: 92px;
  right: 0;
  bottom: 0;
  z-index: -1;
}
</style>
