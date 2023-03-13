<template>
  <div class="container">
    <div class="sub">
      <div class="card">
        <img alt="Vue logo" src="../assets/Annotation.png" height="300" />
      </div>
      <p class="message">
        An email has been sent to email explaining how to change passwords.
        Please check that email.
      </p>

      <div class="backtologin">
        <router-link to="/login">Back To Login</router-link>
      </div>
    </div>
  </div>
</template>
   
    
    <script>
export default {
  name: "ForgotsuccessemailComponent",
};
</script>
    
    
  <style scoped>
.card {
  margin-top: 130px;
}

.message {
  margin-bottom: 16px;
  margin-left: 38px;
  line-height: 0.976;
  color: #333;
  font-family: sans-serif;
  font-size: 14px;
  box-sizing: border-box;
  width: 258px;
}

.sub {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.backtologin {
  margin-top: 25px;
  line-height: 0.976;
  box-sizing: border-box;
}
</style>
    