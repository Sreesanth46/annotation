<template>
  <div class="subheader-container">
    <div class="contents">
      <ul class="subheader-contents">
        <li>
          <router-link to="/unreadcomments" active-class="active"
            >Unread comments</router-link
          >
        </li>
        <li>
          <router-link to="/assigneditems" active-class="active"
            >Assigned items</router-link
          >
        </li>
        <li><router-link to="/pin" active-class="active">Pin</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubHeader",

  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
.subheader-container {
  width: 100%;
  height: 6.375vh;
  display: flex;
  background-color: white !important;
}
.subheader-contents {
  list-style: none;
  display: flex;
  padding: 5px;
}
.subheader-container .subheader-contents li {
  margin-left: 5%;
}
.subheader-container .subheader-contents li a {
  text-decoration: none;
  color: #26d6ff;
}

.subheader-container .contents {
  width: 50%;
  margin-top: 15px;
}
.subheader-container .subheader-contents li a.active {
  color: #a2a3a3;
}
.active {
  color: grey;
}
</style>
