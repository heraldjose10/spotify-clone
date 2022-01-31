import axios from "axios";

import { collectionActionTypes } from "./collection.types";
import { API_ENDPOINT } from "../../endpoints";

export const removeAlbum = () => ({
  type: collectionActionTypes.REMOVE_ALBUM
})

export const removePlaylist = () => ({
  type: collectionActionTypes.REMOVE_PLAYLIST
})

export const removeLikedTracks = () => ({
  type: collectionActionTypes.REMOVE_LIKED_TRACKS
})

export const fetchAlbumSuccess = album => ({
  type: collectionActionTypes.FETCH_ALBUM_SUCCESS,
  payload: album
})

export const fetchPlaylistSuccess = (playlist) => ({
  type: collectionActionTypes.FETCH_PLAYLIST_SUCCESS,
  payload: playlist
})

export const fetchLikedTracksSuccess = (likedTracks) => ({
  type: collectionActionTypes.FETCH_LIKED_TRACKS_SUCCESS,
  payload: likedTracks
})

export const fetchCollectionFailure = (error) => ({
  type: collectionActionTypes.FETCH_COLLECTION_ERROR,
  payload: error
})

export const fetchCollectionStart = () => ({
  type: collectionActionTypes.FETCH_COLLECTION_START
})

export const fetchCollectionAsync = ({ token, collectionType, id }) => {
  return async dispatch => {
    dispatch(fetchCollectionStart())
    try {
      const response = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${API_ENDPOINT}${collectionType}s/${id}`
      })
      const collection = response.data
      if (collectionType === 'album') {
        dispatch(
          fetchAlbumSuccess({
            items: collection.tracks.items,
            details: {
              albumArtURL: collection.images.length > 0 ? collection.images[0].url : null,
              type: collection.type,
              name: collection.name,
              artists: collection.artists,
              total: collection.tracks.total,
              releaseDate: collection.release_date
            }
          })
        )
      }
      else if (collectionType === 'playlist') {
        dispatch(
          fetchPlaylistSuccess({
            items: collection.tracks.items,
            details: {
              id: collection.id,
              name: collection.name,
              albumArtURL: collection.images[0].url,
              createdBy: collection.owner.display_name,
              total: collection.tracks.total,
              description: collection.description,
              followers: collection.followers.total,
              type: collection.type
            }
          })
        )
      }
    } catch (error) {
      dispatch(fetchCollectionFailure(error))
    }
  }
}

export const fetchLikedTracksAsync = ({ token, displayName }) => {
  return async dispatch => {
    dispatch(fetchCollectionStart())
    try {
      const response = await axios({
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`
        },
        url: `${API_ENDPOINT}me/tracks/`
      })
      dispatch(
        fetchLikedTracksSuccess({
          items: response.data.items,
          details: {
            name: 'Liked Songs',
            total: response.data.total,
            type: 'playlist',
            totalSongs: response.data.total,
            imageUrl: 'liked',
            createdBy: displayName
          }
        })
      )
    } catch (error) {
      dispatch(fetchCollectionFailure(error))
    }
  }
}