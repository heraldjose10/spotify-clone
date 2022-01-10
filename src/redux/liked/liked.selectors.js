import { createSelector } from "reselect";

const selectLiked = state => state.liked

export const selectLikedSongs = createSelector(
  [selectLiked],
  liked => liked.songs
)

export const selectLikedTracks = createSelector(
  [selectLikedSongs],
  songs => songs.tracks
)

export const selectLikedDetails = createSelector(
  [selectLikedSongs],
  songs => songs.details
)