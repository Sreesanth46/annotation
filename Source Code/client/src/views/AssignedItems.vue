<template>
    <div class="inner-layer">
      <div class="headers-area">
        <sub-header />
      </div>
      <div class="assigned-items-container">
        <div class="contents">
          <span class="material-symbols-outlined account_circle">
            account_circle
          </span>
          <div class="written-contents">
            <span class="main">There are no assigned items</span><br />
            <span class="sub"
              >If you are designated as the assignee for an item, it will be
              displayed here.</span
            >
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import SubHeader from "../Components/SubHeader.vue";

export default {
  components: {SubHeader },

  name: "AssignedItems",
};
</script>

<style scoped>

.inner-layer {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.headers-area {
  display: flex;
  flex-direction: column;
}
.headers-area {
  display: flex;
}
.assigned-items-container {
  height: calc(100vh - 17.875vh);
  display: flex;
  background-color: #eeeeee;
  justify-content: center;
}
.assigned-items-container .contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.assigned-items-container .contents .account_circle {
  margin-left: 45%;
  height: 50px;
}
.assigned-items-container .contents .written-contents .main {
  margin-left: 25%;
  font-weight: bold;
  font-size: large;
  color: rgb(255, 117, 4);
}
.assigned-items-container .contents .written-contents span {
  font-family: sans-serif;
}
.assigned-items-container .contents .written-contents .sub {
  color: grey;
}
</style>
