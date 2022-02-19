export enum MutationTypes {
  // KYC review
  SetKYCReviews = 'SET_KYC_REVIEWS',
  SetKYCSelectedAppID = 'SET_KYC_SELECTED_APP_ID',
  // Good review
  SetGoodReviews = 'SET_GOOD_REVIEWS',
  // Withdraw address review
  SetWithdrawAddressReviews = 'SET_WITHDRAW_ADDRESS_REVIEWS',
  SetWithdrawAddressSelectedAppID = 'SET_WITHDRAW_ADDRESS_SELECTED_APP_ID',
  // Withdraw review
  SetWithdrawReviews = 'SET_WITHDRAW_REVIEWS',
  SetWithdrawSelectedAppID = 'SET_WITHDRAW_SELECTED_APP_ID',
  // Common
  UpdateReview = 'UPDATE_REVIEW'
}
