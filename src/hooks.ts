import { Dispatch, useEffect } from "react"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { ApiAction, ApiResponse, CounterAction } from "./redux/action"
import { AppState } from "./redux/reducer"

const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

export async function apiClient(): Promise<ApiResponse> {
  const response = await fetch("https://api.ipify.org/?format=json")
  return response.json()
}

export function useFetchApi() {
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

export function useCounter() {
  const { value } = useTypedSelector((state) => state.counter)
  const countDispatch = useDispatch<Dispatch<CounterAction>>()
  const handleIncrement = () => countDispatch({ type: "counter/increment" })
  const handleDecrement = () => countDispatch({ type: "counter/decrement" })
  const handleReset = () => countDispatch({ type: "counter/reset" })

  return { value, handleIncrement, handleDecrement, handleReset }
}
