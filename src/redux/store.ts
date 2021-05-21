import { createStore, applyMiddleware } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { rootReducer } from "./reducer"

const middleware = import.meta.env.DEV ? [thunk, logger] : [thunk]

export const store = createStore(rootReducer, applyMiddleware(...middleware))
