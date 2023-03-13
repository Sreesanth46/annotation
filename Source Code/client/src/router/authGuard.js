import MemberService from '@/services/MemberService'
import store from '../store'
import { Role } from './role'

const publicRoutes = ['/initialregistration', '/signup', '/registrationdone', '/login', '/forgotpassword', '/forgotsuccessemail', '/resetpassword']


const authGuard = async (to, from, next) => {
    const restrictedRoute = to.meta.roles

    // public routes without accessToken
    if (!localStorage.getItem('accessToken') && publicRoutes.includes(to.path)) {
        return next();
    }

    // Non public routes without accessToken
    if (!publicRoutes.includes(to.path) && !localStorage.getItem('accessToken')) {
        return next({
            path: 'login',
            replace: true
        });
    }

    // check if user has already logged in.
    if (store.state.userRole == 0 && localStorage.getItem('accessToken')) {
        const token = { accessToken: localStorage.getItem('accessToken') }
        await MemberService.verifyToken(token).then((res) => {
            store.commit('updateRole', res.data.role)
            if (publicRoutes.includes(from.path)) {
                return next({
                    path: 'unreadcomments',
                    replace: true
                })
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    // if the route is restricted check user role.
    if (restrictedRoute) {
        if (Role[restrictedRoute] >= store.state.userRole) {
            return next();
        } else {
            return next({
                path: from.path,
                replace: true
            })
        }
    }

    next();
}

export default authGuard;