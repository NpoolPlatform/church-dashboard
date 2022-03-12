enum API {
  GET_PLATFORM_BENEFITS = '/cloud-hashing-billing/v1/get/platform/benefits',
  GET_USER_BENEFITS = '/cloud-hashing-billing/v1/get/user/benefits',
  GET_USER_WITHDRAW_ITEMS = '/cloud-hashing-billing/v1/get/user/withdraw/items',
  GET_COIN_ACCOUNT_TRANSACTIONS = '/cloud-hashing-billing/v1/get/coin/account/transactions',
  GET_PAYMENTS = '/cloud-hashing-order/v1/get/payments',
  CREATE_USER_PAYMENT_BALANCE_FOR_OTHER_APP_USER = '/cloud-hashing-billing/v1/create/user/payment/balance/for/other/app/user',
  GET_USER_PAYMENT_BALANCES_BY_OTHER_APP = '/cloud-hashing-billing/v1/get/user/payment/balances/by/other/app',
  UPDATE_COIN_ACCOUNT_TRANSACTION = '/cloud-hashing-billing/v1/update/coin/account/transaction'
}

enum PaymentState {
  Timeout = 'timeout'
}

export {
  API,
  PaymentState
}
