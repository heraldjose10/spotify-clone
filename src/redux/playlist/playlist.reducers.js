import { playlistActionTypes } from "./playlist.types"

const INITIAL_STATE = {
  playlists: [],
}

const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playlistActionTypes.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload
      }
    default:
      return state
  }
}

export default playlistReducer