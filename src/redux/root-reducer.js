import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";
import recommendationReducer from "./recommendation/recommendation.reducer";
import searchReducer from "./search/search.reducer";
import collectionReducer from "./collection/collection.reducer";


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'player'],
}

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  recommendation: recommendationReducer,
  search: searchReducer,
  collection: collectionReducer
})

export default persistReducer(persistConfig, rootReducer)