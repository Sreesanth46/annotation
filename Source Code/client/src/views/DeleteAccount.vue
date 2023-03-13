<template>
  <div class="modal-backdrop">
    <div class="modal">
      <header class="modal-header">
        <slot name="header">
          <h4 class="modal-workspace">Delete Account</h4>
          <button type="button" class="modal-close" @click="closeForm" aria-hidden="true">x</button>
        </slot>
      </header>

      <section class="modal-body">
        <div class="alert alert-danger" style="display: none;"></div>
        <table class="table">
          <caption></caption>
          <tbody>
            <th id="deleteHead"></th>
            <tr>
              <td class="item-name">Account ID</td>
              <td class="item-value">{{ userdata.accountId }}</td>
            </tr>
            <tr>
              <td class="item-name">Nickname</td>
              <td class="item-value">{{ userdata.nickName }}</td>
            </tr>
          </tbody>
        </table>
        <div class="row">
          <div class="col-xs-12">
            The account has been deleted and cannot be returned to how it was.
          </div>
          <div class="confirm-checkbox">
            <input type="checkbox" id="delete-agree" name="delete-agree" class="delete-agree" value="agree"
              v-model="checked">
            <label for="delete-agree">
              I have understood the contents shown above.
            </label>
          </div>
        </div>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          <div>
            <button type="button" class="pass-check-modal-submit-btn btn btn-primary" :disabled="!checked"
              @click="deleteAccount()">Delete</button>
            <button type="button" class="btn btn-default" id="btn_close" @click="closeForm">Cancel</button>
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
  name: 'DeleteAccount',

  data() {
    return {
      id: '',
      checked: false,
      nickName: '',
      accountId: '',
      accountData: [],
      userdata: [],
      error: ''
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

    close() {
      this.$emit('close');
      this.alertmsg();
    },
    closeForm() {
      this.$emit('close');
    },
    alertmsg() {
      Swal.fire({
        icon: "success",
        title: "Deleted !",
        heightAuto: "20px",
        showConfirmButton: true,
        position: 'center'
      })
      this.$router.push("/listaccounts")
    },
    deleteAccount() {
      AdminService.deleteAccount(this.id).then(() => {
        this.close();
        this.$alert();
      }).catch((err) => {
        this.close();
        this.error = err.response.data.errorCode;
        if (this.error == "1908") {
          Swal.fire({
            icon: "error",
            title: "Cannot delete Company Owner !",
            timer: 100000,
            heightAuto: "20px",
            showConfirmButton: true
          })
        }
      })

    }
  }
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
  background-color: #d9534f !important;
  border-color: #d9534f !important;
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

.btn-primary.disabled,
.btn[disabled],
fieldset[disabled] .btn {
  cursor: not-allowed;
  pointer-events: none;
  opacity: .65;
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