import { createSelector } from "reselect";

const selectSearch = state => state.search

export const selectSearchTerm = createSelector(
  [selectSearch],
  search => search.searchTerm
)

export const selectReturnedArtists = createSelector(
  [selectSearch],
  search => search.returnedArtists
)

export const selectReturnedAlbums = createSelector(
  [selectSearch],
  search => search.returnedAlbums
)

export const selectReturnedPlaylists = createSelector(
  [selectSearch],
  search => search.returnedPlaylists
)