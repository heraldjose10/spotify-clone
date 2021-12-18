import { recentsActionTypes } from "./player.types"

const INITIAL_STATE = {
  recentTracks: []
}

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recentsActionTypes.SET_RECENT_TRACKS:
      return {
        ...state,
        recentTracks: action.payload
      }
    default:
      return state
  }
}

export default playerReducer