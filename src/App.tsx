import React from "react"
import "./App.css"
import { useCounter, useFetchApi } from "./hooks"

function App() {
  const { value, handleIncrement, handleDecrement, handleReset } = useCounter()
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
