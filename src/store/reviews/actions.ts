import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import {
  GetKYCReviewsByOtherAppRequest,
  GetKYCReviewsByOtherAppResponse,
  GetGoodReviewsRequest,
  GetGoodReviewsResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
  GetWithdrawAddressReviewsByOtherAppRequest,
  GetWithdrawAddressReviewsByOtherAppResponse,
  GetWithdrawReviewsByOtherAppRequest,
  GetWithdrawReviewsByOtherAppResponse,
  UpdateUserWithdrawReviewForOtherAppRequest,
  UpdateUserWithdrawReviewForOtherAppResponse
} from './types'
import { ReviewsState } from './state'
import { ActionTree } from 'vuex'
import { AugmentedActionContext, RootState } from '../index'
import { ReviewMutations } from './mutations'
import { API } from './const'
import { doAction } from '../action'

interface ReviewActions {
  [ActionTypes.GetKYCReviewsByOtherApp]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: GetKYCReviewsByOtherAppRequest): void

  [ActionTypes.GetGoodReviews]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: GetGoodReviewsRequest): void

  [ActionTypes.UpdateReview]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: UpdateReviewRequest): void

  [ActionTypes.GetWithdrawAddressReviewsByOtherApp]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: GetWithdrawAddressReviewsByOtherAppRequest): void

  [ActionTypes.GetWithdrawReviewsByOtherApp]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: GetWithdrawReviewsByOtherAppRequest): void

  [ActionTypes.UpdateUserWithdrawReviewForOtherApp]({
    commit
  }: AugmentedActionContext<
  ReviewsState,
    RootState,
    ReviewMutations<ReviewsState>>,
    req: UpdateUserWithdrawReviewForOtherAppRequest): void
}

const actions: ActionTree<ReviewsState, RootState> = {
  [ActionTypes.GetKYCReviewsByOtherApp] ({ commit }, req: GetKYCReviewsByOtherAppRequest) {
    doAction<GetKYCReviewsByOtherAppRequest, GetKYCReviewsByOtherAppResponse>(
      commit,
      API.GET_KYC_REVIEWS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetKYCReviewsByOtherAppResponse): void => {
        commit(MutationTypes.SetKYCReviews, resp.Infos)
      })
  },

  [ActionTypes.GetGoodReviews] ({ commit }, req: GetGoodReviewsRequest) {
    doAction<GetGoodReviewsRequest, GetGoodReviewsResponse>(
      commit,
      API.GET_GOOD_REVIEWS,
      req,
      req.Message,
      (resp: GetGoodReviewsResponse): void => {
        commit(MutationTypes.SetGoodReviews, resp.Infos)
      })
  },

  [ActionTypes.UpdateReview] ({ commit }, req: UpdateReviewRequest) {
    doAction<UpdateReviewRequest, UpdateReviewResponse>(
      commit,
      API.UPDATE_REVIEW,
      req,
      req.Message,
      (resp: UpdateReviewResponse): void => {
        commit(MutationTypes.UpdateReview, resp.Info)
      })
  },

  [ActionTypes.GetWithdrawAddressReviewsByOtherApp] ({ commit }, req: GetWithdrawAddressReviewsByOtherAppRequest) {
    doAction<GetWithdrawAddressReviewsByOtherAppRequest, GetWithdrawAddressReviewsByOtherAppResponse>(
      commit,
      API.GET_WITHDRAW_ADDRESS_REVIEWS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetWithdrawAddressReviewsByOtherAppResponse): void => {
        commit(MutationTypes.SetWithdrawAddressReviews, resp.Infos)
      })
  },

  [ActionTypes.GetWithdrawReviewsByOtherApp] ({ commit }, req: GetWithdrawReviewsByOtherAppRequest) {
    doAction<GetWithdrawReviewsByOtherAppRequest, GetWithdrawReviewsByOtherAppResponse>(
      commit,
      API.GET_WITHDRAW_REVIEWS_BY_OTHER_APP,
      req,
      req.Message,
      (resp: GetWithdrawReviewsByOtherAppResponse): void => {
        commit(MutationTypes.SetWithdrawReviews, resp.Infos)
      })
  },

  [ActionTypes.UpdateUserWithdrawReviewForOtherApp] ({ commit }, req: UpdateUserWithdrawReviewForOtherAppRequest) {
    doAction<UpdateUserWithdrawReviewForOtherAppRequest, UpdateUserWithdrawReviewForOtherAppResponse>(
      commit,
      API.UPDATE_USER_WITHDRAW_REVIEW_FOR_OTHER_APP,
      req,
      req.Message,
      (resp: UpdateUserWithdrawReviewForOtherAppResponse): void => {
        commit(MutationTypes.SetWithdrawReviews, [resp.Info])
      })
  }
}

export {
  actions,
  ReviewActions
}
