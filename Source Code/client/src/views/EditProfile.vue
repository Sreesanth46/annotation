<template>
  <div class="modal-backdrop">
    <form @submit.prevent="editProfile">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            <h4>Edit Profile</h4>
            <button type="button" class="modal-close" @click="closeForm" aria-hidden="true">x</button>
          </slot>
        </header>

        <section class="modal-body">
          <slot name="body">
            <div class="profile-pic-show">
              <img :src="profilePic" alt="Image Preview" style="width: 63px;height: 63px; border-radius: 50%;" />
            </div>
            <div class="account-icon-selection">
              <div class="account-icon-selector">
                <div class="pop-over-class">
                  <div class="pick-avatar" style="margin-top: -84px;">
                    <span class="default-icon-select-text" @click="showAvatarMenubar()"> Select from default icons </span>
                    <span>|</span>
                    <label class="original-icon-select-text">
                      Select from file
                      <input name="profile-icon" type="file" @change="picchange" class="profile-file">
                    </label>
                  </div>
                  <div class="dropdown-content-avatar" id="avatarmenubar" ref="avatarDropdown">
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic1">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic2">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic3">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic4">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic5">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic6">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic7">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic8">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic9">&nbsp;&nbsp;
                    <img src="../assets/profile1.png" @click="defaultPic" alt="profile-pic10">&nbsp;&nbsp;
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-datas">
              <div class="row">
                <div class="col-xs-12">
                  <div class="row row-profile-key">
                    <div class="col col-xs-12">
                      <span class="profile-key">Nickname</span>
                      <span class="text-danger">(required)</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="input text">
                        <input name="nickName" class="form-control account_nm" maxlength="20" placeholder=" " type="text"
                          id="nickName" v-model.trim="nickName" @blur="v$.nickName.$touch()"
                          @keydown="v$.nickName.$touch()" v-bind:class="{
                            error: v$.nickName.$error,
                            valid: v$.nickName.$dirty && !v$.nickName.$invalid,
                          }" autocomplete="off" /><br />
                        <span v-for="error in v$.nickName.$errors" :key="error.$uid" style="color:red">{{
                          error.$message
                        }}</span><br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-xs-12">
                  <div class="row row-profile-key">
                    <div class="col col-xs-12">
                      <span class="profile-key">Department name</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="input text">
                        <input name="departmentName" class="form-control section_nm" maxlength="50" placeholder=" "
                          type="text" id="AccountSectionNm" v-model="departmentName"><br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div class="row row-profile-key">
                    <div class="col col-xs-12">
                      <span class="profile-key">Job title</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="input text">
                        <input name="data[Account][position_nm]" class="form-control position_nm" maxlength="50"
                          placeholder=" " type="text" id="AccountPositionNm" v-model="jobTitle"><br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12">
                  <div class="row row-profile-key">
                    <div class="col col-xs-12">
                      <span class="profile-key">Email Address</span>
                      <span class="text-danger">(required)</span>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12">
                      <div class="input text">
                        <input name="email" class="form-control email" maxlength="254" placeholder=" " type="email"
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email" v-model.trim="email"
                          @blur="v$.email.$touch()" @keydown="v$.email.$touch()" v-bind:class="{
                            error: v$.email.$error,
                            valid: v$.email.$dirty && !v$.email.$invalid,
                          }" autocomplete="off" /><br />
                        <span v-for="error in v$.email.$errors" :key="error.$uid" style="color:red">{{
                          error.$message
                        }}</span><br>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            <div>
              <button type="button" class="btn-default" data-dismiss="modal" @click="closeForm">Cancel</button>
              &nbsp;
              <button type="submit" class="btn-primary">Save</button>
            </div>
          </slot>
        </footer>
      </div>
    </form>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, maxLength, email } from "@vuelidate/validators";
import MemberService from "@/services/MemberService";

export default {
  name: 'EditProfile',

  validations() {
    return {
      nickName: {
        required: helpers.withMessage(
          "Please Enter the Nickname",
          required
        ), maxLength: helpers.withMessage(
          "Please Enter maximum 20 characters",
          maxLength(20)
        ), $autodirty: true
      },

      email: {
        required: helpers.withMessage(
          "Please Enter the Email Address",
          required
        )
        , email: helpers.withMessage(
          "Please enter valid format",
          email
        ),
        $autodirty: true
      }
    }
  },
  data() {
    return {
      showdropDown: false,
      i: 0,
      profilePic: '',
      nickName: '',
      departmentName: '',
      jobTitle: '',
      email: '',
      result:'',
      v$: useVuelidate()
    }
  },
  mounted() {

    this.redirect()
  },
  beforeUnmound() {
    window.removeEventListener("click", this.avatarMenuClose);
  },
  methods: {
    closeForm() {
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
    
    picchange(event) {
      this.profilePic = event.target.files[0]
    },

    async defaultPic(event) {
      this.profilePic = await this.urltoFile(event.target.src, event.target.alt)
    },

    urltoFile(url, filename, mimeType) {
      return (fetch(url)
        .then((res) => {
          return res.arrayBuffer()
        })
        .then((buf) => {
          return new File([buf], filename, { type: mimeType });
        })
      );
    },

    avatarMenuClose(e) {
      if (!this.$refs.avatarDropdown?.contains(e.target)) {
        const menuList = document.getElementById("avatarmenubar");

        if (
          this.showdropDown &&
          menuList.style.display == "block" &&
          this.i != 0
        ) {
          menuList.style.display = "none";
          this.showdropDown = false;
          this.i = this.i - 2;
          window.removeEventListener("click", this.avatarMenuClose);
        }
        this.i = this.i + 1;
      }
    },
    showAvatarMenubar() {
      const menuList = document.getElementById("avatarmenubar");
      window.removeEventListener("click", this.avatarMenuClose);
      if (menuList.style.display == "none" || menuList.style.display == "") {
        menuList.style.display = "block";
        this.showdropDown = true;
        window.addEventListener("click", this.avatarMenuClose);
      } else {
        this.showdropDown = false;
        menuList.style.display = "none";
      }
    },
    redirect() {
      MemberService.currentUserProfile().then(
        (response) => {
          this.nickName = response.data.user.nickName;
          this.profilePic = response.data.user.profilePic;
          this.jobTitle = response.data.user.jobTitle;
          this.departmentName = response.data.user.department;
          this.email = response.data.user.email;
        },
        (err) => {
          this.error = err
        }
      )
    },

    editProfile() {
      this.v$.$validate();
      if (!this.v$.nickName.$error && !this.email.$error) {
        let formData = new FormData()
        formData.append('image', this.profilePic)
        formData.append('nickName', this.nickName)
        formData.append('departmentName', this.departmentName)
        formData.append('email', this.email)
        formData.append('jobTitle',this.jobTitle)

        MemberService.updateUserProfile(formData).then((res) => {
          this.result = res.data;
          this.$emit('editprofileoutcome', this.result)
          this.close();
        },
          (err) => {
            this.error = err;
          }
        )

      }
    }
  },
};
</script>


<style scoped>
.modal-body .row div {
  line-height: 12px;
  width: 100%;
  height: 80%;
}

.modal-header {
  padding: 10px 20px;
  border-bottom: 1px solid #e5e5e5;
  min-height: 12px;
}

.modal-footer {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  min-height: 12px;
}

h4 {
  font-family: inherit;
  font-size: 18px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 500;
  line-height: 1.1;
  color: inherit;
}

.modal-body {
  padding: 20px;
  position: relative;
  padding-top: 15px;
}

.modal-close {
  float: right;
  font-size: 16px;
  font-weight: 700;
  line-height: 0;
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

.text-danger {
  color: #a94442;
}

.profile-key {
  font-weight: bold;
  line-height: 20px;
}

.form-control {
  display: block;
  width: 90%;
  height: 35px;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px skyblue;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
}

.input {
  line-height: 20px;
}

.btn-default {
  background-color: #fafafa;
  color: #2371bd;
  border: solid 1px #d0d0d0;
  padding-left: 30px;
  padding-right: 30px;
  box-shadow: 0px 0px 0px 1px #fff inset;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  padding-top: 6px;
  padding-bottom: 6px;
  font-size: 14px;
  line-height: 1.5;
  border-radius: 4px;
  margin: 0;
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
  position: absolute;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "sans-serif";
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
}

.modal {
  background: #FFFFFF;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  width: 65vw;
  height: fit-content;
  flex-direction: column;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  border-radius: 20px;
}

.original-icon-select-text {
  display: flex;
  cursor: pointer;
  color: #028fc8;
  margin: -20px 190px;
  width: 50%;
  height: 6vh;
  position: relative;
  margin-right: -176px;
  margin-top: -20px;
}

.original-icon-select-text input {
  display: none;
}

.account-icon-selector .default-icon-select-text {
  flex: 1;
  display: inline-block;
  font-weight: normal;
  cursor: pointer;
  color: #028fc8;
  margin-top: 20px;
  margin-left: 30px;
}


.account-icon-selector .account-icon-selector {
  display: inline-block;
  font-weight: normal;
  cursor: pointer;
  color: #028fc8;
  margin: 0;
}

details[data-popover]>summary:focus {
  outline: none;
}

details[data-popover]>summary::-webkit-details-marker {
  display: none;
}

details[data-popover]>summary {
  list-style: none;
  text-decoration: underline dotted teal;
}

details[data-popover] {
  position: relative;
}

details[data-popover]>summary+* {
  position: absolute;
}

details[data-popover="up"]>summary+* {
  bottom: calc(0.5rem + 100%);
  right: 40%;
  top: 40%;
  transform: translateX(50%);
  position: relative;
}

.pick-avatar {
  width: 70%;
  height: 6vh;
  position: absolute;
  margin-right: -250px;
  margin-top: -19px;
  flex-direction: column;
}

img {
  width: 30px;
  height: 30px;
}

.account-icon-selection {
  margin-left: 100px;
  margin-top: 30px;
}



.dropdown-content-avatar {
  background-color: #ffffff;
  width: 80%;
  margin-top: 0px;
  margin-left: 10%;
  position: relative;
  height: fit-content;
  padding: 3px;
  display: none;
  border-radius: 3px;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
}

#notificationmenubar {
  display: none;
}

.dropdown-content-avatar img {
  list-style: none;
  color: #636363;
}
</style>
