import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";
import playlistReducer from "./playlist/playlist.reducers";
import likedReducer from "./liked/liked.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  playlist: playlistReducer,
  liked: likedReducer
})

export default rootReducer