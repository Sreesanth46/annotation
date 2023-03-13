<template>
  <div class="container">
    <div class="card">
      <div class="heading">
        <span class="Fhead">Please enter your registration information.</span>
      </div>
      <div v-if="error" style="color: red; padding-bottom: 20px">Invalid</div>
      <form id="signupform" ref="signupformreset">
        <div class="details">
          <div class="companyname">
            <label for="companyname" class="labelcompanyname"
              >Company name</label
            ><span class="requiredspan">Required</span><br />
            <input
              type="text"
              v-model.trim="companyName"
              class="inputcompanyname"
              name="companyName"
              @blur="v$.companyName.$touch()"
              @keydown="v$.companyName.$touch()"
              v-bind:class="{
                error: v$.companyName.$error,
                valid: v$.companyName.$dirty && !v$.companyName.$invalid,
              }"
              autocomplete="off"
            /><br />
            <span v-if="v$.companyName.$error" style="color: red">
              {{ v$.companyName.$errors[0].$message }}
            </span>

            <br /><span class="messagecompanyname"
              >If you are using the service as an individual, please enter your
              own name.</span
            >
          </div>
          <div class="companycode">
            <label for="companycode" class="labelcompanycode"
              >Company code</label
            ><span class="requiredspan">Required</span><br />
            <input
              type="text"
              name="companyCode"
              v-model.trim="companyCode"
              v-on-keyup="verifyCompanyCode(companyCode)"
              class="inputcompanycode"
              @blur="v$.companyCode.$touch()"
              @keydown="v$.companyCode.$touch()"
              v-bind:class="{
                error: v$.companyCode.$error,
                valid: v$.companyCode.$dirty && !v$.companyCode.$invalid,
              }"
              autocomplete="off"
            /><br />
            <span v-if="v$.companyCode.$error" style="color: red">
              {{ v$.companyCode.$errors[0].$message }}
            </span>
            <span id="companyfound"
              >Company code exist please try another code</span
            >
          </div>
          <div class="phonenumber">
            <label for="phonenumber" class="labelphonenumber"
              >Phone number</label
            ><span class="requiredspan">Required</span><br />
            <input
              type="text"
              v-model.trim="phoneNumber"
              name="phoneNumber"
              class="inputphonenumber"
              @blur="v$.phoneNumber.$touch()"
              @keydown="v$.phoneNumber.$touch()"
              v-bind:class="{
                error: v$.phoneNumber.$error,
                valid: v$.phoneNumber.$dirty && !v$.phoneNumber.$invalid,
              }"
              autocomplete="off"
            /><br />
            <span v-if="v$.phoneNumber.$error" style="color: red">
              {{ v$.phoneNumber.$errors[0].$message }}
            </span>
          </div>
          <div class="lastname">
            <label for="lastname" class="labellastname">Last name</label
            ><span class="requiredspan">Required</span><br />
            <input
              type="text"
              v-model.trim="lastName"
              name="lastName"
              class="inputlastname"
              @blur="v$.lastName.$touch()"
              @keydown="v$.lastName.$touch()"
              v-bind:class="{
                error: v$.lastName.$error,
                valid: v$.lastName.$dirty && !v$.lastName.$invalid,
              }"
              autocomplete="off"
            /><br />
            <span v-if="v$.lastName.$error" style="color: red">
              {{ v$.lastName.$errors[0].$message }}
            </span>
          </div>
          <div class="firstname">
            <label for="firstname" class="labelfirstname">First name</label
            ><span class="requiredspan">Required</span><br />
            <input
              type="text"
              v-model.trim="firstName"
              name="firstName"
              class="inputfirstname"
              @blur="v$.firstName.$touch()"
              @keydown="v$.firstName.$touch()"
              v-bind:class="{
                error: v$.firstName.$error,
                valid: v$.firstName.$dirty && !v$.firstName.$invalid,
              }"
              autocomplete="off"
            /><br />
            <span v-if="v$.firstName.$error" style="color: red">
              {{ v$.firstName.$errors[0].$message }}
            </span>
          </div>
          <div class="accountid">
            <label for="accountid" class="labelaccountid">Account ID</label
            ><span class="requiredspan">Required</span><br />
            <input
              type="text"
              v-model.trim="accountId"
              v-on-keyup="verifyAccountId(accountId)"
              name="accountId"
              class="inputaccountid"
              @blur="v$.accountId.$touch()"
              @keydown="v$.accountId.$touch()"
              v-bind:class="{
                error: v$.accountId.$error,
                valid: v$.accountId.$dirty && !v$.accountId.$invalid,
              }"
              autocomplete="off"
            /><br />
            <span v-if="v$.accountId.$error" style="color: red">
              {{ v$.accountId.$errors[0].$message }} </span
            ><span id="accountfound"
              >Account ID exist please try another Account ID</span
            >

            <br /><span class="messageaccountid"
              >This will be used for logging in to annotation tool.<br />Please
              enter 4 to 50 characters (alphanumeric characters, hyphens, and
              underscores).</span
            >
          </div>
          <div class="password">
            <label for="password" class="labelpassword">Password</label
            ><span class="requiredspan">Required</span><br />
            <input
              type="password"
              v-model.trim="password"
              name="password"
              class="inputpassword"
              id="password"
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
              visibility_off
            </span>
            <password-meter :password="password" @score="onScore" />

            <span v-if="v$.password.$error" style="color: red">
              {{ v$.password.$errors[0].$message }}
            </span>

            <br /><span class="messagepassword"
              >Please enter at least eight alphanumeric characters.</span
            >
          </div>
          <div class="buttonsubmit">
            <button type="button" id="buttonid" @click="Register()" class="btn">
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import ApiService from "../services/ApiService.js";
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  helpers,
  alpha,
  minLength,
  maxLength,
  numeric,
} from "@vuelidate/validators";
import { useRoute } from "vue-router";
import passwordMeter from "vue-simple-password-meter";
import Swal from "sweetalert2";
const alphanumandsymbol = helpers.regex(
  /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/
);

const hyphen = helpers.regex(
  /^([^-]|[^-].*[^-][a-zA-Z0-9])*([^-]|[^-].*[^-])$/i
);
const alphanumericsym = helpers.regex(/^[A-Za-z_-][A-Za-z0-9_-]*$/i);
/* eslint-disable */
export default {
  name: "SignUp",
  components: { passwordMeter },

  validations() {
    return {
      companyName: {
        required: helpers.withMessage("Company name is required", required),
        minLength: helpers.withMessage(
          "Please enter atleast 4 characters",
          minLength(4)
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum of 50 characters",
          maxLength(50)
        ),
        $autodirty: true,
      },

      lastName: {
        required: helpers.withMessage("Last name is required", required),
        alpha: helpers.withMessage("Please enter valid name", alpha),
        minLength: helpers.withMessage(
          "Please enter atleast 4 characters",
          minLength(4)
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum of 10 characters",
          maxLength(10)
        ),
        $autodirty: true,
      },

      firstName: {
        required: helpers.withMessage("First name is required", required),
        alpha: helpers.withMessage("Please enter valid name", alpha),
        minLength: helpers.withMessage(
          "Please enter atleast 4 characters",
          minLength(4)
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum of 10 characters",
          maxLength(10)
        ),
        $autodirty: true,
      },

      companyCode: {
        required: helpers.withMessage("Company code is required", required),
        hyphen: helpers.withMessage(
          "Hyphens not allowed at the beginning and end",
          hyphen
        ),
        minLength: helpers.withMessage(
          "Please enter atleast 4 characters",
          minLength(4)
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum 20 characters",
          maxLength(20)
        ),
        $autodirty: true,
      },

      phoneNumber: {
        required: helpers.withMessage("Phone number is required", required),
        numeric: helpers.withMessage(
          "Phone number should only contains numbers ",
          numeric
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum 13 numbers",
          maxLength(13)
        ),
        minLength: helpers.withMessage(
          "Please enter minimum 10 numbers",
          minLength(10)
        ),
      },

      accountId: {
        minLength: helpers.withMessage(
          "Please enter atleast 4 characters",
          minLength(4)
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum 50 characters",
          maxLength(50)
        ),

        alphanumericsym: helpers.withMessage(
          "Account ID should only contains Alphanumeric,hyphens and underscores",
          alphanumericsym
        ),
        required: helpers.withMessage("Account ID is required", required),

        $autodirty: true,
      },

      password: {
        minLength: helpers.withMessage(
          "Please enter minimum 8 characters",
          minLength(8)
        ),
        maxLength: helpers.withMessage(
          "Please enter maximum 50 characters",
          maxLength(50)
        ),
        alphanumandsymbol: helpers.withMessage(
          "Password must contain alphanumeric,uppercase and a special character",
          alphanumandsymbol
        ),
        required: helpers.withMessage("Password is required", required),

        $autodirty: true,
      },
    };
  },
  data() {
    return {
      score: null,
      token: "",

      companyName: "",
      lastName: "",
      firstName: "",
      companyCode: "",
      phoneNumber: "",
      accountId: "",
      password: "",
      v$: useVuelidate(),
    };
  },

  mounted() {
    this.tokenVerify();
  },

  methods: {
    onScore({ score }) {
      this.score = score;
    },

    //FUNCTION TO VERIFY THE TOKEN

    tokenVerify() {
      const route = useRoute();
      this.token = route.query.token;
      this.Swal = Swal;
      // CALL TO SERVICE TO VERIFY TOKEN

      ApiService.verifyToken(this.token)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //FUNCTION TO SHOW PASSWORD

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

    //FUNCTION TO HIDE PASSWORD

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

    // FUNCTION TO CHECK WHEATHER A COMPANYCODE EXIST OR NOT

    verifyCompanyCode(companyCode) {
      console.log();
      console.log(companyCode);
      let form = { code: companyCode };

      //   CALL TO SERVICE CLASS

      ApiService.verifyCompanyCode(form)
        .then((response) => {
          console.log(response);
          const messageId = document.getElementById("companyfound");
          if (response.data.CompanyFound == true) {
            messageId.style.display = "block";
          } else {
            messageId.style.display = "none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //FUNCTION TO CHECK WHEATHER AN ACCOUNT ID IS EXIST OR NOT

    verifyAccountId(accountId) {
      console.log(accountId);
      let form = { accountId: accountId };

      //CALL TO SERVICE CLASS

      ApiService.verifyAccountId(form)
        .then((response) => {
          console.log(response);
          const messageId = document.getElementById("accountfound");
          if (response.data.userFound == true) {
            messageId.style.display = "block";
          } else {
            messageId.style.display = "none";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // FUNCTION TO SIGNUP

    async Register() {
      console.log("button disabled");
      this.v$.$validate();

      let details = {
        name: this.companyName,
        code: this.companyCode,
        phone: this.phoneNumber,
        lastName: this.lastName,
        firstName: this.firstName,
        accountId: this.accountId,
        password: this.password,
      };

      if (
        !this.v$.companyName.$error &&
        !this.v$.companyCode.$error &&
        !this.v$.phoneNumber.$error &&
        !this.v$.lastName.$error &&
        !this.v$.firstName.$error &&
        !this.v$.accountId.$error &&
        !this.v$.password.$error
      ) {
        await ApiService.registration(details, this.token).then(
          (response) => {
            document.getElementById("buttonid").disabled = true;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Congratulations,Your account has been succesfully Registered",
            });
            this.$router.push("/login");

            console.log(response);
          },
          (err) => {
            Swal.fire({
              icon: "error",
              title: "Already registered email",
              text: "Company with this email is already registered!",
            });
            document.getElementById("buttonid").disabled = false;
            console.log("button enabled");
            this.$router.push("/initialregistration");
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
}
.card {
  display: flex;
  flex-direction: column;
  height: 1200px;
  width: 50%;
  margin-top: 50px;
}

.container .card .details {
  margin-top: 100px;
}

.container .card input {
  width: 80%;
  height: 30px;
  border: 1px solid grey;
  padding-left: 5px;
}
.Fhead {
  font-family: sans-serif;
  font-size: xx-large;
  font-weight: bold;
  color: #0a2b4a;
}

.labelcompanyname {
  font-family: sans-serif;
  font-size: large;
  font-weight: bold;
  color: #0a2b4a;
}
.companyname .requiredspan {
  background-color: #ff5400;
  margin-left: 5px;
  color: white;
  font-family: sans-serif;
}

.inputcompanyname {
  width: 80%;
  height: 20px;
}

.messagecompanyname {
  font-family: sans-serif;
  font-size: small;
  color: #8e8e8e;
}

.labelcompanycode {
  font-family: sans-serif;
  font-size: large;
  font-weight: bold;
  color: #0a2b4a;
}

.companycode {
  margin-top: 30px;
}

.companycode .requiredspan {
  background-color: #ff5400;
  margin-left: 5px;
  color: white;
  font-family: sans-serif;
}
.codelink {
  font-family: sans-serif;
  color: #0d2e4c;
}
.phonenumber {
  margin-top: 30px;
}
.phonenumber .requiredspan {
  background-color: #ff5400;
  margin-left: 5px;
  color: white;
  font-family: sans-serif;
}

.labelphonenumber {
  font-family: sans-serif;
  font-size: large;
  font-weight: bold;
  color: #0a2b4a;
}

.lastname {
  margin-top: 30px;
}
.lastname .requiredspan {
  background-color: #ff5400;
  margin-left: 5px;
  color: white;
  font-family: sans-serif;
}
.labellastname {
  font-family: sans-serif;
  font-size: large;
  font-weight: bold;
  color: #0a2b4a;
}

.firstname {
  margin-top: 30px;
}
.firstname .requiredspan {
  background-color: #ff5400;
  margin-left: 5px;
  color: white;
  font-family: sans-serif;
}
.labelfirstname {
  font-family: sans-serif;
  font-size: large;
  font-weight: bold;
  color: #0a2b4a;
}

.accountid {
  margin-top: 30px;
}
.accountid .requiredspan {
  background-color: #ff5400;
  margin-left: 5px;
  color: white;
  font-family: sans-serif;
}
.labelaccountid {
  font-family: sans-serif;
  font-size: large;
  font-weight: bold;
  color: #0a2b4a;
}
.messageaccountid {
  font-family: sans-serif;
  font-size: small;
  color: #8e8e8e;
}

.password {
  margin-top: 30px;
}

.password .requiredspan {
  background-color: #ff5400;
  margin-left: 5px;
  color: white;
  font-family: sans-serif;
}
.labelpassword {
  font-family: sans-serif;
  font-size: large;
  font-weight: bold;
  color: #0a2b4a;
}
.messagepassword {
  font-family: sans-serif;
  font-size: small;
  color: #8e8e8e;
}

button {
  font-family: sans-serif;
  display: inline-block;
  font-weight: bold;
  overflow: hidden;
  width: 175px;
  height: 44.5px;
  margin-top: 30px;
  border-radius: 15px;
  border: none;
  text-align: center;
  background: linear-gradient(#d25316, #1f64aa);
  color: white;
  cursor: pointer;
  margin-right: 23%;
}

.buttonsubmit {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* PASSWORD METER */

.po-password-strength-bar {
  border-radius: 2px;
  transition: all 0.2s linear;
  height: 5px;
  margin-top: 8px;
  max-width: 80%;
}

.po-password-strength-bar.risky {
  background-color: #f95e68;
}

.po-password-strength-bar.guessable {
  background-color: #fb964d;
}

.po-password-strength-bar.weak {
  background-color: #fdd244;
}

.po-password-strength-bar.safe {
  background-color: #b0dc53;
}

.po-password-strength-bar.secure {
  background-color: #35cc62;
}

#companyfound {
  color: red;
  display: none;
}

#accountfound {
  color: red;
  display: none;
}

.eye-open {
  margin-left: 76%;
  margin-top: -29px;
  display: block;
  cursor: pointer;
  padding-top:2px;
}
.eye-close {
  margin-left: 76%;
  margin-top: -29px;
  display: none;
  cursor: pointer;
  padding-top:2px;

}

@media screen and (max-width: 1150px) {
  .eye-close {
    margin-left: 74%;
    margin-top: -29px;
    display: none;
  }
  .eye-open {
    margin-left: 74%;
    margin-top: -29px;
  }
}

@media screen and (max-width: 790px) {
  .eye-close {
    margin-left: 73%;
    margin-top: -29px;
    display: none;
  }
  .eye-open {
    margin-left: 73%;
    margin-top: -29px;
  }
}

@media screen and (max-width: 690px) {
  .eye-close {
    margin-left: 72%;
    margin-top: -29px;
    display: none;
  }
  .eye-open {
    margin-left: 72%;
    margin-top: -29px;
  }
}

@media screen and (max-width: 590px) {
  .eye-close {
    margin-left: 71%;
    margin-top: -29px;
    display: none;
  }
  .eye-open {
    margin-left: 71%;
    margin-top: -29px;
  }
}

@media screen and (max-width: 541px) {
  .eye-close {
    margin-left: 70%;
    margin-top: -29px;
  }
  .eye-open {
    margin-left: 70%;
    margin-top: -29px;
  }
}

@media screen and (max-width: 400px) {
  .eye-close {
    margin-left: 67%;
    margin-top: -29px;
    display: none;
  }
  .eye-open {
    margin-left: 67%;
    margin-top: -29px;
  }
}
</style>
