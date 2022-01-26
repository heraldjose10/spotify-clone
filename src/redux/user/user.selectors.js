import { createSelector } from "reselect";

const selectUser = state => state.user

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
)

export const selectCurrentUserToken = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.token
)

export const selectCurrentUserDisplayName = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.displayName
)

export const selectCurrentUserId = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.id
)

export const selectCurrentUserPlaylists = createSelector(
  [selectCurrentUser],
  currentUser => currentUser.playlists
)