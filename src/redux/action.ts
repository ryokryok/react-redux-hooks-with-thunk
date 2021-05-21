export type CounterAction = {
  readonly type: "counter/increment" | "counter/decrement" | "counter/reset"
}

export type ApiResponse = {
  ip: string | null
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
