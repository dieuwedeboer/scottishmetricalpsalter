import { configureStore } from '@reduxjs/toolkit'
import appReducer from './appSlice'
import psalmReducer from './psalmSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    psalm: psalmReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
