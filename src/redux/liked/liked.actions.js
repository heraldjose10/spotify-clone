import { likedActionTypes } from "./liked.types";

export const setLikedSongs = (likedSongs) => ({
  type: likedActionTypes.SET_LIKED_SONGS,
  payload: likedSongs
})