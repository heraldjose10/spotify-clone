import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";
import playlistReducer from "./playlist/playlist.reducers";
import likedReducer from "./liked/liked.reducer";
import recommendationReducer from "./recommendation/recommendation.reducer";
import searchReducer from "./search/search.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  playlist: playlistReducer,
  liked: likedReducer,
  recommendation: recommendationReducer,
  search: searchReducer
})

export default rootReducer