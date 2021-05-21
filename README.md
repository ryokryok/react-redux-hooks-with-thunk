# react-redux-hooks sample with thunk

React-redux hooks sample with Redux-Thunk
(not-async and async state manage with Redux)

## demo site

here.

[https://react-redux-hooks-with-thunk.pages.dev/](https://react-redux-hooks-with-thunk.pages.dev/)

## scripts

powered by [Vite](https://vitejs.dev/)

### `yarn dev`

launch app with development mode.

`redux-logger` : enabled, check your browser console.

### `yarn build`

build app with production mode.

`redux-logger` : disenabled.

`redux-logger` will be removed on production mode.

```typescript
const middleware = import.meta.env.DEV ? [thunk, logger] : [thunk]
```

if you want to know it, check [Vite document](https://vitejs.dev/guide/env-and-mode.html).

### `yarn serve`

locally preview production build app.

## implement log

check `dev` branch history.

[dev branch commit history.](https://github.com/ryokryok/react-redux-hooks-with-thunk/commits/dev)