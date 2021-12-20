import { likedActionTypes } from "./liked.types"

const INITIAL_STATE = {
  songs: {
    tracks: [],
    details: {}
  }
}

const likedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case likedActionTypes.SET_LIKED_SONGS: {
      return {
        ...state,
        songs: action.payload
      }
    }
    default:
      return state
  }
}

export default likedReducer