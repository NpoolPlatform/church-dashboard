import { AppID } from 'src/const/const'
import { KYCReview, GoodReview, WithdrawAddressReview, WithdrawReview } from './types'

interface ReviewsState {
  KYCReviews: Array<KYCReview>
  GoodReviews: Array<GoodReview>
  SelectedKYCAppID: string
  WithdrawAddressReviews: Array<WithdrawAddressReview>
  SelectedWithdrawAddressAppID: string
  WithdrawReviews: Array<WithdrawReview>
  SelectedWithdrawAppID: string
}

function state (): ReviewsState {
  return {
    KYCReviews: [],
    GoodReviews: [],
    SelectedKYCAppID: AppID,
    WithdrawAddressReviews: [],
    SelectedWithdrawAddressAppID: AppID,
    WithdrawReviews: [],
    SelectedWithdrawAppID: AppID
  }
}

export {
  state,
  ReviewsState
}
