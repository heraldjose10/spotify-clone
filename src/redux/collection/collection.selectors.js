import { createSelector } from "reselect";

const selectCollection = (state) => state.collection

export const selectAlbum = createSelector(
  [selectCollection],
  collection => collection.album
)

export const selectPlaylist = createSelector(
  [selectCollection],
  collection => collection.playlist
)