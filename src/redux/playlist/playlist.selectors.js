import { createSelector } from "reselect";

const selectPlaylist = state => state.playlist

export const selectViewingPlaylist = createSelector(
  [selectPlaylist],
  playlist => playlist.viewingPlaylist
)

export const selectViewingPlaylistTracks = createSelector(
  [selectViewingPlaylist],
  viewingPlaylist => viewingPlaylist.tracks
)

export const selectViewingPlaylistDetails = createSelector(
  [selectViewingPlaylist],
  viewingPlaylist => viewingPlaylist.details
)

export const selectPlaylists = createSelector(
  [selectPlaylist],
  playlist => playlist.playlists
)