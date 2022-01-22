import { playlistActionTypes } from "./playlist.types"

export const setPlaylists = (playlists) => ({
  type: playlistActionTypes.SET_PLAYLISTS,
  payload: playlists
})

export const setViewingPlaylist = (viewingPlaylist) => ({
  type: playlistActionTypes.SET_VIEWING_PLAYLIST,
  payload: viewingPlaylist
})

export const removeViewingPlaylist = () => ({
  type: playlistActionTypes.REMOVE_VIEWING_PLAYLIST
})