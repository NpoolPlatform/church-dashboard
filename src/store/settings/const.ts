enum API {
  CREATE_PLATFORM_SETTING = '/cloud-hashing-billing/v1/create/platform/setting',
  UPDATE_PLATFORM_SETTING = '/cloud-hashing-billing/v1/update/platform/setting',
  GET_PLATFORM_SETTING = '/cloud-hashing-billing/v1/get/platform/setting',

  CREATE_COIN_SETTING = '/cloud-hashing-billing/v1/create/coin/setting',
  UPDATE_COIN_SETTING = '/cloud-hashing-billing/v1/update/coin/setting',
  GET_COIN_SETTING_BY_COIN = '/cloud-hashing-billing/v1/get/coin/setting/by/coin',

  CREATE_GOOD_INCOMING = '/cloud-hashing-billing/v1/create/good/incoming',
  UPDATE_GOOD_INCOMING = '/cloud-hashing-billing/v1/update/good/incoming',
  GET_GOOD_INCOMINGS_BY_GOOD = '/cloud-hashing-billing/v1/get/good/incomings/by/good'
}

export {
  API
}
