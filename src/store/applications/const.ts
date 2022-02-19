enum API {
  GET_APPLICATIONS = '/appuser-manager/v1/get/appinfos',
  CREATE_APPLICATION = '/appuser-manager/v1/create/app',
  UPDATE_APPLICATION = '/appuser-manager/v1/update/app',
  UPDATE_APP_CONTROL = '/appuser-manager/v1/update/app/control',
  CREATE_APP_CONTROL_FOR_OTHER_APP = '/appuser-manager/v1/create/app/control/for/other/app',
  GET_APP_ROLES_BY_OTHER_APP = '/appuser-manager/v1/get/app/roles/by/other/app',
  CREATE_APP_ROLE_FOR_OTHER_APP = '/appuser-manager/v1/create/app/role/for/other/app',
  UPDATE_APP_ROLE = '/appuser-manager/v1/update/app/role',
  GET_APP_GOODS_BY_OTHER_APP = '/cloud-hashing-goods/v1/get/app/goods/by/other/app',
  AUTHORIZE_APP_GOOD_FOR_OTHER_APP = '/cloud-hashing-goods/v1/authorize/app/good/for/other/app',
  UNAUTHORIZE_APP_GOOD = '/cloud-hashing-goods/v1/unauthorize/app/good',
  GET_RECOMMENDS_BY_OTHER_APP = '/cloud-hashing-goods/v1/get/recommends/by/other/app',
  CREATE_RECOMMEND_FOR_OTHER_APP = '/cloud-hashing-goods/v1/create/recommend/for/other/app',
  SET_APP_GOOD_PRICE_FOR_OTHER_APP = '/cloud-hashing-goods/v1/set/app/good/price/for/other/app',
  ONSALE_APP_GOOD_FOR_OTHER_APP = '/cloud-hashing-goods/v1/onsale/app/good/for/other/app',
  OFFSALE_APP_GOOD_FOR_OTHER_APP = '/cloud-hashing-goods/v1/offsale/app/good/for/other/app',
  GET_APP_WITHDRAW_SETTINGS_BY_OTHER_APP = '/cloud-hashing-billing/v1/get/app/withdraw/settings/by/other/app'
}

export {
  API
}
