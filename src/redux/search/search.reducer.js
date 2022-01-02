import searchActionTypes from "./search.types"

const INITIAL_STATE = {
  searchTerm: '',
  returnedArtists: [],
  returnedTrackes: []
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
    default: {
      return state
    }
  }
}

export default searchReducer