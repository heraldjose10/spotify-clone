import { playerActionTypes } from "./player.types"

const INITIAL_STATE = {
  recentTracks: [],
  isPlaying: false,
  nowPlaying: null,
  playQueue: []
}

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playerActionTypes.SET_RECENT_TRACKS:
      return {
        ...state,
        recentTracks: action.payload
      }
    case playerActionTypes.PLAY:
      return {
        ...state,
        isPlaying: action.payload
      }
    case playerActionTypes.SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.payload
      }
    default:
      return state
  }
}

export default playerReducer