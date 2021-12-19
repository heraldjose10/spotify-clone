import { playlistActionTypes } from "./playlist.types"

export const setPlaylists = (playlists) => ({
  type: playlistActionTypes.SET_PLAYLISTS,
  payload: playlists
})