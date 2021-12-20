import { recommendationActionTypes } from "./recommendation.types"

export const setNewReleases = (newReleases) => ({
  type: recommendationActionTypes.SET_NEW_RELEASES,
  payload: newReleases
})