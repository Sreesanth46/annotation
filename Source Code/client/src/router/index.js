import { createRouter, createWebHistory } from 'vue-router'
import authGuard from './authGuard'
import Login from '@/views/Login'
import Body from '@/views/Body'


const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forgotpassword',
        name: 'ForgotPassword',
        component: () => import("@/views/ForgotPassword")
    },
    {
        path: '/resetpassword',
        name: 'ResetPassword',
        component: () => import("@/views/ForgotPassword")
    },
    {
        path: '/forgotsuccessemail',
        name: 'Forgotsuccessemail',
        component: () => import("@/views/Forgotsuccessemail")
    },
    {
        path: '/initialregistration',
        name: 'InitialRegistration',
        component: () => import("@/views/InitialRegistration")
    },
    {
        path: '/registrationdone',
        name: 'RegistrationDone',
        component: () => import("@/views/RegistrationDone")
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: () => import("@/views/SignUp")
    },
    {
        path: '/canvastoolbar',
        name: 'CanvasToolBar',
        component: () => import("@/Components/CanvasToolBar")
    },

    {
        path: '/canvas',
        name: 'canvasBody',
        component: () => import("@/views/CanvasBody")
    },

    {
        path: '/',
        name: 'Body',

        component: Body,
        children: [
            {
                path: '/listaccounts',
                name: 'ListAccounts',
                component: () => import("@/views/ListAccounts"),
                meta: { roles: ['Admin'] }
            },
            {
                path: '/addaccounts',
                name: 'AddAccounts',
                component: () => import("@/views/AddAccounts"),
                meta: { roles: ['Admin'] }
            },
            {
                path: '/editaccounts',
                name: 'EditAccounts',
                component: () => import("@/views/EditAccounts"),
                meta: { roles: ['Admin'] }
            },
            {
                path: '/accountinfo',
                name: 'AccountInformation',
                component: () => import("@/views/AccountInformation"),
                meta: { roles: ['Admin'] }
            },
            {
                path: '/resetpassword_account',
                name: 'ResetPasswordInAccount',
                component: () => import("@/views/ResetPasswordInAccount"),
                meta: { roles: ['Admin'] }
            },
            {
                path: '/deleteaccount',
                name: 'DeleteAccount',
                component: () => import("@/views/DeleteAccount"),
                meta: { roles: ['Admin'] }
            },
            {
                path: '/changepassword',
                name: 'ChangePassword',
                component: () => import("@/views/ChangePassword")
            },
            {
                path: '/viewprofile',
                name: 'ViewProfile',
                component: () => import("@/views/ViewProfile")
            },
            {
                path: '/unreadcomments',
                name: 'UnreadComments',
                component: () => import("@/views/UnreadComments")
            },
            {
                path: '/assigneditems',
                name: 'AssignedItems',
                component: () => import("@/views/AssignedItems")
            },
            {
                path: '/pin',
                name: 'Pin',
                component: () => import("@/views/Pin")
            },
            {
                path: '/listitem',
                name: 'ListItem',
                component: () => import("@/views/ListItem")
            }
        ]
    },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(authGuard)

export default router