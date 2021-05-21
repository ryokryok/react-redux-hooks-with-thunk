import React, { Dispatch, useEffect } from "react"
import "./App.css"

import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux"
import { ApiResponse, ApiAction, CounterAction } from "./redux/action"
import { AppState } from "./redux/reducer"

export async function apiClient(): Promise<ApiResponse> {
  const response = await fetch("https://api.ipify.org/?format=json")
  return response.json()
}

const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

function useFetchApi() {
  const { ip } = useTypedSelector((state) => state.api)
  const apiDispatch = useDispatch<Dispatch<ApiAction>>()

  const fetchAction = async () => {
    apiDispatch({ type: "ipify/start" })
    try {
      const response = await apiClient()
      apiDispatch({ type: "ipify/success", response: response })
    } catch (error) {
      apiDispatch({ type: "ipify/failed" })
    }
  }
  useEffect(() => {
    fetchAction()
  }, [])

  return { ip, fetchAction }
}

function App() {
  const { value } = useTypedSelector((state) => state.counter)
  const countDispatch = useDispatch<Dispatch<CounterAction>>()
  const handleIncrement = () => countDispatch({ type: "counter/increment" })
  const handleDecrement = () => countDispatch({ type: "counter/decrement" })
  const handleReset = () => countDispatch({ type: "counter/reset" })
  const { ip, fetchAction } = useFetchApi()

  return (
    <div className="App">
      <h1>Hello Vite + React!</h1>
      <div>
        <h2>Count: {value}</h2>
        <MemoizedButton buttonAction={handleIncrement} displayText={"+"} />
        <MemoizedButton buttonAction={handleDecrement} displayText={"-"} />
        <MemoizedButton buttonAction={handleReset} displayText={"reset"} />
      </div>
      <div>
        <h2>IP Address: {ip ? ip : "loading..."}</h2>
        <MemoizedButton
          buttonAction={fetchAction}
          displayText={"check ip address"}
        />
      </div>
    </div>
  )
}

type ButtonProps = {
  buttonAction: () => void
  displayText: string
}

function ActionButton({ buttonAction, displayText }: ButtonProps) {
  return <button onClick={buttonAction}>{displayText}</button>
}

const MemoizedButton = React.memo(ActionButton)

export default App
