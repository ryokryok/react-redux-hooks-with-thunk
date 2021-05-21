import { combineReducers } from "redux"
import { ApiAction, CounterAction } from "./action"

export type CounterState = {
  value: number
}

const initialCounterState: CounterState = {
  value: 0,
}

function counterReducer(
  prevState = initialCounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case "counter/increment":
      return { value: prevState.value + 1 }
    case "counter/decrement":
      return { value: prevState.value - 1 }
    case "counter/reset":
      return initialCounterState
    default:
      return prevState
  }
}

export type ApiState = {
  ip: string | null
}

const initialApiState: ApiState = {
  ip: null,
}

export function apiReducer(
  prevState = initialApiState,
  action: ApiAction
): ApiState {
  switch (action.type) {
    case "ipify/start":
      return initialApiState
    case "ipify/success":
      return action.response
    case "ipify/failed":
      return prevState
    default:
      return prevState
  }
}

export const rootReducer = combineReducers({
  counter: counterReducer,
  api: apiReducer,
})

export type AppState = ReturnType<typeof rootReducer>
