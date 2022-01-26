import { collectionActionTypes } from "./collection.types";

export const setAlbum = (album) => ({
  type: collectionActionTypes.SET_ALBUM,
  payload: album
})

export const removeAlbum = () => ({
  type: collectionActionTypes.REMOVE_ALBUM
})

export const setPlaylist = (playlist) => ({
  type: collectionActionTypes.SET_PLAYLIST,
  payload: playlist
})

export const removePlaylist = () => ({
  type: collectionActionTypes.REMOVE_PLAYLIST
})