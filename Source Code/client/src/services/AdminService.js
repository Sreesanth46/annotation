import axios from "axios";
const { SERVER_URL } = require('./Api')

const baseURL = SERVER_URL

class AdminService {

    getAllAccounts() {
      return axios.get(baseURL+"/account/listaccounts");
    }

    getAccount(id) {
      return axios.get(baseURL+`/account/getAccount/${id}`);
    }

    addAccounts(user) {
      return axios.post(baseURL+"/account/addaccount", user);
    }

    editAccounts(id, data) {
      return axios.put(baseURL+`/account/editaccount/${id}`, data);
    }

    deleteAccount(id) {
      return axios.put(baseURL+`/account/deleteaccount/${id}`);
    }

    searchAccount(data){
      return axios.post(baseURL+`/account/searchaccount`,data);
    }
    resetPasswordInAccount(data){
      return axios.put(baseURL+`/account/resetpassword`,data);
    }

}
export default new AdminService()