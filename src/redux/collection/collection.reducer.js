import { collectionActionTypes } from './collection.types'

const INITIAL_STATE = {
  items: [],
  details: {},
  isFetching: false,
  error: null,
  next: null
}

const collectionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case collectionActionTypes.FETCH_COLLECTION_START:
      return {
        ...state,
        isFetching: true,
        error: null
      }

    case collectionActionTypes.FETCH_COLLECTION_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      }

    case collectionActionTypes.REMOVE_COLLECTION:
      return {
        ...INITIAL_STATE
      }

    case collectionActionTypes.FETCH_COLLECTION_SUCCESS:
      return {
        ...state,
        details: action.payload.details,
        items: action.payload.items,
        isFetching: false
      }

    case collectionActionTypes.SET_NEXT:
      return {
        ...state,
        next: action.payload
      }

    case collectionActionTypes.UPDATE_COLLECTION_ITEMS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        isFetching: false
      }

    default:
      return {
        ...state
      }
  }
}

export default collectionReducer