import { recommendationActionTypes } from "./recommendation.types"

const INITIAL_STATE = {
  newReleases: []
}

const recommendationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recommendationActionTypes.SET_NEW_RELEASES:
      return {
        ...state,
        newReleases: action.payload
      }
    default:
      return state
  }
}

export default recommendationReducer