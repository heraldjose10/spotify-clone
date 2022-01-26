import { userActionTypes } from "./user.types"

export const setCurrentUser = (user) => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user
})

export const logoutCurrentUser = () => ({
  type: userActionTypes.LOGOUT_CURRENT_USER,
})

export const setCurrentUserPlaylists = (playlists) => ({
  type: userActionTypes.SET_CURRENT_USER_PLAYLISTS,
  payload: playlists
})