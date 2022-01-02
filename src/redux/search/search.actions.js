import searchActionTypes from "./search.types"

export const setSearchTerm = (search_term) => ({
  type: searchActionTypes.SET_SEARCH_TERM,
  payload: search_term
})

export const setReturnedTracks = (tracks) => ({
  type: searchActionTypes.SET_RETURNED_TRACKS,
  payload: tracks
})

export const setReturnedArtists = (artists) => ({
  type: searchActionTypes.SET_RETURNED_ARTISTS,
  payload: artists
})