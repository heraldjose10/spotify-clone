import {playerActionTypes} from './player.types'

export const setRecentTracks = (tracks) => ({
  type: playerActionTypes.SET_RECENT_TRACKS,
  payload: tracks
})