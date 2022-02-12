enum API {
  GET_ALL_GOODS = '/cloud-hashing-apis-v2/v1/get/goods',
  GET_ALL_DEVICES = '/cloud-hashing-goods/v1/get/devices',
  GET_ALL_VENDOR_LOCATIONS = '/cloud-hashing-goods/v1/get/vendor-locations',
  CREATE_DEVICE = '/cloud-hashing-goods/v1/create/device',
  UPDATE_DEVICE = '/cloud-hashing-goods/v1/update/device',
  CREATE_VENDOR_LOCATION = '/cloud-hashing-goods/v1/create/vendor-location',
  UPDATE_VENDOR_LOCATION = '/cloud-hashing-goods/v1/update/vendor-location',
  GET_ALL_FEE_TYPES = '/cloud-hashing-goods/v1/get/fee/types',
  GET_ALL_FEES = '/cloud-hashing-goods/v1/get/fees',
  CREATE_FEE_TYPE = '/cloud-hashing-goods/v1/create/fee/type',
  CREATE_GOOD = '/cloud-hashing-apis-v2/v1/create/good',
  UPDATE_GOOD = '/cloud-hashing-goods/v1/update/good',
  GET_ALL_PRICE_CURRENCYS = '/cloud-hashing-goods/v1/get/price-currencys',
  CREATE_PRICE_CURRENCY = '/cloud-hashing-goods/v1/create/price-currency'
}

export {
  API
}
