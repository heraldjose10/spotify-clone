import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";

import rootReducer from "./root-reducer";


const middlewares = [logger]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store

export const persistor = persistStore(store)