import {recentsActionTypes} from './player.types'

export const setRecentTracks = (tracks) => ({
  type: recentsActionTypes.SET_RECENT_TRACKS,
  payload: tracks
})