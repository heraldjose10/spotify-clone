import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";
import playlistReducer from "./playlist/playlist.reducers";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  playlist: playlistReducer
})

export default rootReducer