<template>
    <div class="pin-outer-layer">
        
        <div class="pin-inner-layer">
           
            <div class="col-xs-12 subtitle">
                <div class="account-list-title">
                    <h2>Profile</h2>
                </div>
                <div class="pull-right">
                    <button class="button-secondary pure-button" type="button" @click="showModal">
                        Change Password
                    </button> &nbsp;&nbsp;
                    <button class="button-secondary2 pure-button" type="button" @click="showModalforEdit">
                        Edit
                    </button>

                </div>
            </div>
            <div id="ar-profile" class="col-xs-12">
                <div class="alert alert-success" v-show="messagevisible" v-if="messageedit"
                    style="border: 2px solid green;font-size: 19px;width: 100%;max-height: 60px;margin-top: 25px;background: transparent;">
                    <h3>Profile Updated !</h3>
                </div>

                <div class="alert alert-success" v-show="elementvisible" v-if="messagepassword"
                    style="border: 2px solid green;font-size: 19px;width: 100%;max-height: 60px;margin-top: 15px;background: transparent;">
                    <h4>Password Updated !</h4>
                </div>
                <div class="profile-container">
                    <div>
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
                    </div>
                </div>
                <ChangePassword v-show="isModalVisible" @close="closeModal"
                    @editpasswordoutcome="editPasswordResult($event)" />
                <EditProfile v-show="isModalVisibleforEdit" @close="closeModalforEdit"
                    @editprofileoutcome="editProfileResult($event)" />
            </div>
        </div>
    </div>
</template>

<script>
import ChangePassword from './ChangePassword.vue';
import EditProfile from './EditProfile.vue';
import MemberService from '@/services/MemberService';
import { profileRestrictions, collaborationRestrictions, roles } from '@/helpers/enum';

export default {
    name: "ViewProfileComponent",
    components: { ChangePassword, EditProfile},
    data() {
        return {
            isModalVisible: false,
            isModalVisibleforEdit: false,
            profiledata: [],
            companydata: [],
            userdata: [],
            logindata: [],
            messageedit: '',
            messagepassword: '',
            elementvisible: false,
            messagevisible: false,
            profileRestrictions,
            collaborationRestrictions,
            roles
        };
    },
    mounted() {

        this.redirectHome();
    },
    methods: {
        showModal() {
            this.isModalVisible = true;
        },
        closeModal() {
            this.isModalVisible = false;
        },
        showModalforEdit() {
            this.isModalVisibleforEdit = true;
        },
        closeModalforEdit() {
            this.isModalVisibleforEdit = false;
        },
        redirectHome() {
            MemberService.currentUserProfile().then((response) => {
                this.profiledata = response.data;
                this.companydata = JSON.parse(JSON.stringify(this.profiledata.company));
                this.userdata = JSON.parse(JSON.stringify(this.profiledata.user));
                this.logindata = this.userdata.auth;
            },
                (err) => {
                    this.error = err;
                }
            )
        },
        editProfileResult(messageprofile) {
            this.messagevisible = true;
            this.messageedit = messageprofile
            this.redirectHome();
            this.hidevisible()
        },
        editPasswordResult(message) {
            this.elementvisible = true;
            this.messagepassword = message
            this.redirectHome();
            this.makeinvisible()
        },

        makeinvisible() {
            setTimeout(() => this.elementvisible = false, 2000)
        },
        hidevisible() {
            setTimeout(() => this.messagevisible = false, 2000)
        },

    }
}
</script>
<style scoped>
* {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    color: #333;
}

.pull-right {
    margin-top: -35px;
    float: right;
    padding: 12px 10px;
    min-height: 16px;
}

.button-secondary {
    background: #33a69d !important;
    color: #FFFFFF;
    font: inherit;
    font-size: 14px;
    box-shadow: none;
    border-color: #41c3b8;
    border-radius: 5px;
    line-height: 1;
    align-items: center;
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 5px 12px;

}

.button-secondary2 {
    background: #33a69d !important;
    color: #FFFFFF;
    font: inherit;
    font-size: 14px;
    box-shadow: none;
    border-color: #41c3b8;
    border-radius: 5px;
    float: right;
    line-height: 1;
    align-items: center;

    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 5px 12px;
}

.subtitle {
    background-color: #f7f8f8;
    border-bottom: 4px #e4e4e4 solid;
    border-left: 1px #e4e4e4 solid;
    padding: 0px 0px;
    height: 50px;
}


.col-xs-12 {
    width: 100%;
    float: left;
    min-height: 0px;
    padding-left: 0px;
    padding-right: 0px;
}

.profile-container {
    margin: 30px 25px;
}

.profile-container .col-account-icon {

    display: inline-block;
}

#ar-profile .profile-container .col-profile {

    display: inline-block;
    padding-left: 9px;
    width: calc(100% - 100px);
    top: -10px;
}

#ar-profile .profile-container .col-profile .name-container {
    padding-top: 6px;
    padding-bottom: 20px;
    font-size: 18px;
}

.profile-container .row-profile .company-container:first-child {
    border-top: solid 1px #c8c8c8;
}

.profile-container .row-profile>div {
    border-bottom: solid 1px #c8c8c8;
    padding: 9px 0;
}

.account-icon {
    display: inline-block;
    width: 64px;
    height: 64px;
    background: no-repeat center center;
    background-size: cover !important;

}

.profile-container .row-profile .col-key {
    display: inline-block;
    width: 200px;
    line-height: 24px;
    font-weight: bold;
    vertical-align: top;
}

.profile-container .row-profile .col-value {
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
    margin-top: 50px;
    margin-left: auto;
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
@media screen and (max-width: 768px){
    .pin-outer-layer{
        margin-top: 29px;

    }
}
@media screen and (max-width: 820px){
    .pin-outer-layer{
        margin-top: 45px;
        width:100%;

    }
  }

</style>