import { collectionActionTypes } from './collection.types'

const INITIAL_STATE = {
  playlist: {
    items: [],
    details: {},
  },
  album: {
    items: [],
    details: {}
  },
  likedTracks: {
    items: [],
    details: {}
  },
  isFetching: false,
  error: null
}

const collectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case collectionActionTypes.FETCH_COLLECTION_START:
      return {
        ...state,
        isFetching: true
      }

    case collectionActionTypes.FETCH_COLLECTION_ERROR:
      return {
        ...state,
        error: action.payload
      }

    case collectionActionTypes.REMOVE_ALBUM:
      return {
        ...state,
        album: {
          items: [],
          details: {}
        }
      }
    case collectionActionTypes.REMOVE_PLAYLIST:
      return {
        ...state,
        playlist: {
          items: [],
          details: {}
        }
      }
    case collectionActionTypes.REMOVE_LIKED_TRACKS:
      return {
        ...state,
        likedTracks: {
          items: [],
          details: {}
        }
      }

    case collectionActionTypes.FETCH_ALBUM_SUCCESS:
      return {
        ...state,
        album: action.payload
      }
    case collectionActionTypes.FETCH_PLAYLIST_SUCCESS:
      return {
        ...state,
        playlist: action.payload
      }
    case collectionActionTypes.FETCH_LIKED_TRACKS_SUCCESS:
      return {
        ...state,
        likedTracks: action.payload
      }

    default:
      return {
        ...state
      }
  }
}

export default collectionReducer