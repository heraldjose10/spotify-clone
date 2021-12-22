import { playerActionTypes } from './player.types'

export const setRecentTracks = (tracks) => ({
  type: playerActionTypes.SET_RECENT_TRACKS,
  payload: tracks
})

export const playTrack = (play = true) => ({
  type: playerActionTypes.PLAY,
  payload: play
})

export const setNowPlaying = track => ({
  type: playerActionTypes.SET_NOW_PLAYING,
  payload: track
})