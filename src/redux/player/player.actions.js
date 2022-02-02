import axios from 'axios'

import { API_ENDPOINT } from '../../endpoints'
import { playerActionTypes } from './player.types'

export const fetchRecentTracksStart = () => ({
  type: playerActionTypes.FETCH_RECENT_TRACKS_START
})

export const fetchRecentTracksSuccess = (tracks) => ({
  type: playerActionTypes.FETCH_RECENT_TRACKS_SUCCESS,
  payload: tracks
})

export const fetchRecentTracksError = (error) => ({
  type: playerActionTypes.FETCH_RECENT_TRACKS_ERROR,
  payload: error
})

export const fetchRecentTracksStartAsync = ({ token }) => {
  return async dispatch => {
    dispatch(fetchRecentTracksStart())
    try {
      let response = await axios.get(`${API_ENDPOINT}me/player/recently-played`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { limit: 8 }
      })
      dispatch(fetchRecentTracksSuccess(response.data.items))
    } catch (error) {
      dispatch(fetchRecentTracksError(error))
    }
  }
}

export const playTrack = () => ({
  type: playerActionTypes.PLAY
})

export const setNowPlaying = track => ({
  type: playerActionTypes.SET_NOW_PLAYING,
  payload: track
})

export const pauseTrack = () => ({
  type: playerActionTypes.PAUSE
})