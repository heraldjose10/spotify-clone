import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import thunk from "redux-thunk";

import rootReducer from "./root-reducer";


const middlewares = [logger, thunk]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store

export const persistor = persistStore(store)