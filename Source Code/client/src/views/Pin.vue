<template>
  <div class="pin-inner-layer">
    <div class="pin-headers-area">
      <sub-header />
    </div>
    <div class="pin-container">
      <div class="contents">
        <span class="material-symbols-outlined push_pin"> push_pin </span>
        <div class="written-contents">
          <span class="main">There are no pinned items</span><br />
          <span class="sub"
            >If you pin an item, it will be displayed here.</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubHeader from "../Components/SubHeader.vue";

export default {
  components: { SubHeader },

  name: "PinItems",
};
</script>

<style scoped>
.pin-inner-layer {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.pin-headers-area {
  display: flex;
  flex-direction: column;
}

.pin-container {
  
  height: calc(100vh - 17.875vh);
  display: flex;
  background-color: #eeeeee;
  justify-content: center;
}
.pin-container .contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pin-container .contents .push_pin {
  margin-left: 45%;
  height: 50px;
}
.pin-container .contents .written-contents .main {
  margin-left: 12%;
  font-weight: bold;
  font-size: large;
  color: rgb(255, 117, 4);
}
.pin-container .contents .written-contents span {
  font-family: sans-serif;
}
.pin-container .contents .written-contents .sub {
  color: grey;
}
</style>
