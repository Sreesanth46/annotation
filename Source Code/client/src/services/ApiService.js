import axios from "axios";
const { SERVER_URL } = require('./Api')

const baseURL = SERVER_URL

class ApiService {

  initialRegistration(form) {
    return axios.post(baseURL + "/register/signup", form);
  }

  registration(form, token) {
    return axios.post(baseURL + "/register",form, { headers: { token: `${token}` }});
  }

  emailVerify(form) {
    return axios.post(baseURL + "/register/user", form);
  }

  verifyToken(token) {
    return axios.get(baseURL + "/register/verify", { headers: { token: token }});
  }

  verifyCompanyCode(code) {
    return axios.post(baseURL + "/register/company/code", code);
  }

  verifyAccountId(accountId) {
    return axios.post(baseURL + "/register/user/accountid", accountId);
  }

  login(form) {
    return axios.post(baseURL + "/login", form);
  }

  forgotPassword(form) {
    return axios.post(baseURL + "/login/forgotpassword", form);
  }

  resetPassword(form, token) {
    return axios.put(baseURL + "/login/resetpassword", form, { headers: { token: token }});
  }
}

export default new ApiService();
