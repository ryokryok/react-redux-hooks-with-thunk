import { combineReducers, createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

export type CounterAction = {
  readonly type: "counter/increment" | "counter/decrement" | "counter/reset"
}

type CounterState = {
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

type ApiResponse = {
  ip: string
}

type ApiActionStart = {
  readonly type: "ipify/start"
}

type ApiActionSuccess = {
  readonly type: "ipify/success"
  response: ApiResponse
}

type ApiActionFailed = {
  readonly type: "ipify/failed"
}

export type ApiAction = ApiActionStart | ApiActionSuccess | ApiActionFailed

export const initialApiState: ApiResponse = {
  ip: "",
}

export function apiReducer(prevState = initialApiState, action: ApiAction) {
  switch (action.type) {
    case "ipify/start":
      return prevState
    case "ipify/success":
      return action.response
    case "ipify/failed":
      return prevState
    default:
      return prevState
  }
}

const rootReducer = combineReducers({
  counter: counterReducer,
  api: apiReducer,
})

export async function apiClient(): Promise<ApiResponse> {
  const response = await fetch("https://api.ipify.org/?format=json")
  return response.json()
}

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))
