import axios from "axios"

import { API_ENDPOINT } from "../../endpoints"
import searchActionTypes from "./search.types"

export const setSearchTerm = (search_term) => ({
  type: searchActionTypes.SET_SEARCH_TERM,
  payload: search_term
})

export const fetchCategoriesStart = () => ({
  type: searchActionTypes.FETCH_CATEGORIES_START
})

export const fetchCategoriesError = error => ({
  type: searchActionTypes.FETCH_CATEGORIES_ERROR,
  payload: error
})

export const fetchCategoriesSuccess = categories => ({
  type: searchActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: categories
})

export const setReturnedTracks = (tracks) => ({
  type: searchActionTypes.SET_RETURNED_TRACKS,
  payload: tracks
})

export const fetchAlbumsStart = () => ({
  type: searchActionTypes.FETCH_ALBUMS_START
})

export const fetchAlbumsSuccess = (albums) => ({
  type: searchActionTypes.FETCH_ALBUMS_SUCCESS,
  payload: albums
})

export const fetchAlbumsError = (error) => ({
  type: searchActionTypes.FETCH_ALBUMS_ERROR,
  payload: error
})

export const fetchPlaylistsStart = () => ({
  type: searchActionTypes.FETCH_PLAYLISTS_START
})

export const fetchPlaylistsSuccess = playlists => ({
  type: searchActionTypes.FETCH_PLAYLISTS_SUCCESS,
  payload: playlists
})

export const fetchPlaylistsError = error => ({
  type: searchActionTypes.FETCH_PLAYLISTS_ERROR,
  payload: error
})

export const fetchArtistsStart = () => ({
  type: searchActionTypes.FETCH_ARTISTS_START
})

export const fetchArtistsSuccess = artists => ({
  type: searchActionTypes.FETCH_ARTISTS_SUCCESS,
  payload: artists
})

export const fetchArtistsError = error => ({
  type: searchActionTypes.FETCH_ARTISTS_ERROR,
  payload: error
})

export const fetchSearchResulstsAsync = ({ token, searchTerm, type }) => {

  return async dispatch => {

    if (type === 'artist') {
      dispatch(fetchArtistsStart())
    }
    else if (type === 'album') {
      dispatch(fetchAlbumsStart())
    }
    else if (type === 'playlist') {
      dispatch(fetchPlaylistsStart())
    }

    const headers = { Authorization: `Bearer ${token}` }

    try {
      let response = await axios({
        method: 'get',
        headers: headers,
        url: `${API_ENDPOINT}search?q=${searchTerm}&type=${type}`
      })
      if (type === 'artist') {
        dispatch(fetchArtistsSuccess(response.data.artists.items))
      }
      else if (type === 'album') {
        dispatch(fetchAlbumsSuccess(response.data.albums.items))
      }
      else if (type === 'playlist') {
        dispatch(fetchPlaylistsSuccess(response.data.playlists.items))
      }
    } catch (error) {
      if (type === 'artist') {
        dispatch(fetchArtistsError(error))
      }
      else if (type === 'album') {
        dispatch(fetchAlbumsError(error))
      }
      else if (type === 'playlist') {
        dispatch(fetchPlaylistsError(error))
      }
    }
  }
}

export const fetchCategoriesAsync = ({ token }) => {
  return async dispatch => {
    dispatch(fetchCategoriesStart())
    try {
      const response = await axios({
        method: 'get',
        headers: { Authorization: `Bearer ${token}` },
        url: `${API_ENDPOINT}browse/categories`
      })
      dispatch(fetchCategoriesSuccess(response.data.categories.items))
    } catch (error) {
      dispatch(fetchCategoriesError(error))
    }
  }
}