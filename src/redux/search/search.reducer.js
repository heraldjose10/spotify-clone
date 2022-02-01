import searchActionTypes from "./search.types"

const INITIAL_STATE = {
  searchTerm: '',
  artists: {
    isFetching: false,
    error: null,
    items: []
  },
  returnedTrackes: {
    items: [],
    isFetching: false,
    error: null
  },
  albums: {
    items: [],
    isFetching: false,
    error: null
  },
  playlists: {
    items: [],
    isFetching: false,
    error: null
  },
  categories: [],
  isFetching: false,
  error: null
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

    case searchActionTypes.FETCH_CATEGORIES_START: {
      return {
        ...state,
        isFetching: true
      }
    }
    case searchActionTypes.FETCH_CATEGORIES_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case searchActionTypes.FETCH_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload,
        isFetching: false
      }
    }

    case searchActionTypes.FETCH_ARTISTS_START: {
      return {
        ...state,
        artists: {
          ...state.artists,
          isFetching: true
        }
      }
    }
    case searchActionTypes.FETCH_ARTISTS_ERROR: {
      return {
        ...state,
        artists: {
          ...state.artists,
          error: action.payload
        }
      }
    }
    case searchActionTypes.FETCH_ARTISTS_SUCCESS: {
      return {
        ...state,
        artists: {
          ...state.artists,
          items: action.payload,
          isFetching: false
        }
      }
    }

    case searchActionTypes.FETCH_ALBUMS_START: {
      return {
        ...state,
        albums: {
          ...state.albums,
          isFetching: true
        }
      }
    }
    case searchActionTypes.FETCH_ALBUMS_ERROR: {
      return {
        ...state,
        albums: {
          ...state.albums,
          error: action.payload
        }
      }
    }
    case searchActionTypes.FETCH_ALBUMS_SUCCESS: {
      return {
        ...state,
        albums: {
          ...state.albums,
          items: action.payload,
          isFetching: false
        }
      }
    }

    case searchActionTypes.FETCH_PLAYLISTS_START: {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          isFetching: true
        }
      }
    }
    case searchActionTypes.FETCH_PLAYLISTS_ERROR: {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          error: action.payload
        }
      }
    }
    case searchActionTypes.FETCH_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          items: action.payload,
          isFetching: false
        }
      }
    }

    case searchActionTypes.CLEAR_SEARCH: {
      return {
        ...INITIAL_STATE
      }
    }

    default: {
      return state
    }
  }
}

export default searchReducer