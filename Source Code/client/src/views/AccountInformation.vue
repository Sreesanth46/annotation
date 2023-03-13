<template>
  <div class="pin-outer-layer">

    <div class="pin-inner-layer">
     
      <div class="fullContent">
        <div class="subtitle">
          <div class="nick-header">
            <h2>{{ userdata.nickName }}</h2>
          </div>
          <div class="pull-right">
            <button class="button-secondary pure-button" type="button" @click="showModalEdit"
              :disabled="this.$store.state.userRole > logindata.role">
              Edit
            </button> &nbsp;&nbsp;
            <button class="button-secondary2 pure-button" id="moreDetails" type="button"
              v-if="this.$store.state.userRole <= logindata.role" @click="showMoreDetails" style="font-size:16px ;">
              <div class="listdown-content" id="drop">
                <ul id="list" class="listitems" style="list-style: none;">
                  <li style="font-style: #fff;">...
                  </li>
                </ul>
              </div>
            </button>
            <div class="listdown-content-detail" id="detailedmenubar" ref="detailListdown">
              <ul id="detailmenus" class="detailmenuitems">
                <li class="borderm">
                  <rouerLink @click="showModalReset">Reset Password</rouerLink>
                </li>
                <li class="borderm">
                  <rouerLink @click="showModalDelete">Delete Account</rouerLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <div class="alert alert-success" v-show="elementvisible" v-if="messageedit"
          style="border: 2px solid green;font-size: 19px;width: 100%;max-height: 60px;margin-top: 50px;background: transparent;">
          <h3>{{ messageedit }}</h3>
        </div>
        <div class="profile-container">
          <div class="profilebox">
            <div class="col-account-icon">
              <div class="account-icon ">
                <img v-if="userdata.profilePic == null" src="../assets/profile1.png" alt="profile-pic"
                  style="width: 63px;height: 63px; border-radius: 50%;" />
                <img v-if="userdata.profilePic !== null" :src="userdata.profilePic"
                  style="width: 63px;height: 63px; border-radius: 50%;" alt="ProfilePic" />
              </div>
            </div>
            <div class="col-profile">
              <div class="name-container">
                <div class="nickname">
                  {{ userdata.nickName }}

                </div>
                <div class="account-id">
                  {{ userdata.accountId }}
                </div>
              </div>
            </div>
          </div>
          <div class="row-profile">
            <div class="company-container">
              <div class="col-key">
                Company name
              </div>
              <div class="col-value">
                {{ companydata.name }}
              </div>
            </div>
            <div class="company-container">
              <div class="col-key">
                Company code
              </div>
              <div class="col-value">
                {{ companydata.code }}
              </div>
            </div>
            <div class="section-container">
              <div class="col-key">
                Department name
              </div>
              <div class="col-value">
                {{ userdata.department }}
              </div>
            </div>
            <div class="position-container">
              <div class="col-key">
                Job title
              </div>
              <div class="col-value">
                {{ userdata.jobTitle }}
              </div>
            </div>
            <div class="mailaddress-container">
              <div class="col-key">
                Email Address
              </div>
              <div class="col-value">
                {{ userdata.email }}
              </div>
            </div>
            <div class="account-rank">
              <div class="col-key">
                Role
              </div>
              <div class="col-value">
                {{ roles(logindata.role) }}
              </div>
            </div>
            <div class="limitation-container">
              <div class="col-key">
                Restrictions
              </div>
              <div class="col-value">
                {{ profileRestrictions(userdata.profileEditing) }}<br />
                {{ collaborationRestrictions(userdata.disallowCollaboration) }}
              </div>
            </div>
            <div class="created-container">
              <div class="col-key">
                Account creation date
              </div>
              <div class="col-value">
                {{ formatDate(userdata.createdAt) }}
              </div>
            </div>
            <div class="password-updated-container">
              <div class="col-key">
                Date of last password change
              </div>
              <div class="col-value">
                {{ formatDate(logindata.passwordChange) }}
              </div>
            </div>
            <div class="last-login-container">
              <div class="col-key">
                Last login date and time
              </div>
              <div class="col-value">
                {{ formatDateTime(logindata.lastLogin) }}
              </div>
            </div>
          </div>
        </div>
        <EditAccounts v-show="isModalVisible" @close="closeModalEdit" @editoutcome="editResult($event)" />
        <ResetPasswordInAccount v-show="isModalVisibleforReset" @close="closeModalReset" />
        <DeleteAccount v-show="isModalVisibleforDelete" @close="closeModalDelete" />
      </div>
    </div>
  </div>
</template>
  
<script>

import EditAccounts from './EditAccounts.vue';
import DeleteAccount from './DeleteAccount.vue';
import ResetPasswordInAccount from './ResetPasswordInAccount.vue';

import AdminService from '@/services/AdminService';
import { profileRestrictions, collaborationRestrictions, roles } from '@/helpers/enum';
import { Role } from '@/router/role';

export default {

  name: "AccountInformationComponent",
  components: { EditAccounts, ResetPasswordInAccount, DeleteAccount },
  data() {
    return {
      isModalVisibleforReset: false,
      isModalVisible: false,
      isModalVisibleforDelete: false,
      showlistDown: false,
      error: '',
      accountData: [],
      i: 0,
      companydata: [],
      userdata: [],
      logindata: [],
      profileRestrictions,
      collaborationRestrictions,
      roles,
      Role,
      messageedit: '',
      elementvisible: false
    };
  },
  mounted() {
    this.findUser();
  },

  beforeUnmound() {
    window.removeEventListener("click", this.detailMenuClose);
  },
  methods: {
    findUser() {
      const id = this.$route.query.id
      AdminService.getAccount(id).then((res) => {
        this.accountData = res.data;
        this.companydata = JSON.parse(JSON.stringify(this.accountData.company));
        this.userdata = JSON.parse(JSON.stringify(this.accountData.user));
        this.logindata = this.userdata.auth;
      }).catch((err) => {
        this.error = err;
      })
    },

    editResult(message) {
      this.findUser()
      this.elementvisible = true;
      this.messageedit = message
      this.makeinvisible()
    },
    makeinvisible() {
      setTimeout(() => this.elementvisible = false, 2000)
    },
    formatDate(date) {
      if (date == null) {
        return date;
      }
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(date)).slice()
    },

    formatDateTime(date) {
      if (date == null) {
        return date;
      }
      return new Intl.DateTimeFormat('en-Us', { dateStyle: 'medium', timeStyle: 'medium' }).format(new Date(date)).slice();
    },
    showModalEdit() {

      this.isModalVisible = true;
    },

    closeModalEdit() {

      this.isModalVisible = false;
    },

    showModalReset() {
      this.isModalVisibleforReset = true;
    },

    closeModalReset() {
      this.isModalVisibleforReset = false;
    },

    showModalDelete() {
      this.isModalVisibleforDelete = true;
    },

    closeModalDelete() {
      this.isModalVisibleforDelete = false;
    },

    showMoreDetails() {

      const menuList = document.getElementById("detailedmenubar");
      window.removeEventListener("click", this.detailMenuClose);
      if (menuList.style.display == "none" || menuList.style.display == "") {

        menuList.style.display = "block";
        this.showlistDown = true;
        window.addEventListener("click", this.detailMenuClose);
      } else {

        this.showlistDown = false;
        menuList.style.display = "none";

      }
    },

    detailMenuClose(e) {

      if (!this.$refs.detailListdown?.contains(e.target)) {
        const menuList = document.getElementById("detailedmenubar");
        if (
          this.showlistDown &&
          menuList.style.display == "block" &&
          this.i != 0
        ) {
          menuList.style.display = "none";
          this.showlistDown = false;
          this.i = this.i - 2;
          window.removeEventListener("click", this.detailMenuClose);
        }
        this.i = this.i + 1;
      }
    },

  },

}

</script>

<style scoped>

* {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: #333;
}

.pull-right {
  float: right;
}

.button-secondary {
  background: #33a69d !important;
  color: #FFFFFF;
  box-shadow: none;
  border-color: #41c3b8;
  border-radius: 5px;
  line-height: 1;
  margin-right: 25px;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 5px 12px;
}

.button-secondary2 {
  background: #33a69d !important;
  color: #FFFFFF;
  box-shadow: none;
  border-color: #41c3b8;
  border-radius: 5px;
  line-height: 1;
  float: right;
  margin-right: 25px;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 5px 12px;
}

.subtitle {
  background-color: #f7f8f8;
  border-bottom: 4px #e4e4e4 solid;
  border-left: 1px #e4e4e4 solid;
  width: 100%;
  float: left;
}

.profile-container {
  margin: 30px 25px;
}

.profilebox {
  margin-top: 50px;
}

.col-account-icon {
  margin-top: 35px;
  display: inline-block;

}

.account-icon {
  display: inline-block;
  width: 64px;
  height: 64px;
  background: no-repeat center center;
  background-size: cover !important;

}

.col-profile {
  display: inline-block;
  padding-left: 9px;
  width: calc(100% - 100px);
  top: -10px;
}

.name-container {
  padding-top: 6px;
  padding-bottom: 20px;
  font-size: 18px;
  margin-left: 118px;
  margin-top: -80px;
}

.row-profile .company-container:first-child {
  border-top: solid 1px #c8c8c8;
}

.row-profile>div {
  border-bottom: solid 1px #c8c8c8;
  padding: 9px 0;
}

.row-profile .col-key {
  display: inline-block;
  width: 267px;
  line-height: 24px;
  font-weight: bold;
  vertical-align: top;
}

.row-profile .col-value {
  display: inline-block;
  line-height: 24px;
}

.col-key {
  display: inline-block;
  width: 190px;
  line-height: 24px;
  font-weight: bold;
  vertical-align: top;
}

.row-profile {
  margin-top: 0px;
}

.pin-outer-layer {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 11.5vh);

}

.pin-inner-layer {
  display: flex;
  width: 100%;
  flex-direction: column;
}

#detailedmenubar {
  display: none;
}

.listdown-content-detail {
  background-color: #ffffff;
  border-radius: 3px;
  margin-left: -16px;
  width: fit-content;
  height: 60px;
  margin-top: 10px;
  position: absolute;
  box-shadow: 0px 0px 4px 0px rgb(0 0 0 / 75%);
  padding: 4px 0px;
  cursor: pointer;
}

.listdown-content-detail .detailmenuitems {
  list-style: none;
}

.fullContent {
  justify-content: center;
}

.nick-header {

  float: left;
}
@media screen and (max-width: 768px){
    .pin-outer-layer{
        margin-top: 29px;

    }
}
@media screen and (max-width: 820px){
    .pin-outer-layer{
        margin-top: 44px;
        width:100%;

    }
  }
</style>