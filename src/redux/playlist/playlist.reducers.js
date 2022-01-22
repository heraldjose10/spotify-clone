import { playlistActionTypes } from "./playlist.types"

const INITIAL_STATE = {
  playlists: [],
  viewingPlaylist: {
    details: {},
    tracks: []
  }
}

const playlistReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case playlistActionTypes.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload
      }
    case playlistActionTypes.SET_VIEWING_PLAYLIST:
      return {
        ...state,
        viewingPlaylist: action.payload
      }
    case playlistActionTypes.REMOVE_VIEWING_PLAYLIST:
      return {
        ...state,
        viewingPlaylist: {
          details: {},
          tracks: []
        }
      }
    default:
      return state
  }
}

export default playlistReducer