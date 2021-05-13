import React, { Dispatch } from "react"
import "./App.css"

import { useSelector, useDispatch } from "react-redux"
import { CounterAction, AppState } from "./redux"

const { value } = useSelector((state: AppState) => state.counter)
const countDispatch = useDispatch<Dispatch<CounterAction>>()
const handleIncrement = () => countDispatch({ type: "counter/increment" })
const handleDecrement = () => countDispatch({ type: "counter/decrement" })
const handleReset = () => countDispatch({ type: "counter/reset" })

function App() {
  return (
    <div className="App">
      <p>Hello Vite + React!</p>
      <div>
        <h2>Count: {value}</h2>
        <button onClick={handleIncrement}>+</button>
        <button onClick={handleDecrement}>-</button>
        <button onClick={handleReset}>reset</button>
      </div>
    </div>
  )
}

export default App
