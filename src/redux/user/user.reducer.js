import { userActionTypes } from "./user.types"

const INITIAL_STATE = {
  currentUser: {
    token: null,
    displayName: null,
    id: null,
    playlists: []
  }
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER: {
      return ({
        ...state,
        currentUser: action.payload
      })
    }
    case userActionTypes.LOGOUT_CURRENT_USER: {
      return ({
        ...state,
        currentUser: {
          token: null,
          displayName: null,
          id: null
        }
      })
    }
    case userActionTypes.SET_CURRENT_USER_PLAYLISTS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          playlists: action.payload
        }
      }
    }
    default:
      return state
  }
}

export default userReducer