import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";
import playlistReducer from "./playlist/playlist.reducers";
import likedReducer from "./liked/liked.reducer";
import recommendationReducer from "./recommendation/recommendation.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  playlist: playlistReducer,
  liked: likedReducer,
  recommendation: recommendationReducer
})

export default rootReducer