import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'login', component: () => import('pages/Login.vue') },
      { path: 'internationalization', component: () => import('pages/Internationalization.vue') },

      // Good pages
      { path: 'goods/goods', component: () => import('src/pages/goods/Goods.vue') },
      { path: 'goods/payments', component: () => import('src/pages/goods/Payments.vue') },
      { path: 'goods/limits', component: () => import('src/pages/goods/Limits.vue') },

      // Review pages
      { path: 'review/kyc', component: () => import('pages/review/KYC.vue') },
      { path: 'review/good', component: () => import('pages/review/Good.vue') },
      { path: 'review/withdraw', component: () => import('pages/review/Withdraw.vue') },
      { path: 'review/withdraw/address', component: () => import('pages/review/WithdrawAddress.vue') },

      // Applications page
      { path: 'applications/applications', component: () => import('pages/applications/Applications.vue') },
      { path: 'applications/email/template', component: () => import('pages/applications/ApplicationEmailTemplate.vue') },
      { path: 'applications/sms/template', component: () => import('pages/applications/ApplicationSMSTemplate.vue') },
      { path: 'applications/contacts', component: () => import('pages/applications/ApplicationContact.vue') },
      { path: 'applications/languages', component: () => import('pages/applications/ApplicationLanguages.vue') },
      { path: 'applications/goods', component: () => import('pages/applications/ApplicationGoods.vue') },

      // API list
      { path: 'apis', component: () => import('pages/API.vue') },

      // User list
      { path: 'users/users', component: () => import('pages/users/Users.vue') },
      { path: 'users/roles', component: () => import('pages/users/Roles.vue') },
      { path: 'users/auth/histories', component: () => import('pages/users/AuthHistories.vue') },
      { path: 'users/roleusers', component: () => import('pages/users/RoleUsers.vue') },
      { path: 'users/roleauths', component: () => import('pages/users/RoleAuths.vue') },

      // Billing and orders
      { path: 'billing', component: () => import('pages/Billing.vue') },

      // Invitation Code
      { path: 'inspire/invitation/code', component: () => import('pages/inspire/InvitationCode.vue') },
      { path: 'inspire/activity', component: () => import('pages/inspire/Activity.vue') },
      { path: 'inspire/coupon', component: () => import('pages/inspire/Coupon.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
