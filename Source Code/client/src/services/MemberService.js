import axios from "axios";
const { SERVER_URL } = require('./Api')

const baseURL = SERVER_URL

class MemberServices {

    verifyToken(token) {
        return axios.post(baseURL+'/login/verifyToken', token)
    }

    refreshToken(token) {
        return axios.post(baseURL+'/login/refreshToken', token)
    }

    currentUserProfile() {
        return axios.get(baseURL+'/profile')
    }

    getCompanyProfile() {
        return axios.get(baseURL+'/profile/companyprofile')
    }

    updateUserProfile(user) {
        return axios.put(baseURL+'/profile', user)
    }

    changeUserPassword(currentData,newData) {
        return axios.put(baseURL+'/profile/password',currentData,newData)
    }

    getNotifications() {
        return axios.get(baseURL+'/notification');
    }
    getAllItem()
    {
        return axios.get(baseURL+'/item/getitem');
    }
    addItem(data)
    {
        return axios.post(baseURL+'/item/additem',data);
    }
    editItem(id,data)
    {
        return axios.put(baseURL+`/item/edititem/${id}`,data)
    }
    deleteItem(id)
    {
        return axios.put(baseURL+`/item/deleteitem/${id}`)
    }
}
export default new MemberServices()