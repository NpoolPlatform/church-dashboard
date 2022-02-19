enum API {
  GET_KYC_REVIEWS_BY_OTHER_APP = '/cloud-hashing-apis-v2/v1/get/kyc/reviews/by/other/app',
  GET_GOOD_REVIEWS = '/cloud-hashing-apis-v2/v1/get/good/reviews',
  UPDATE_REVIEW = '/review-service/v1/update/review',
  GET_WITHDRAW_ADDRESS_REVIEWS_BY_OTHER_APP = '/cloud-hashing-apis-v2/v1/get/withdraw/address/reviews/by/other/app',
  GET_WITHDRAW_REVIEWS_BY_OTHER_APP = '/cloud-hashing-apis-v2/v1/get/withdraw/reviews/by/other/app',
  UPDATE_USER_WITHDRAW_REVIEW_FOR_OTHER_APP = '/cloud-hashing-apis-v2/v1/update/user/withdraw/review/for/other/app'
}

enum State {
  Approved = 'approved',
  Rejected = 'rejected'
}

export {
  API,
  State
}
