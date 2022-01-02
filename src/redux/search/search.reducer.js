import searchActionTypes from "./search.types"

const INITIAL_STATE = {
  searchTerm: '',
  returnedArtists: [],
  returnedTrackes: [],
  returnedAlbums: [],
  returnedPlaylists: []
}

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case searchActionTypes.SET_SEARCH_TERM: {
      return {
        ...state,
        searchTerm: action.payload
      }
    }
    case searchActionTypes.SET_RETURNED_TRACKS: {
      return {
        ...state,
        returnedTrackes: action.payload
      }
    }
    case searchActionTypes.SET_RETURNED_ARTISTS: {
      return {
        ...state,
        returnedArtists: action.payload
      }
    }
    case searchActionTypes.SET_RETURNED_ALBUMS: {
      return {
        ...state,
        returnedAlbums: action.payload
      }
    }
    case searchActionTypes.SET_RETURNED_PLAYLISTS: {
      return {
        ...state,
        returnedPlaylists: action.payload
      }
    }
    default: {
      return state
    }
  }
}

export default searchReducer