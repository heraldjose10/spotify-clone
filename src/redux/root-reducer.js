import { combineReducers } from "redux";

import userReducer from "./user/user.reducer";
import playerReducer from "./player/player.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer
})

export default rootReducer