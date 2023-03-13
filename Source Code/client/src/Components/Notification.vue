<template>
  <div   v-if="notificationData.length!=0" class="note-alert">
    <div class="alertbox" v-for="data in notificationData" :key="data.message">
      <v-alert
        class="alert"
        title="Important"

        variant="outlined"
        v-model="alert"
        close-label="Close Alert"
        color="deep-purple-accent-4"
      >
      {{ data.message }}
      </v-alert>
    </div>
    <div class="close-button" id="closebtn">
      <button type="button" class="alertclose" @click="close">&times;</button>
    </div>
  </div>
</template>

<script>
import MemberServices from '../services/MemberService'

export default {
  name: "NotificationComponent",
  data() {
    return {
      alert: true,
      notificationData: []
    };
  },

  mounted() {
    MemberServices.getNotifications().then((res) => {
      this.notificationData = res.data.notification
    }).catch((err) => {
      this.error = err
    })
  },

  methods: {
    close() {
      let closebutton = document.getElementById("closebtn");
      closebutton.style.display = "none";
      this.alert = false;
      this.$emit("close");
    },
  },
};
</script>
<style scoped>
.alertbox {
  width: 100%;
  display: block;
  justify-content: center;
}

.alert {
  width: 79vw;
  border-color: #000;
  background-color: aliceblue;
  color: green !important;
  position: absolute;
}

.alertclose {
  margin-right: 20px;
  position: relative;
  background-color: "deep-purple accent-4";
}

.note-alert {
  display: flex;
  width: 100%;
}

@media screen and (max-width: 1041px) {
  .alert {
    width: 79%;
  }
}
</style>