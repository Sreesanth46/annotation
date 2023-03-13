<template>
  <div class="container">
    <div class="sub">
      <div class="card">
        <img alt="Vue logo" src="../assets/Annotation.png" height="270" />
      </div>
      <div v-if="error" style="color: red;">
        {{this.msg1 }}
      </div>

      <div class="remindpassword">
        <span >when an email is inputted and </span>
        <span>submited ,the password setup URL is sent</span>
     
      </div>
      <br />
      <br />

      <form @submit.prevent="handleSubmission" ref="forgotpasswordform">
        <div class="details">
          <div class="email">
            <input
              type="text"
              v-model="email"
              placeholder="Email address"
              name="username"
              class="typeemail"
              @blur="v$.email.$touch()"
              @keydown="v$.email.$touch()"
              v-bind:class="{
                error: v$.email.$error,
                valid: v$.email.$dirty && !v$.email.$invalid,
              }"
              autocomplete="off"
            /><br />
            <span v-if="v$.email.$error" style="color: red; margin-left: 20px">
              {{ v$.email.$errors[0].$message }}
            </span>
          </div>

          <div class="forgotlink">
            <router-link to="/login">Back To Login</router-link>

            <input type="submit" value="Submit" class="loginbut" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
   
    
    <script>
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
import ApiService from "../services/ApiService.js";
export default {
  name: "ForgotPasswordComponent",
  data() {
    return {
      email: "",

      msg: [],
      disabled: [true, true],
      v$: useVuelidate(),
      msg1:'',
      error:''
    };
  },

  validations() {
    return {
      email: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("Please enter valid email", email),
        $autodirty: true,
      },
    };
  },

 
  methods: {
    handleSubmission() {
      this.v$.$validate();
      if (!this.v$.email.$error) {
        let data = {
          email: this.email,
        };

        
        ApiService.forgotPassword(data).then(
          () => {
            this.$router.push("/forgotsuccessemail");
            Swal.fire({
             
             icon: "success",
             title: "Email Sent Successfully",
             timer:3000,
             heightAuto:"20px",
             position:'top-right',
           });
          },
          (err) => {
            this.error = err.response.data.errorCode;
            if(this.error=="2002")
            {
              this.msg1="Email id does not match"
            }
            this.$refs.forgotpasswordform.reset();
          }
        );
      }
    },
  },
};
</script>
    
    
<style scoped>
.card {
  margin-top: 130px;
  margin-left: -18px;
}
.remindpassword {
  margin: 10px;
  line-height: 0.976;
  color: #333;
  font-family: sans-serif;
  font-size: 14px;
  box-sizing: border-box;
  width: 258px;
}

.typeemail {
  height: 31px;
  width: 258px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 6px 12px;
  font-size: 14px;
  color: #555;
  margin-top: -40px;
  margin-left: 27px;
}

.loginbut {
  background-color: #1b67b1;
  height: 25px;
  width: 25%;
  margin-left: 200px;
  color: #fff;
  font-size: 14px;
  box-shadow: none;
  border-color: #1b67b1;
  border-radius: 3px;
  cursor: pointer;
  margin-top: -50px;
}

a {
  color: #028fc8;
  font-size: 12px;
}

.sub {
  display: flex;
  flex-direction: column;
  align-items: center;

}
.forgotlink {
  margin-top: 25px;
  line-height: 0.976;

  box-sizing: border-box;
}
</style>
    