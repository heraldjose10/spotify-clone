import { createSelector } from "reselect";

const selectPlaylist = state => state.playlist

export const selectPlaylists = createSelector(
  [selectPlaylist],
  playlist => playlist.playlists
)