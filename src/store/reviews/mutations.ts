import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { ReviewsState } from './state'
import { GoodReview, KYCReview, Review, WithdrawAddressReview, WithdrawReview } from './types'

type ReviewMutations<S = ReviewsState> = {
  [MutationTypes.SetKYCReviews] (state: S, payload: Array<KYCReview>): void
  [MutationTypes.SetKYCSelectedAppID] (state: S, payload: string): void
  [MutationTypes.SetGoodReviews] (state: S, payload: Array<GoodReview>): void
  [MutationTypes.UpdateReview] (state: S, payload: Review): void
  [MutationTypes.SetWithdrawAddressReviews] (state: S, payload: Array<WithdrawAddressReview>): void
  [MutationTypes.SetWithdrawAddressSelectedAppID] (state: S, payload: string): void
  [MutationTypes.SetWithdrawReviews] (state: S, payload: Array<WithdrawReview>): void
  [MutationTypes.SetWithdrawSelectedAppID] (state: S, payload: string): void
}

const mutations: MutationTree<ReviewsState> & ReviewMutations = {
  [MutationTypes.SetKYCReviews] (state: ReviewsState, payload: Array<KYCReview>) {
    state.KYCReviews = payload
  },
  [MutationTypes.SetKYCSelectedAppID] (state: ReviewsState, payload: string): void {
    state.SelectedKYCAppID = payload
  },
  [MutationTypes.SetGoodReviews] (state: ReviewsState, payload: Array<GoodReview>): void {
    state.GoodReviews = payload
  },
  [MutationTypes.UpdateReview] (state: ReviewsState, payload: Review): void {
    state.GoodReviews.forEach((review) => {
      if (review.Review.ID === payload.ID) {
        review.Review = payload
      }
    })
    state.KYCReviews.forEach((review) => {
      if (review.Review.ID === payload.ID) {
        review.Review = payload
      }
    })
    state.WithdrawAddressReviews.forEach((review) => {
      if (review.Review.ID === payload.ID) {
        review.Review = payload
      }
    })
  },
  [MutationTypes.SetWithdrawAddressReviews] (state: ReviewsState, payload: Array<WithdrawAddressReview>): void {
    state.WithdrawAddressReviews = payload
  },
  [MutationTypes.SetWithdrawAddressSelectedAppID] (state: ReviewsState, payload: string): void {
    state.SelectedWithdrawAddressAppID = payload
  },
  [MutationTypes.SetWithdrawReviews] (state: ReviewsState, payload: Array<WithdrawReview>): void {
    for (let j = 0; j < payload.length; j++) {
      let inserted = false
      for (let i = 0; i < state.WithdrawReviews.length; i++) {
        if (payload[j].Review.ID === state.WithdrawReviews[i].Review.ID) {
          state.WithdrawReviews.splice(i, 1, payload[j])
          inserted = true
          break
        }
      }
      if (!inserted) {
        state.WithdrawReviews.push(payload[j])
      }
    }
    state.WithdrawReviews = payload
  },
  [MutationTypes.SetWithdrawSelectedAppID] (state: ReviewsState, payload: string): void {
    state.SelectedWithdrawAppID = payload
  }
}

export { ReviewMutations, mutations }
