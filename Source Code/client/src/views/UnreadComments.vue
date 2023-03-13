<template>
  <div class="unreadcomments-inner-layer">
    <div class="unreadcomments-headers-area">
      <notification />
      <sub-header />
    </div>
    <div class="unreadcomments-container">
      <div class="contents">
        <span class="material-symbols-outlined check_circle">
          check_circle
        </span>
        <div class="written-contents">
          <span class="main">There are no unread comments</span><br />
          <span class="sub"
            >You have read all the comments addressed to you</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from "../Components/Notification.vue";
import SubHeader from "../Components/SubHeader.vue";
export default {
  components: { SubHeader, Notification },

  name: "UnreadComments",
};
</script>

<style scoped>
.unreadcomments-inner-layer {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.unreadcomments-headers-area {
  display: flex;
  flex-direction: column;
}

.unreadcomments-container {
  height: calc(100vh - 17.875vh);
  display: flex;
  background-color: #eeeeee;
  justify-content: center;
}
.unreadcomments-container .contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.unreadcomments-container .contents .check_circle {
  margin-left: 45%;
  height: 50px;
}
.unreadcomments-container .contents .written-contents .main {
  margin-left: 15%;
  font-weight: bold;
  font-size: large;
  color: rgb(255, 117, 4);
}
.unreadcomments-container .contents .written-contents span {
  font-family: sans-serif;
}
.unreadcomments-container .contents .written-contents .sub {
  color: grey;
}
</style>
