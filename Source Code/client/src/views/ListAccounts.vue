<template>
    <div class="pin-outer-layer">
        

        <div class="pin-inner-layer">
            

            <div class="subtitle">
                    <h3>Accounts</h3>
                    <div class="pull-right">

                    <button class="button-secondary pure-button" type="button" @click="showModal">
                        Add Account
                    </button>
                    <AddAccounts v-show="isModalVisible" @close="closeModal" @addoutcome="addResult($event)" />
                </div>
            </div>
            <div class="col-lg-12" id="company_account_list">
                <form ref="clearsearch">
                    <div class="filter">
                        <div class="searchinput">
                            <input type="text" class="search" v-model="keyword" @keydown="findAccounts"
                                @keypress.enter.prevent="searchInAccount($event)"
                                placeholder=" Filter by account ID, Nickname, or Email address " />
                        </div>
                        <div class="searchimage">
                            <span class="material-symbols-outlined search-icon">
                                search
                            </span>
                        </div>
                        <div class="closesearch">
                            <span class="material-symbols-outlined close-button" @click="clearSearchContent()">
                                cancel
                            </span>
                        </div>
                    </div>
                </form>
                <div class="alert alert-success" v-if="messageadd" v-show="elementvisible"
                    style="border: 2px solid green;font-size: 19px;width: 100%;max-height: 60px;margin-top:4px;background: transparent;">
                    <h3>Registered !</h3>
                </div>

                <div class="datatablewithcontent">
                    <table class="table table-striped ar-list-table account-list-table dataTable no-footer"
                        id="DataTables_Table_0" role="grid" aria-describedby="DataTables_Table_0_info">
                        <thead>
                            <tr role="row">
                                <th class="account-id sorting_asc" data-field="account-id" tabindex="0" id="accountId"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" aria-sort="ascending"
                                    aria-label="Account ID: activate to sort column descending">
                                    Account ID
                                </th>
                                <th class="account-nm sorting" data-field="account-nm" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" id="nickName"
                                    aria-label="Nickname: activate to sort column ascending">
                                    Nickname
                                </th>
                                <th class="mail-address sorting" data-field="mail-address" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" id="email"
                                    aria-label="Email Address: activate to sort column ascending">
                                    Email Address
                                </th>
                                <th class="collaboration sorting" data-field="collaboration" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" id="disclosure"
                                    aria-label="Account disclosure: activate to sort column ascending">
                                    Account disclosure
                                </th>
                                <th class="account-rank sorting" data-field="account-rank" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" id="role"
                                    aria-label="Role: activate to sort column ascending">
                                    Role
                                </th>
                                <th class="date created sorting" data-field="created" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" id="createDate"
                                    aria-label="Creation date: activate to sort column ascending">
                                    Creation date
                                </th>
                                <th class="date password-updated sorting" data-field="password-updated" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" id="passwordChange"
                                    aria-label="Date of last password change: activate to sort column ascending">
                                    Date of last password change
                                </th>
                                <th class="datetime last-logined sorting" data-field="last-logined" tabindex="0"
                                    aria-controls="DataTables_Table_0" rowspan="1" colspan="1" id="lastLogin"
                                    aria-label="Last login date and time: activate to sort column ascending">
                                    Last login date and time
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="account in accountslist" :key="account.accountId">
                                <td class="accountIdnav"><a @click="$router.push(`/accountinfo?id=${account.id}`)">{{
                                    account.accountId
                                }}</a></td>
                                <td>{{ account.nickName }}</td>
                                <td>{{ account.email }}</td>
                                <td>{{ accountDisclosure(account.disclosure) }}</td>
                                <td class="showrole">{{ roles(account.auth.role) }}</td>
                                <td>{{ formatDate(account.createdAt) }}</td>
                                <td>{{ formatDate(account.auth.passwordChange) }}</td>
                                <td>{{ formatDateTime(account.auth.lastLogin) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import AddAccounts from './AddAccounts.vue';

import AdminService from '@/services/AdminService';
import { accountDisclosure, roles } from '../helpers/enum'

export default {

    name: "ListAccountsComponent",
    components: { AddAccounts },

    data() {
        return {
            isModalVisible: false,
            error: '',
            keyword: '',
            accountslist: [],
            messageadd: '',
            elementvisible: false,
            accountDisclosure,
            roles
        };
    },

    mounted() {
        this.findAccounts();
    },

    methods: {
        findAccounts() {
            AdminService.getAllAccounts().then((res) => {
                this.accountslist = res.data
            }).catch((err) => {
                this.error = err
            })
        },

        searchInAccount(event) {
            if (event.target.value.length == 0) {
                this.findAccounts()
            }

            const form = { search: event.target.value }
            if (form != null) {
                AdminService.searchAccount(form).then((res) => {
                    this.accountslist = res.data

                }).catch((err) => {
                    this.error = err;
                })
            }
        },
        addResult(message) {
            this.elementvisible = true;
            this.messageadd = message
            this.findAccounts()
            this.makeinvisible()
        },

        makeinvisible() {
            setTimeout(() => this.elementvisible = false, 2000)
        },

        showModal() {
            this.isModalVisible = !this.isModalVisible;
        },

        closeModal() {
            this.isModalVisible = false;
        },

        clearSearchContent() {
            this.$refs.clearsearch.reset();
            this.$router.go("/listaccounts");
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
        }
    }
}
</script>

<style scoped>
.pull-right {
  float: right; 
    
}

.datatablewithcontent {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

table.dataTable {
    clear: both;
    border-spacing: 0;
    background-color: transparent;
    border-collapse: collapse;
    border: 1px solid;
    padding: 10px 12px;
    margin-top:20px;
}

.table-striped>tbody>tr:nth-child(2n+1)>td,
.table-striped>tbody>tr:nth-child(2n+1)>th {
    background-color: #fff;
}

.material-symbols-outlined {
    margin-top: 3px;
}

th {
    border: solid 1px #c8c8c8;
    background-color: #f7f8f8;
    border-bottom: 2px #e4e4e4 solid;
    border-left: 1px #e4e4e4 solid;
}

td {
    border: solid 1px #c8c8c8;
    background-color: #f7f8f8;
    border-bottom: 2px #e4e4e4 solid;
    border-left: 1px #e4e4e4 solid;
}

.accountIdnav {
    text-decoration: underline;
    color: rgba(27, 149, 206, 0.933);
    cursor: pointer;
}

.showrole {
    border-color: #c9efff;
    background-color: #eefaff
}

.button-secondary {
    background: #33a69d !important;
    color: #FFFFFF;
    font: inherit;
    font-size: 14px;
    margin-top: -34px;
    box-shadow: none;
    border-color: #41c3b8;
    border-radius: 5px;
  

    line-height: 1;
    align-items: center;
    display: inline-block;
   
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border: 1px solid transparent;
    white-space: nowrap;
    padding: 5px 0px;
}


.subtitle {
    background-color: #f7f8f8;
    border-bottom: 5px #e4e4e4 solid;
    border-left: 1px #e4e4e4 solid;
    width: 100%;
   
}

.dataTable th,
.dataTable td {
    line-height: 20px !important;
    vertical-align: middle;
}



.pin-outer-layer {
    display: flex;
    flex-direction: row;
    width: 100%;
   
   

}

.pin-inner-layer {
    display: flex;
    width: 100%;
    flex-direction: column;
    height: calc(100vh - 5.125vh);
    
 
}

.filter {
    display: flex;
    margin-left: 20px;
}

.search {
    border: 1px solid grey;
    border-radius: 5px;
    width: 175%;
    margin-bottom: 10px;
    padding-left: 30px;
    height: 30px;
    padding-top: 5px;
}

.search-icon {
    margin-left: -230px;
}

.close-button {
    margin-left: 145px;
    cursor: pointer;
}
@media screen and (max-width: 768px){
    .pin-outer-layer{
        margin-top: 29px;

    }
    
}
@media screen and (max-width: 570px){
    .search-icon{
        margin-left: -249px;

    }

}
@media screen and (max-width: 820px){
    .pin-outer-layer{
        margin-top: 41px;
        width:100%;
        overflow-y: scroll;

    }
    
}
</style>