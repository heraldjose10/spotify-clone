import { playerActionTypes } from "./player.types"

const INITIAL_STATE = {
  recentTracks: []
}

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playerActionTypes.SET_RECENT_TRACKS:
      return {
        ...state,
        recentTracks: action.payload
      }
    default:
      return state
  }
}

export default playerReducer