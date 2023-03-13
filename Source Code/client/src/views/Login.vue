
<template>
  <div class="container">
    <div class="sub">
      <div class="card">
        <img alt="Vue logo" src="../assets/Annotation.png" height="270" />
      </div>

      <div v-if="error" style="color: red; padding-bottom: 20px">
        {{this.msg1 }}
      </div>

      <form  @submit.prevent="handleSubmission">
        <div class="details">
          <div class="email">
            <input
              type="text"
              v-model.trim="email"
              placeholder="Email address or accountId "
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

            <span v-if="v$.email.$error"  style="color: red">
              {{ v$.email.$errors[0].$message }}
            </span>
          </div>

          <div class="password">
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              name="password"
              id="password"
              maxlength="30"
              minlength="8"
              class="typepassword"
              @blur="v$.password.$touch()"
              @keydown="v$.password.$touch()"
              v-bind:class="{
                error: v$.password.$error,
                valid: v$.password.$dirty && !v$.password.$invalid,
              }"
              autocomplete="off"
            />
            
            <span
              class="material-symbols-outlined eye-open"
              id="eyeopen"
              @click="showPassword()"
            >
              visibility </span
            ><span
              class="material-symbols-outlined eye-close"
              id="eyeclose"
              @click="hidePassword()"
            >
              visibility_off </span
            ><br />

            <span v-if="v$.password.$error" style="color: red">
              {{ v$.password.$errors[0].$message }} </span
            ><br />
          </div>

          <div class="set">
            <input type="submit" value="Login" class="loginbut" />
          </div>
          <div class="forgotlink">
            <router-link class="forgot" to="/forgotpassword"
              >Forgot your password?</router-link>
            
          </div>
          <div class="signup">
            Dont have an account?
            <router-link class="forgot" to="/initialregistration">
            Signup </router-link>
            Here
          </div>
        </div>
      </form>
    </div>
  </div>
</template>



<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
const alphanumandsymbol = helpers.regex(
  /^(?!.* )(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/);
import Swal from "sweetalert2";
import ApiService from "../services/ApiService.js";

export default {
  name: "LoginComponent",
  validations() {
    return {
      email: {
        required: helpers.withMessage("Email or accountid required", required),
        $autodirty: true,
      },
      password: {
        required: helpers.withMessage("Password is Required", required),
        alphanumandsymbol: helpers.withMessage(
          "Password should be alphanumeric containing special characters without space",
          alphanumandsymbol
        ),
        $autodirty: true,
      },
    };
  },
  data() {
    return {
      email: "",
      password: "",
      v$: useVuelidate(),
      error: "",
      msg1:''
    };
  },
  
  methods: {
    showPassword() {
      let eyeiconopen = document.getElementById("eyeopen");
      let password = document.getElementById("password");
      let eyeiconclose = document.getElementById("eyeclose");

      if (password.type == "password") {
        password.type = "text";
        eyeiconopen.style.display = "none";
        eyeiconclose.style.display = "block";
      }
    },

    hidePassword() {
      let eyeiconopen = document.getElementById("eyeopen");
      let password = document.getElementById("password");
      let eyeiconclose = document.getElementById("eyeclose");

      if (password.type == "text") {
        password.type = "password";
        eyeiconopen.style.display = "block";
        eyeiconclose.style.display = "none";
      }
    },
    handleSubmission() {
      this.v$.$validate();
      if (!this.v$.email.$error && !this.password.$error) {
        let data = {
          email: this.email,
          password: this.password,
        };

       
        ApiService.login(data).then((response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            this.$router.push("/unreadcomments");
            Swal.fire({
             
              icon: "success",
              title: "Logged in Succesfully",
              timer:3000,
              heightAuto:"20px",
              position:'top-right',
              showConfirmButton:false
            });
          

          },
          (err) => {
            console.log("errrrrr",err.response.data)
            this.error = err.response.data.errorCode;
            if(this.error=="1035")
            {
              this.msg1="Email or Accountid don't exist"
            }
            else if(this.error=="2003")
            {
              this.msg1="Password Does not Match"
            }
            else if(this.error=="1907"){
              this.msg1="Deleted User"
            }
            
          }
        );
      }
    },
  },
};
</script>


<style scoped>
.card {
  margin-top: 82px;
  margin-right: 57px;
}
form
{
width: 300px;
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
}

.typepassword {
  margin-top: 10px;
  height: 31px;
  width: 258px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 6px 12px;
  font-size: 14px;
  color: #555;
  
}
.head {
  color: #0f426d;
  font-size: 24px;
  font-family: sans-serif;
  margin-right: 122px;
  font-weight: 500;
  line-height: 1.1;
}

.set {
  margin-top: 14px;
}
.loginbut {
  background-color: #1b67b1;
  height: 34px;
  width: 25%;
  margin-left: 100px;
  color: #fff;
  font-size: 14px;
  box-shadow: none;
  border-color: #1b67b1;
  border-radius: 3px;
  cursor: pointer;
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
  margin-top: 20px;
  margin-left: 80px;
}
.signup {
  margin-top: 10px;
  margin-left: 15px;
}
.eye-open {
  margin-left: 226px;
  margin-top: -29px;
  display: block;
  cursor: pointer;
}
.eye-close {
  margin-left: 226px;
  margin-top: -29px;
  display: none;
  cursor: pointer;
}
</style>
