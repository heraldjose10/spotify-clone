import { createSelector } from "reselect";

const selectRecommendation = state => state.selectRecommendation

export const selectNewReleases = createSelector(
  [selectRecommendation],
  recommendation => recommendation.newReleases
)