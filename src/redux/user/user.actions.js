import axios from "axios"

import { userActionTypes } from "./user.types"
import { API_ENDPOINT } from "../../endpoints"

export const fetchCurrentUserStart = () => ({
  type: userActionTypes.FETCH_CURRENT_USER_START
})

export const fetchCurrentUserSuccess = (user) => ({
  type: userActionTypes.FETCH_CURRENT_USER_SUCCESS,
  payload: user
})

export const fetchCurrentUserFailure = (error) => ({
  type: userActionTypes.FETCH_CURRENT_USER_ERROR,
  payload: error
})

export const fetchCurrentUserAsync = (token) => {
  return async dispatch => {
    dispatch(fetchCurrentUserStart())
    try {
      let response = await axios(`${API_ENDPOINT}me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(fetchCurrentUserSuccess({
        token: token,
        displayName: response.data.display_name,
        id: response.data.id
      }))
    } catch (error) {
      dispatch(fetchCurrentUserFailure(error))
    }
  }
}

export const logoutCurrentUser = () => ({
  type: userActionTypes.LOGOUT_CURRENT_USER,
})

export const fetchUserPlaylistsStart = () => ({
  type: userActionTypes.FETCH_USER_PLAYLISTS_START
})

export const fetchUserPlaylistsSuccess = (playlists) => ({
  type: userActionTypes.FETCH_USER_PLAYLISTS_SUCCESS,
  payload: playlists
})

export const fetchUserPlaylistsFailure = (error) => ({
  type: userActionTypes.FETCH_USER_PLAYLISTS_ERROR,
  payload: error
})

export const fetchUserPlaylistsStartAsync = ({ token, userId }) => {
  return async dispatch => {
    dispatch(fetchUserPlaylistsStart())
    try {
      let response = await axios({
        method: 'get',
        url: `${API_ENDPOINT}users/${userId}/playlists`,
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(fetchUserPlaylistsSuccess(response.data.items))
    } catch (error) {
      dispatch(fetchUserPlaylistsFailure(error))
    }
  }
}