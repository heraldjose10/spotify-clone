import { createSelector } from "reselect";

const selectRecommendation = state => state.recommendation

export const selectNewReleases = createSelector(
  [selectRecommendation],
  recommendation => recommendation.newReleases
)