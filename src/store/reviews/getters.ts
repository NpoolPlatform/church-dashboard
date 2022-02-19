import { GetterTree } from 'vuex'
import { RootState } from '../index'
import { ReviewsState } from './state'
import { GoodReview, KYCReview, WithdrawAddressReview, WithdrawReview } from './types'

type ReviewGetters = {
  getKYCReviews (state: ReviewsState): Array<KYCReview>
  getKYCSelectedAppID (state: ReviewsState): string
  getGoodReviews (state: ReviewsState): Array<GoodReview>
  getWithdrawAddressReviews (state: ReviewsState): Array<WithdrawAddressReview>
  getWithdrawAddressSelectedAppID (state: ReviewsState): string
  getWithdrawReviews (state: ReviewsState): Array<WithdrawReview>
  getWithdrawSelectedAppID (state: ReviewsState): string
}

const getters: GetterTree<ReviewsState, RootState> & ReviewGetters = {
  getKYCReviews: (state: ReviewsState): Array<KYCReview> => state.KYCReviews,
  getKYCSelectedAppID: (state: ReviewsState): string => state.SelectedKYCAppID,
  getGoodReviews: (state: ReviewsState): Array<GoodReview> => state.GoodReviews,
  getWithdrawAddressReviews: (state: ReviewsState): Array<WithdrawAddressReview> => state.WithdrawAddressReviews,
  getWithdrawAddressSelectedAppID: (state: ReviewsState): string => state.SelectedWithdrawAddressAppID,
  getWithdrawReviews: (state: ReviewsState): Array<WithdrawReview> => state.WithdrawReviews,
  getWithdrawSelectedAppID: (state: ReviewsState): string => state.SelectedWithdrawAppID
}

export { ReviewGetters, getters }
