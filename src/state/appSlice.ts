import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// This slice defines and controls our global app state.
export interface AppState {
  ready: boolean
  open: boolean
  file: string
}

const initialState: AppState = {
  ready: false,
  open: false, // Deprecate this to a specific component
  file: 'tunes/Tallis.musicxml',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setReady: (state, action: PayloadAction<boolean>) => {
      state.ready = action.payload
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload
    },
    setFile: (state, action: PayloadAction<string>) => {
      state.file = action.payload
    },
  },
})

export const {
  setReady,
  setOpen,
  setFile
} = appSlice.actions

export default appSlice.reducer
