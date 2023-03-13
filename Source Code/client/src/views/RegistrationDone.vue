<template>
  <div class="container">
    <div class="card">
      <div class="head">
        <span class="heading">Registration email sent</span>
      </div>
      <div class="emailsent">
        <img src="../assets/emailsent.png" class="emailsent" alt="emailsent" />
      </div>
      <div class="description">
        <span class="des"
          >An email with a link to the registration page has been sent to the
          address you entered.<br />
          The URL to the registration page will expire after 24 hours.</span
        >
      </div>
      <div class="button">
        <input
          type="button"
          value="Home"
          class="btn"
          @click="$router.push('/InitialRegistration')"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.container .logospace {
  height: 150px;
  width: 200px;
}
.logo {
  height: 150px;
  width: 200px;
}

.card {
  display: flex;
  flex-direction: column;
  height: 500px;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 100px;
}
.card .head .heading {
  font-family: sans-serif;
  font-size: xx-large;
  color: #0a2b4a;
  font-weight: bolder;
}
.container .card .emailsent {
  margin-top: 20px;
}
.emailsent {
  margin-left: 20px;
}

.des {
  font-family: sans-serif;
  font-size: large;
  color: #294661;
}

.btn {
  font-family: sans-serif;
  display: inline-block;
  font-weight: bold;
  overflow: hidden;
  width: 175px;
  height: 44.5px;
  margin-top: 20px;
  border-radius: 15px;
  border: none;
  text-align: center;
  background: linear-gradient(#d25316, #1f64aa);
  color: white;
  cursor: pointer;
}

@media screen and (max-width: 642px) {
  .emailsent {
    margin-left: 20px;
    height: 273px;
    width: 476px;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 550px) {
  .emailsent {
    margin-left: 20px;
    height: 173px;
    width: 376px;
    margin-bottom: 20px;
  }
}
@media screen and (max-width: 457px) {
  .emailsent {
    margin-left: 20px;
    height: 73px;
    width: 276px;
    margin-bottom: 20px;
  }
}
</style>
