
<template>
  <div class="container">
    <div class="sub">
      <div class="card">
        <img alt="Vue logo" src="../assets/Annotation.png" height="270" />
      </div>
      <div v-if="error" style="color: red; padding-bottom: 20px">
        {{this.msg1 }}
      </div>
      <form @submit.prevent="handleSubmission" >
        <div class="details">
          <div class="email">
            <p>Please set a new Password</p>

            <input
              type="text"
              v-model.trim="accountId"
              placeholder="Account ID"
              maxlength="50"
              name="username"
              class="typeaccountid"
              @blur="v$.accountId.$touch()"
              @keydown="v$.accountId.$touch()"
              v-bind:class="{
                error: v$.accountId.$error,
                valid: v$.accountId.$dirty && !v$.accountId.$invalid,
              }"
              autocomplete="off"
            /><br />

            <span v-if="v$.accountId.$error" style="color: red">
              {{ v$.accountId.$errors[0].$message }}
            </span>
          </div>
         
          <br />

          <span v-if="score === 0">Use better password{{ this.strength }}</span>
          <span v-else-if="score == 2">Risky{{ this.strength }}</span>
          <span v-else-if="score == 3">Guessable{{ this.strength }}</span>
          <span v-else-if="score == 4">Secure{{ this.strength }}</span>

          <password-meter :password="newPassword" @score="onScore" />

          <div class="password">
            <input
              type="password"
              v-model.trim="newPassword"
              maxlength="30"
              placeholder="New Password"
              name="newPassword"
              id="password"
              class="typepassword"
              @blur="v$.newPassword.$touch()"
              @keydown="v$.newPassword.$touch()"
              v-bind:class="{
                error: v$.newPassword.$error,
                valid: v$.newPassword.$dirty && !v$.newPassword.$invalid,
              }"
              autocomplete="off"/>
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
              visibility_off</span
            >
             
            <br /><span v-if="v$.newPassword.$error" style="color: red">
              {{ v$.newPassword.$errors[0].$message }}
            </span>
          </div>

          <div class="password">
            <input
              type="password"
              v-model.trim="confirmPassword"
              maxlength="30"
              placeholder="Confirm Password"
              name="confirmPassword"
              id="cpassword"
              class="typepassword"
              @blur="v$.confirmPassword.$touch()"
              @keydown="v$.confirmPassword.$touch()"
              v-bind:class="{
                error: v$.confirmPassword.$error,
                valid:
                  v$.confirmPassword.$dirty && !v$.confirmPassword.$invalid,
              }"
              autocomplete="off"
            />
            
            <span
              class="material-symbols-outlined eye-open"
              id="eyecopen"
              @click="showcPassword()"
            >
              visibility </span
            ><span
              class="material-symbols-outlined eye-close"
              id="eyecclose"
              @click="hidecPassword()"
            >
              visibility_off </span
            ><br />
            <span v-if="v$.confirmPassword.$error" style="color: red">
              {{ v$.confirmPassword.$errors[0].$message }}
            </span>
          </div>

          <div class="set">
            <input type="submit" value="Change" class="changeButton" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { useRoute } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  sameAs,
  minLength,
  maxLength,
} from "@vuelidate/validators";
import passwordMeter from "vue-simple-password-meter";
const alphanumericsym = helpers.regex(/^[A-Za-z_-][A-Za-z0-9_-]*$/i);
const alphanumandsymbol = helpers.regex(
  /^(?!.* )(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/);

import ApiService from "../services/ApiService.js";
import Swal from "sweetalert2";
export default {
  name: "ResetPasswordComponent",
  components: { passwordMeter },
  data() {
    return {
      token: "",
      accountId: "",
      newPassword: "",
      confirmPassword: "",

      msg: [],
      score: null,
      disabled: [true, true],
      v$: useVuelidate(),
      msg1: "",
      error:""
    };
  },

  mounted() {
    this.token = useRoute().query.token;
  },

  validations() {
    return {
      accountId: {
        required: helpers.withMessage("AccountId is required", required),
        alphanumericsym: helpers.withMessage(
          "Account ID should only contains Alphanumeric,hyphens and underscores",
          alphanumericsym
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum 50 characters",
          maxLength(50)
        ),
        minLength: helpers.withMessage(
          "Please enter atleast 4 characters",
          minLength(4)
        ),

        $autodirty: true,
      },
      newPassword: {
        required: helpers.withMessage("New Password Required", required),

        minlength: helpers.withMessage(
          "Must contain atleast 8 characters",
          minLength(8)
        ),
        alphanumandsymbol: helpers.withMessage(
          "Password should be alphanumeric containing special characters without space ",
          alphanumandsymbol
        ),

        $autodirty: true,
      },
      confirmPassword: {
        required: helpers.withMessage("Confirm Password  Required", required),

        sameAs: helpers.withMessage(
          "Password Does not  Match",
          sameAs(this.newPassword)
        ),

        $autodirty: true,
      },
    };
  },

  methods: {
    onScore({ score }) {
      this.score = score;
    },
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
    showcPassword() {
      let eyeciconopen = document.getElementById("eyecopen");
      let cpassword = document.getElementById("cpassword");
      let eyeciconclose = document.getElementById("eyecclose");

      if (cpassword.type == "password") {
        cpassword.type = "text";
        eyeciconopen.style.display = "none";
        eyeciconclose.style.display = "block";
      }
    },

    hidecPassword() {
      let eyeciconopen = document.getElementById("eyecopen");
      let cpassword = document.getElementById("cpassword");
      let eyeciconclose = document.getElementById("eyecclose");

      if (cpassword.type == "text") {
        cpassword.type = "password";
        eyeciconopen.style.display = "block";
        eyeciconclose.style.display = "none";
      }
    },

    handleSubmission() {
      this.v$.$validate();
      if (
        !this.v$.accountId.$error &&
        !this.newPassword.$error &&
        !this.confirmPassword.$error
      ) {
        let data = {
          accountId: this.accountId,
          newPassword: this.newPassword,
          confirmPassword: this.confirmPassword,
        };

        ApiService.resetPassword(data, this.token).then(
          () => {
            this.$router.push("/login");
            Swal.fire({
              icon: "success",
              title: "Password changed",
              text: "Please Login",
              timer: 3000,
              heightAuto: "20px",
              position: "top-right",
              showConfirmButton: false,
            });
          },
          (err) => {
            this.error = err.response.data.errorCode;
            if (this.error == "1907") {
              this.msg1 = "Authentication failed check token";
            }
            if (this.error == "2004") {
              this.msg1 = "Account Id Mismatch";
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
  margin-top: -27px;
  position: relative;
}
form{
  width: 300px;
}

.typeaccountid {
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

.line {
  margin-top: 20px;
  width: 258px;
}

.set {
  margin-top: 25px;
}

.changeButton {
  background-color: #339fa7;
  height: 34px;
  width: 25%;
  margin-left: 200px;
  color: #fff;
  font-size: 14px;
  box-shadow: none;
  border-color: #339fa7;
  border-radius: 1px;
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
.eye-open {
  margin-left: 76%;
  margin-top: -29px;
  display: block;
  cursor: pointer;
}
.eye-close {
  margin-left: 76%;
  margin-top: -29px;
  display: none;
  cursor: pointer;
}
</style>