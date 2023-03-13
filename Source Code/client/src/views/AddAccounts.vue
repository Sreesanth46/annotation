<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                    <h4>Add Account</h4>
                    <button type="button" class="modal-close" @click="closeForm" aria-hidden="true">x</button>
                </slot>
            </header>

            <section class="modal-body">
                <form ref="addAccountForm">
                    <slot name="body">

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
                                            <input name="nickName" class="form-control account_nm" maxlength="20"
                                                placeholder=" " type="text" id="nickName" v-model.trim="nickName"
                                                @blur="v$.nickName.$touch()" @keydown="v$.nickName.$touch()" v-bind:class="{
                                                    error: v$.nickName.$error,
                                                    valid: v$.nickName.$dirty && !v$.nickName.$invalid,
                                                }" autocomplete="off" />
                                            <span v-for="error in v$.nickName.$errors" :key="error.$uid"
                                                style="color:red">{{ error.$message }}</span><br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="row row-profile-key">
                                    <div class="col col-xs-12">
                                        <span class="profile-key">Account ID</span>
                                        <span class="text-danger">(required)</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="input text">
                                            <input name="accountId" class="form-control account_id" minlength="4"
                                                maxlength="50" placeholder=" " type="text" id="accountId"
                                                v-model.trim="accountId" @blur="v$.accountId.$touch()"
                                                v-on-keydown="verifyAccountId(accountId)" @keydown="v$.accountId.$touch()"
                                                v-bind:class="{
                                                    error: v$.accountId.$error,
                                                    valid: v$.accountId.$dirty && !v$.accountId.$invalid,
                                                }" autocomplete="off" />
                                            <span v-for="error in v$.accountId.$errors" :key="error.$uid"
                                                style="color:red">{{ error.$message }}</span><br>
                                            
                                             <span id="accountfound">Account ID exist please try another Account ID</span>
                                        
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
                                            <input name="departmentName" class="form-control section_nm" maxlength="50"
                                                placeholder=" " type="text" id="AccountSectionNm" v-model="departmentName">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12"><br />
                                <div class="row row-profile-key">
                                    <div class="col col-xs-12">
                                        <span class="profile-key">Job title</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="input text">
                                            <input name="data[Account][position_nm]" class="form-control position_nm"
                                                maxlength="50" placeholder=" " type="text" id="AccountPositionNm"
                                                v-model="jobTitle">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12"><br />
                                <div class="row row-profile-key">
                                    <div class="col col-xs-12">
                                        <span class="profile-key">Email Address</span>
                                        <span class="text-danger">(required)</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-xs-12">
                                        <div class="input text">
                                            <input name="email" class="form-control email" maxlength="254" placeholder=" "
                                                type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" id="email"
                                                v-model.trim="email" @blur="v$.email.$touch()" @keydown="v$.email.$touch()"
                                                v-bind:class="{
                                                    error: v$.email.$error,
                                                    valid: v$.email.$dirty && !v$.email.$invalid,
                                                }" autocomplete="off" />
                                            <span v-for="error in v$.email.$errors" :key="error.$uid" style="color:red">{{
                                                error.$message }}</span><br>
                                            <div v-if="text" v-show="elementshow">
                                                <span class="errormsg" v-if="errormsg" style="color: red;">{{ this.msg
                                                }}</span>
                                            </div>


                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="row row-profile-key">
                                    <div class="col col-xs-12">
                                        <span class="profile-key">Role</span>
                                    </div>
                                </div>
                                <div class="row account-input-group rank">
                                    <div class="col-xs-12">
                                        <div>
                                            <input type="radio" name="role" id="roleMember" value="3" class="account_rank"
                                                required v-model="role" checked>
                                            <label for="roleMember">&nbsp;&nbsp;Member
                                                <span class="rank-note">(can use basic functions such as creating items and
                                                    posting comments)</span>
                                            </label>
                                        </div>
                                        <div>
                                            <input type="radio" name="role" id="roleAdmin" value="2" class="account_rank"
                                                required v-model="role">
                                            <label for="roleAdmin">&nbsp;&nbsp;Administrator
                                                <span class="rank-note">(in addition to basic functions, can use
                                                    administrative functions such as workspace configuration and account
                                                    configuration)</span>
                                            </label>
                                        </div>
                                        <div v-if="this.$store.state.userRole != 2">
                                            <input type="radio" name="role" id="roleOwner" value="1" class="account_rank"
                                                required v-model="role">
                                            <label for="roleOwner">&nbsp;&nbsp;Owner
                                                <span class="rank-note">(in addition to basic and administrative functions,
                                                    can use the collaboration feature and change plans)</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="row row-profile-key">
                                    <div class="col col-xs-12">
                                        <span class="profile-key">Restrictions</span>
                                    </div>
                                </div>
                                <div class="row account-input-group">
                                    <div class="col-xs-12">
                                        <div class="input checkbox">

                                            <input type="checkbox" name="profileEditing" class="form-control profileEditing"
                                                id="profileEditing" v-model="profileEditing">
                                            <label for="profileEditing">&nbsp;&nbsp;Disallow profile editing</label>
                                        </div>
                                        <div class="input checkbox">

                                            <input type="checkbox" name="disallowCollaboration"
                                                class="form-control disallowCollaboration" value=1
                                                id="disallowCollaboration" v-model="disallowCollaboration">
                                            <label for="disallowCollaboration">&nbsp;&nbsp;Disallow assignment to
                                                collaborating companies' projects</label>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </slot>
                </form>
            </section>

            <footer class="modal-footer">
                <slot name="footer">
                    <div>
                        <button type="button" class="btn-default" data-dismiss="modal" @click="closeForm">Cancel</button>
                        &nbsp;
                        <button type="submit" class="btn-primary" @click="addAccount">Add</button>
                    </div>
                </slot>
            </footer>
        </div>
    </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, maxLength, email, minLength } from "@vuelidate/validators";
import AdminService from "@/services/AdminService";
import ApiService from "@/services/ApiService";

export default {
    name: 'AddAccounts',

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
            accountId: {
                required: helpers.withMessage(
                    "Please Enter the Account ID",
                    required
                ),
                minLength: helpers.withMessage(
                    "Please enter minimum 4 characters",
                    minLength(4)
                ),
                maxLength: helpers.withMessage(
                    "Please Enter maximum 50 characters",
                    maxLength(50)
                ), $autodirty: true
            },
            email: {
                required: helpers.withMessage(
                    "Please Enter the Email Address",
                    required
                ),
                email: helpers.withMessage(
                    "Please enter valid email format",
                    email
                ),
                $autodirty: true
            }
        }
    },
    data() {
        return {
            nickName: '',
            accountId: '',
            departmentName: '',
            jobTitle: '',
            email: '',
            role: 3,
            disallowCollaboration: false,
            profileEditing: false,
            elementshow: false,
            errormsg: '',
            v$: useVuelidate(),
            msg: '',
            text: false,
            result: '',
            
        }
    },

    methods: {
        close() {
            this.$emit('close');
            this.resetAddForm();
        },
        verifyAccountId(accountId) {
            let form = { accountId: accountId };

            //CALL TO SERVICE CLASS

            ApiService.verifyAccountId(form)
                .then((response) => {
                    const messageId = document.getElementById("accountfound");
                    if (response.data.userFound == true) {
                        messageId.style.display = "block";
                    } else {
                        messageId.style.display = "none";
                    }
                   
                })
                .catch(() => {
                });
        },
        makeinvisible() {
            setTimeout(() => this.elementshow = false, 2000)
        },
        closeForm() {
            this.$emit('close');
            this.home();
        },
        sendResponse() {
            this.$emit("addresult", this.result)
        },
        resetAddForm() {

            this.nickName = null
            this.accountId = null
            this.departmentName = null
            this.jobTitle = null
            this.email = null
            this.role = 3
            this.disallowCollaboration = false
            this.profileEditing = false

        },
        home() {
            this.$router.go("/listaccounts");
        },
        addAccount() {
            const booleanValue = {
                true: 1,
                false: 0,
            }
            this.v$.$validate();
            if (!this.v$.nickName.$error && !this.accountId.$error && !this.v$.email.$error) {
                let form = {
                    nickName: this.nickName,
                    accountId: this.accountId,
                    departmentName: this.departmentName,
                    jobTitle: this.jobTitle,
                    email: this.email,
                    role: this.role,
                    disallowCollaboration: booleanValue[this.disallowCollaboration],
                    profileEditing: booleanValue[this.profileEditing]
                }

                AdminService.addAccounts(form).then((response) => {
                    this.result = response.data;
                    this.$emit('addoutcome', this.result)
                    this.resetAddForm()
                    this.close();

                }).catch((err) => {
                    this.errormsg = err.response.data.errorCode;
                    this.text = true;
                    this.elementshow = true

                    if (this.errormsg == 3003) {
                        this.msg = "Email Id Already Exist"
                    }
                    this.makeinvisible();
                })
            }
        }
    },
};
</script>


<style scoped>
* {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
}

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

    border-color: transparent;
    cursor: pointer;
    position: relative;
    margin-top: -18px;
    margin-left: 843px;
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
    height: 24px;
    padding: 6px 12px;
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
    line-height: normal;
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
    margin: 0;
}

input[type="checkbox"] {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    display: inline-block;
    margin-top: 1px;
    line-height: normal;
    box-sizing: border-box;
    padding: 0;
    margin-bottom: 5px;

}

input[type="radio"] {
    margin-left: 10px;
    margin-top: 1px;
    line-height: normal;
    box-sizing: border-box;
    padding: 0;
    margin-bottom: 5px;
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
    top: 0;
    position: absolute;
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

.modal {
    

    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;
    border-radius: 20px;
}
#accountfound {
  color: red;
  display: none;
}
</style>

