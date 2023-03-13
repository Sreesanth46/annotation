<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h4 class="modal-workspace">Reset password</h4>
          <button type="button" class="modal-close" @click="closeForm" aria-hidden="true">x</button>
        </slot>
      </header>

      <section class="modal-body">
        <div class="alert alert-danger" style="display: none;"></div>
        <div class="row">
          <div class="col-xs-12 ar-pass-check-modal">
            <div class="ar-pass-check-modal-message">
              <span class="message">The password will be reset.<br></span>
              <span class="message">* If you reset your password, you will not be able to login with your current
                password.</span><br />
            </div>
          </div>
        </div><br />
        <table class="table ">
          <caption></caption>
          <tbody>
            <th id="resetHead"></th>
            <tr>
              <td class="item-name">Account Id</td>
              <td class="item-value">{{ userdata.accountId }}</td>
            </tr>
            <tr>
              <td class="item-name">Nickname</td>
              <td class="item-value">{{ userdata.nickName }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          <div>
            <button type="button" class="btn btn-primary" @click="resetPassword()">Reset</button>
            <button type="button" class="btn btn-default" id="btn_close" @click="closeForm">Close</button>
          </div>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script>
import AdminService from '@/services/AdminService';
import { useRoute } from "vue-router";
import Swal from 'sweetalert2';

export default {
  name: 'ResetPasswordInAccount',

  data() {
    return {
      accountData: [],
      userdata: [],
      nickName: '',
      accountId: '',
      error: '',
      id: ''
    }
  },
  mounted() {
    this.findUser();

  },
  methods: {
    findUser() {
      this.id = useRoute().query.id
      AdminService.getAccount(this.id).then((res) => {
        this.accountData = res.data;
        this.userdata = JSON.parse(JSON.stringify(this.accountData.user));
      }).catch((err) => {
        this.error = err;
      })
    },
    closeForm(){
      this.$emit('close');
    },
    close() {
      this.alertmsg();
      this.$emit('close');
    },
    alertmsg(){
      Swal.fire({
        icon: "success",
        title: "Updated !",
        heightAuto: "20px",
        position: 'center',
        showConfirmButton: true
      })
    },
    resetPassword() {
      const form = { accountId: this.userdata.accountId }
      AdminService.resetPasswordInAccount(form).then(() => {
        this.close();
      }).catch((err) => {
        this.error = err;
      })
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
  line-height: 16px;
}

.modal-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  position: center;
  max-height: fit-content;
  padding: 16px;
  overflow: auto;
  background-color: #fff;
  border-radius: 4px;
}

.modal-header {
  padding: 15px;
  border-bottom: 1px solid #e5e5e5;
  min-height: 12px;
}

.modal-footer {
  padding: 10px;
  border-top: 1px solid #e5e5e5;
  min-height: 16px;
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

.modal-close {
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  color: #000;
  background-color: transparent;
  text-shadow: 0 1px 0 #fff;
  opacity: .5;
  filter: alpha(opacity=20);
  display: flex;
  justify-content: center;

  border-color: transparent;
  cursor: pointer;
  position: relative;
  margin-left: 500px;
  margin-top: -25px;
}

.modal-close:hover {
  cursor: pointer;
  color: #000;
  opacity: .5;
}

.modal-body {
  padding: 20px;
  position: relative;
  padding-top: 15px;

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
  margin-left: 20px;
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
  bottom: 0;
  top: 0;
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
  display: flex;
  flex-direction: column;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
  line-height: 1.42857143;
  color: #333;
  z-index: 1050;
  border-radius: 20px;

}

.table {
  width: 100%;
  margin-bottom: 20px;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

td {
  padding: 8px;
  line-height: 1.42857143;
  vertical-align: top;
  border-top: 1px solid #ddd;
}
</style>

