import { collectionActionTypes } from './collection.types'

const INITIAL_STATE = {
  playlist: {
    items: [],
    details: {}
  },
  album: {
    items: [],
    details: {}
  }
}

const collectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case collectionActionTypes.SET_ALBUM:
      return {
        ...state,
        album: action.payload
      }
    case collectionActionTypes.REMOVE_ALBUM:
      return {
        ...state,
        album: {
          items: [],
          details: {}
        }
      }
    case collectionActionTypes.SET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload
      }
    case collectionActionTypes.REMOVE_PLAYLIST:
      return {
        ...state,
        playlist: {
          items: [],
          details: {}
        }
      }
    default:
      return {
        ...state
      }
  }
}

export default collectionReducer