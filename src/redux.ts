import { combineReducers, createStore } from "redux"

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

const rootReducer = combineReducers({
  counter: counterReducer,
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)
