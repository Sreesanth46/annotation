import axios from 'axios';
import MemberServices from '../services/MemberService';

const publicRoutes = [ '/register', '/register/signup', '/register/verify', '/register/user', '/register/comany', '/register/comany/code', '/register/user/accountid', '//login', '/login/forgotpassword', '/login/resetpassword', '/login/verifyToken', '/login/refreshToken' ]

const interceptor = () => {
    axios.interceptors.request.use((config) => {
        
        if(publicRoutes.includes(config.url)) return config;

        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
           config.headers["authorization"] = `Bearer ${accessToken}`;
        }
        return config;
        
      }, (error) => {
        return Promise.reject(error);
    });
    
    axios.interceptors.response.use( (res) => {
      return res;
    }, async (err) => {
        if (err.response.status === 401) {
            try {

              const refreshToken = {refreshToken :localStorage.getItem('refreshToken')}
              MemberServices.refreshToken(refreshToken).then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken);
              })
              
            } catch (_error) {
                return Promise.reject(_error);
            }
        }

        return Promise.reject(err);
    })
}

export default interceptor;