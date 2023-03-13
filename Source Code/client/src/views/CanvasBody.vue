<template>
  <div class="container-body">
    <div class="canvas-header"></div>
    <div class="canvas-toolbar">
      <CanvasToolBar />
    </div>
    <div class="canvas-comments"></div>
    <div class="canvas-footer"></div>
    <div class="canvas-body">
      <CanvasComponent />
    </div>
  </div>
</template>

<script>
import CanvasComponent from "../Components/CanvasComponent.vue";
import CanvasToolBar from "../Components/CanvasToolBar.vue";

export default {
  name: "CanvasBody",

  components: {
    CanvasToolBar,
    CanvasComponent,
  },
};
</script>

<style scoped>
.canvas-header {
  position: absolute;
  top: 0;
  height: 7vh;
  width: 100%;
  background: gray;
}
.canvas-toolbar {
  position: absolute;
  top: 7vh;
  left: 0;
  width: 5vw;
  height: 93vh;
}
.canvas-comments {
  position: absolute;
  top: 7vh;
  right: 0;
  bottom: 7vh;
  background: gray;
}
.canvas-footer {
  position: absolute;
  bottom: 0;
  left: 5vw;
  height: 7vh;
  width: 100%;
  background: gray;
}

.canvas-body {
  position: absolute;
  top: 7vh;
  bottom: 7vh;
  left: 5vw;
  right: 5vw;
  height: auto;
  width: auto;
}
</style>