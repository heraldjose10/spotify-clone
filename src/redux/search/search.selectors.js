import { createSelector } from "reselect";

const selectSearch = state => state.search

export const selectSearchTerm = createSelector(
  [selectSearch],
  search => search.searchTerm
)

export const selectArtists = createSelector(
  [selectSearch],
  search => search.artists
)

export const selectArtistsItems = createSelector(
  [selectArtists],
  artists => artists.items
)

export const selectAlbums = createSelector(
  [selectSearch],
  search => search.albums
)

export const selectAlbumsItems = createSelector(
  [selectAlbums],
  albums => albums.items
)

export const selectPlaylists = createSelector(
  [selectSearch],
  search => search.playlists
)

export const selectPlaylistsItems = createSelector(
  [selectPlaylists],
  playlists => playlists.items
)

export const selectCategories = createSelector(
  [selectSearch],
  search => search.categories
)