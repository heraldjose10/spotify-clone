import { userActionTypes } from "./user.types"

const INITIAL_STATE = {
  currentUser: {
    token: null,
    displayName: null,
    id: null,
    isFetching: false,
    error: null
  },
  playlists: {
    items: [],
    isFetching: false,
    error: null
  },
  loggedAt: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case userActionTypes.FETCH_CURRENT_USER_SUCCESS: {
      return ({
        ...state,
        currentUser: {
          ...action.payload,
          isFetching: false,
          error: null,
        },
        loggedAt: new Date()
      })
    }
    case userActionTypes.FETCH_CURRENT_USER_START: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isFetching: true
        }
      }
    }
    case userActionTypes.FETCH_CURRENT_USER_ERROR: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isFetching: false,
          error: action.payload
        }
      }
    }

    case userActionTypes.LOGOUT_CURRENT_USER: {
      return {
        ...INITIAL_STATE
      }
    }

    case userActionTypes.FETCH_USER_PLAYLISTS_SUCCESS: {
      return {
        ...state,
        playlists: {
          items: action.payload,
          isFetching: false,
          error: null
        }
      }
    }
    case userActionTypes.FETCH_USER_PLAYLISTS_START: {
      return {
        ...state,
        playlists: {
          ...state.playlists,
          isFetching: true
        }
      }
    }
    case userActionTypes.FETCH_USER_PLAYLISTS_ERROR: {
      return {
        ...state,
        playlists: {
          items: [],
          isFetching: false,
          error: action.payload
        }
      }
    }
    
    default:
      return state
  }
}

export default userReducer