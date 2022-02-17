import { AppID } from 'src/const/const'
import { KYCReview, GoodReview, WithdrawAddressReview } from './types'

interface ReviewsState {
  KYCReviews: Array<KYCReview>
  GoodReviews: Array<GoodReview>
  SelectedKYCAppID: string
  WithdrawAddressReviews: Array<WithdrawAddressReview>
  SelectedWithdrawAddressAppID: string
}

function state (): ReviewsState {
  return {
    KYCReviews: [],
    GoodReviews: [],
    SelectedKYCAppID: AppID,
    WithdrawAddressReviews: [],
    SelectedWithdrawAddressAppID: AppID
  }
}

export {
  state,
  ReviewsState
}
