<template>
  <div class="container">
    <div class="card">
      <div class="mainimage" style="width: 100vw">
        <img src="../assets/initialreg.png" class="initialreg" alt="" />
      </div>
      <div class="logospace">
        <img src="../assets/Annotation.png" class="logo" alt="logo" />
      </div>
      <div class="quote">
        <span class="tryforfree">TRY FOR FREE.</span>
      </div>
    </div>
    <form ref="initialreg">
      <div class="contents">
        <div class="head">
          <span class="description"
            >We will send you an email with a link to the registration page<br />Please
            enter your email address</span
          >
        </div>
        <div class="email">
          <input
            type="text"
            v-model.trim="email"
            placeholder=" Enter email address "
            name="email"
            class="typeemail"
            @blur="v$.email.$touch()"
            @keydown="v$.email.$touch()"
            v-bind:class="{
              error: v$.email.$error,
              valid: v$.email.$dirty && !v$.email.$invalid,
            }"
            autocomplete="off"
          />
          <span
            v-for="error in v$.email.$errors"
            :key="error.$uid"
            style="color: red"
            >{{ error.$message }}</span
          >
        </div>
        <div class="button">
          <input
            type="button"
            id="buttonid"
            value="Try for free"
            @click="submit()"
            class="btn"
          />
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import ApiService from "../services/ApiService.js";
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import Swal from "sweetalert2";
export default {
  name: "InitialRegistration",

  // VALIDATIONS

  validations() {
    return {
      email: {
        required: helpers.withMessage("Email is required", required),
        email: helpers.withMessage("Please enter valid email", email),
        $autodirty: true,
      },
    };
  },
  data() {
    return {
      email: "",
      v$: useVuelidate(),
    };
  },
  methods: {
    // FUNCTION TO SUBMIT THE INITIALREGISTRATION FORM

    submit() {
      document.getElementById("buttonid").disabled = true;

      this.v$.$validate();
      if (!this.v$.email.$error) {
        let email = { email: this.email };
        ApiService.emailVerify(email).then((response) => {
          if (response.data.userFound == false) {
            ApiService.initialRegistration(email).then(() => {
              this.$router.push("/registrationdone");
            });
          } else {
            this.$refs.initialreg.reset();
            document.getElementById("buttonid").disabled = false;

            Swal.fire({
              icon: "error",
              title: "Already Registered",
              text: "This email is already registered!",
            });
          }
        });
      }
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 100%;
  max-height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.container .card {
  height: 38vh;
  width: 100%;
  margin: 0;
  padding: 0;
}
.container .head {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: larger;
  font-weight: bold;
  color: #0a2b4a;
  height: 60px;
  width: 80%;
  margin: 0 0 30px 0;
}

.email {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.typeemail {
  width: 150%;
  height: 50px;
  padding-left: 10px;
  border: 1px solid grey;
}
.btn {
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
}

.container .contents {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}


.logospace .logo {
  height: 300px;
  width: 400px;
}

.quote .tryforfree {
  font-family: sans-serif;
  font-weight: bold;
  font-size: 300%;
  color: white;
}
.quote {
  margin-left: 800px;
  margin-top: -195px;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.initialreg {
  position: absolute;
  width: 100%;
  z-index: -1;
  height: 290px;
}

@media screen and (max-width: 980px) {
  .quote {
    margin-left: 500px;
    margin-top: -195px;
  }
  .quote .tryforfree {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 300%;
    color: white;
  }
}

@media screen and (max-width: 680px) {
  .quote {
    margin-left: 200px;
    margin-top: -70px;
  }
  .quote .tryforfree {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 300%;
    color: white;
  }
}

@media screen and (max-width: 604px) {
  .quote {
    margin-top: -70px;
  }
  .quote .tryforfree {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 200%;
    color: white;
  }
}

@media screen and (max-width: 476px) {
  .quote {
    margin-top: -50px;
  }
  .quote .tryforfree {
    font-family: sans-serif;
    font-weight: bold;
    font-size: 100%;
    color: white;
  }
}

@media screen and (max-width: 1024px) {
 .description{
  margin-top: 16px;
 }
}
</style>
