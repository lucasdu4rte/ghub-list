import { githubApi } from '@/services/githubApi'
import { repositoryModalSlice } from '@/slices/selectRepository.slice'

import { configureStore } from '@reduxjs/toolkit'

export const makeStore = () => {
  return configureStore({
    reducer: {
      [githubApi.reducerPath]: githubApi.reducer,
      [repositoryModalSlice.reducerPath]: repositoryModalSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(githubApi.middleware)
  })
}

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
