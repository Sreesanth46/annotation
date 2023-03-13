
<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <p>Change Password
            <button type="button" class="modal-close" @click="closeForm" style="margin:top" aria-hidden="true">x</button>
          </p>
        </slot>
      </header>

      <section class="modal-body">
        <slot name="body">
          <div class="alert alert-danger" style="display: none;"></div>
          <form ref="changePasswordForm">
            <div class="details">

              <div class="currentpwd" style="padding:20px 10px;">
                <input type="password" v-model.trim="currentPassword" id="password" placeholder="Current Password"
                  name="currentPassword" class="typecurrentPassword" @blur="v$.currentPassword.$touch()"
                  @keydown="v$.currentPassword.$touch()" v-bind:class="{
                    error: v$.currentPassword.$error,
                    valid: v$.currentPassword.$dirty && !v$.currentPassword.$invalid,
                  }" autocomplete="off" />
                <div class="password-eye-open" id="eyeopen">
                  <img src="../assets/visibility-on.png" alt="visibility-on" class="eye-open"
                    @click="showCurrentPassword()">
                </div>
                <div class="password-eye-close" id="eyeclose">
                  <img src="../assets/visibility-off.png" alt="visibility-off" class="eye-close"
                    @click="hideCurrentPassword()">
                </div><br />
                <span v-if="v$.currentPassword.$error" style="color:red"> {{ v$.currentPassword.$errors[0].$message }}
                </span>
                <div v-if="errormsg" >
                  <span style="color: red;">{{ errormsg }}</span>
                </div>
              </div>

              <span v-if="score === 0"> Use better password {{ this.strength }} </span>
              <span v-else-if="score === 1"> Risky {{ this.strength }} </span>
              <span v-else-if="score === 2"> Guessable {{ this.strength }} </span>
              <span v-else-if="score === 3"> Moderate {{ this.strength }} </span>
              <span v-else-if="score === 4"> Secure {{ this.strength }} </span>
              <password-meter :password="newPassword" @score="onScore" />

              <div class="newpwd" style="padding:20px 10px;">
                <input type="password" v-model.trim="newPassword" id="newpassword" placeholder="New Password"
                  name="newPassword" class="typenewPassword" @blur="v$.newPassword.$touch()"
                  @keydown="v$.newPassword.$touch()" v-bind:class="{
                    error: v$.newPassword.$error,
                    valid: v$.newPassword.$dirty && !v$.newPassword.$invalid,
                  }" autocomplete="off" />
                <div class="password-eye-open" id="neweyeopen">
                  <img src="../assets/visibility-on.png" alt="visibility-on" class="eye-open" @click="showNewPassword()">
                </div>
                <div class="password-eye-close" id="neweyeclose">
                  <img src="../assets/visibility-off.png" alt="visibility-off" class="eye-close"
                    @click="hideNewPassword()">
                </div><br />
                <span v-if="v$.newPassword.$error" style="color:red">
                  {{ v$.newPassword.$errors[0].$message }}
                </span>
              </div>

              <div class="confirmpwd" style="padding:10px 10px;">
                <input type="password" v-model.trim="confirmPassword" id="confirmpassword" placeholder="Confirm Password"
                  name="confirmPassword" class="typeconfirmPassword" @blur="v$.confirmPassword.$touch()"
                  @keydown="v$.confirmPassword.$touch()" v-bind:class="{
                    error: v$.confirmPassword.$error,
                    valid: v$.confirmPassword.$dirty && !v$.confirmPassword.$invalid,
                  }" autocomplete="off" />
                <div class="password-eye-open" id="confirmeyeopen">
                  <img src="../assets/visibility-on.png" alt="visibility-on" class="eye-open"
                    @click="showConfirmPassword()">
                </div>
                <div class="password-eye-close" id="confirmeyeclose">
                  <img src="../assets/visibility-off.png" alt="visibility-off" class="eye-close"
                    @click="hideConfirmPassword()">
                </div><br />
                <span v-if="v$.confirmPassword.$error" style="color:red">
                  {{ v$.confirmPassword.$errors[0].$message }}
                </span>
              </div>
            </div>
          </form>
        </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer">
          <button type="submit" class="btn-primary" @click="changePassword" aria-hidden="true">Save</button>
          <button type="button" class="btn-default" @click="closeForm" aria-hidden="true">Cancel</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>

import MemberService from "@/services/MemberService";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, sameAs } from "@vuelidate/validators";
import passwordMeter from "vue-simple-password-meter";

const alphanumandsymbol = helpers.regex(/[a-z\d@$!%*#?&]{8,}$/i);
export default {
  name: 'ChangePasswordComponent',
  components: { passwordMeter },
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      msg: [],
      score: null,
      disabled: [true, true],
      v$: useVuelidate(),
      result:'',
      errormsg:''
    }
  },

  validations() {
    return {
      currentPassword: {
        required: helpers.withMessage(
          "Current Password is required",
          required
        ),
        alphanumandsymbol: helpers.withMessage(
          "Please enter valid current password",
          alphanumandsymbol
        ),
        $autodirty: true
      },

      newPassword: {
        required: helpers.withMessage(
          "New Password is Required",
          required
        ),
        alphanumandsymbol: helpers.withMessage(
          "Must contain atleast one special character with alphanumeric ",
          alphanumandsymbol
        ),
        $autodirty: true
      },
      confirmPassword: {

        required: helpers.withMessage(
          "Confirm Password is Required",
          required
        ),
        sameAs: helpers.withMessage(
          "Password Doesnot Match",
          sameAs(this.newPassword)
        ),
        $autodirty: true
      }
    }
  },

  methods: {
    onScore({ score }) {
      this.score = score;
    },
    
    showCurrentPassword() {
      let eyeiconopen = document.getElementById("eyeopen");
      let password = document.getElementById("password");
      let eyeiconclose = document.getElementById("eyeclose");

      if (password.type == "password") {
        password.type = "text";
        eyeiconopen.style.display = "none";
        eyeiconclose.style.display = "block";
      }
    },

    hideCurrentPassword() {
      let eyeiconopen = document.getElementById("eyeopen");
      let password = document.getElementById("password");
      let eyeiconclose = document.getElementById("eyeclose");

      if (password.type == "text") {
        password.type = "password";
        eyeiconopen.style.display = "block";
        eyeiconclose.style.display = "none";
      }
    },
    showNewPassword() {
      let neweyeopen = document.getElementById("neweyeopen");
      let newpassword = document.getElementById("newpassword");
      let neweyeclose = document.getElementById("neweyeclose");

      if (newpassword.type == "password") {
        newpassword.type = "text";
        neweyeopen.style.display = "none";
        neweyeclose.style.display = "block";

      }
    },

    hideNewPassword() {
      let neweyeopen = document.getElementById("neweyeopen");
      let newpassword = document.getElementById("newpassword");
      let neweyeclose = document.getElementById("neweyeclose");

      if (newpassword.type == "text") {
        newpassword.type = "password";
        neweyeopen.style.display = "block";
        neweyeclose.style.display = "none";
      }
    },
    showConfirmPassword() {
      let confirmeyeopen = document.getElementById("confirmeyeopen");
      let confirmpassword = document.getElementById("confirmpassword");
      let confirmeyeclose = document.getElementById("confirmeyeclose");

      if (confirmpassword.type == "password") {
        confirmpassword.type = "text";
        confirmeyeopen.style.display = "none";
        confirmeyeclose.style.display = "block";
      }
    },

    hideConfirmPassword() {
      let confirmeyeopen = document.getElementById("confirmeyeopen");
      let confirmpassword = document.getElementById("confirmpassword");
      let confirmeyeclose = document.getElementById("confirmeyeclose");

      if (confirmpassword.type == "text") {
        confirmpassword.type = "password";
        confirmeyeopen.style.display = "block";
        confirmeyeclose.style.display = "none";
      }
    },

    changePassword() {

      this.v$.$validate();
      if (!this.v$.currentPassword.$error && !this.newPassword.$error && !this.confirmPassword.$error) {
        let data = {
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,

        }

        MemberService.changeUserPassword(data).then((res) => {

          this.result = res.data.message;
          this.$emit('editpasswordoutcome', this.result)
          this.resetPasswordForm();
          this.close();
        },
          (err) => {
            this.errormsg = err.response.data.message;
          }
        )

      }
    },
    closeForm() {
      this.$emit('close');
      this.resetPasswordForm();
        },
    close() {
      this.$emit('close');
      this.resetPasswordForm();
    },

    resetPasswordForm() {
      this.currentPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    }
  },

}

</script>
<style scoped>
* {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

#eyeopen {
  display: block;
}

#eyeclose {
  display: none;
}

#neweyeclose {
  display: none;
}

#neweyeopen {
  display: block;
}

#confirmeyeopen {
  display: block;
}

#confirmeyeclose {
  display: none;
}

.confirmpwd {
  display: flex;
  flex-direction: column;
}

.newpwd {
  display: flex;
  flex-direction: column;
}

.currentpwd {
  display: flex;
  flex-direction: column;
}

.password-eye-open {
  margin-top: -17px;
  margin-left: 70%;
  display: block;
}

.password-eye-close {
  margin-top: -17px;
  margin-left: 70%;
  display: none;
}


.modal {
  position: relative;
  margin-top: 20px;
  overflow: auto;
  background-color: #fff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333;
  height: 60%;
  width: 50%;
  border-radius: 20px;

}

.modal-header {
  padding: 14px;
  border-bottom: 1px solid #e5e5e5;
  min-height: 12px;
}

.modal-footer {
  padding: 14px;
  border-bottom: 1px solid #e5e5e5;
  min-height: 12px;
}

.modal-body {
  border-bottom: 1px solid #e5e5e5;
  min-height: 45vh;
}

header {
  font-family: inherit;
  font-size: 22px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}

.modal-close {
  float: right;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
  filter: alpha(opacity=20);
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: transparent;
  cursor: pointer;
  position: relative;
}

.modal-close:hover {
  cursor: pointer;
  color: #000;
  opacity: .5;
}

.btn-default {
  background-color: #fafafa;
  color: #2371bd;
  border: solid 1px #d0d0d0;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 6px;
  padding-bottom: 6px;
  box-shadow: 0px 0px 0px 1px #fff inset;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 4px;
  margin: 0 -35px;
}

.btn-primary {
  background-color: #33a69d !important;
  border-color: #33a69d !important;
  border-radius: 5px;
  color: #FFFFFF;
  box-shadow: none;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 500;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 6px 22px;
  font-size: 14px;
  line-height: 1.42857143;
}

.modal-footer .btn-primary {
  margin-left: 50px;
  margin-bottom: 0;
  float: right;
}

.modal-footer .btn-default {
  margin-left: 20px;
  margin-bottom: 0;
  float: right;
}

.modal-backdrop {
  position: fixed;
  top: -90px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

.details {
  padding: 10px;
}

input {
  line-height: small;
  width: 100%;
  height: 35px;
  border: 1px solid gray;
  padding-left: 10px;

}

.eye-open {
  height: 28px;
  width: 28px;
  margin-left: 76%;
  margin-top: -35px;
  cursor: pointer;

}

.eye-close {
  height: 28px;
  width: 28px;
  margin-left: 76%;
  margin-top: -29px;
  cursor: pointer;
}

@media screen and (max-width: 918px) {
  .password-eye-open {
    margin-top: -17px;
    margin-left: 60%;
  }
}

@media screen and (max-width: 713px) {
  .password-eye-open {
    margin-top: -17px;
    margin-left: 50%;
  }
}

@media screen and (max-width: 918px) {
  .password-eye-close {
    margin-top: -17px;
    margin-left: 60%;
  }
}

@media screen and (max-width: 713px) {
  .password-eye-close {
    margin-top: -17px;
    margin-left: 50%;
  }
}</style>
