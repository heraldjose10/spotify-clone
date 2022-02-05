import { playerActionTypes } from "./player.types"

const INITIAL_STATE = {
  recentTracks: {
    items: [],
    isFetching: false,
    error: null
  },
  isPlaying: false,
  nowPlaying: null,
  playQueue: [],
  isFetching: false,
  error: null
}

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case playerActionTypes.FETCH_RECENT_TRACKS_ERROR:
      return {
        ...state,
        recentTracks: {
          ...state.recentTracks,
          error: action.payload
        }
      }
    case playerActionTypes.FETCH_RECENT_TRACKS_START:
      return {
        ...state,
        recentTracks: {
          ...state.recentTracks,
          isFetching: true
        }
      }
    case playerActionTypes.FETCH_RECENT_TRACKS_SUCCESS:
      return {
        ...state,
        recentTracks: {
          ...state.recentTracks,
          items: action.payload
        }
      }

    case playerActionTypes.PLAY:
      return {
        ...state,
        isPlaying: true
      }
    case playerActionTypes.PAUSE:
      return {
        ...state,
        isPlaying: false
      }

    case playerActionTypes.SET_NOW_PLAYING:
      return {
        ...state,
        nowPlaying: action.payload
      }
      
    case playerActionTypes.CLEAR_PLAYER:
      return {
        ...INITIAL_STATE
      }

    default:
      return state
  }
}

export default playerReducer