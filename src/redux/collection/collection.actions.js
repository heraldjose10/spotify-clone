import axios from "axios";

import { collectionActionTypes } from "./collection.types";
import { API_ENDPOINT } from "../../endpoints";

export const removeCOllection = () => ({
  type: collectionActionTypes.REMOVE_COLLECTION
})

export const fetchCollectionSuccess = (collection) => ({
  type: collectionActionTypes.FETCH_COLLECTION_SUCCESS,
  payload: collection
})

export const fetchCollectionFailure = (error) => ({
  type: collectionActionTypes.FETCH_COLLECTION_ERROR,
  payload: error
})

export const fetchCollectionStart = () => ({
  type: collectionActionTypes.FETCH_COLLECTION_START
})

export const setNext = (next) => ({
  type: collectionActionTypes.SET_NEXT,
  payload: next
})

export const updateCollectionItems = (items) => ({
  type: collectionActionTypes.UPDATE_COLLECTION_ITEMS,
  payload: items
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
          fetchCollectionSuccess({
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
          fetchCollectionSuccess({
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
      collection.tracks.next ? dispatch(setNext(collection.tracks.next)) : dispatch(setNext(null))
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
        fetchCollectionSuccess({
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
      response.data.next ? dispatch(setNext(response.data.next)) : dispatch(setNext(null))
    } catch (error) {
      dispatch(fetchCollectionFailure(error))
    }
  }
}

export const updateCollectionItemsAsync = ({ token, next }) => {
  return async dispatch => {
    dispatch(fetchCollectionStart())
    try {
      let response = await axios({
        method: 'GET',
        url: next,
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(updateCollectionItems(response.data.items))
      response.data.next ? dispatch(setNext(response.data.next)) : dispatch(setNext(null))
    } catch (error) {
      dispatch(fetchCollectionFailure(error))
    }
  }
}