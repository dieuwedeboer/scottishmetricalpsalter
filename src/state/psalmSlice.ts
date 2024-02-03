import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PsalmState {
  chapters: any[] // @todo define a type
  commentary: any[]
  currentChapterIndex: number
}

const initialState: PsalmState = {
  chapters: [],
  commentary: [],
  currentIndex: 0,
}

export const psalmSlice = createSlice({
  name: 'psalm',
  initialState,
  reducers: {
    setChapters: (state, action: PayloadAction<any[]>) => {
      state.chapters = action.payload
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload
    },
    setCommentary: (state, action: PayloadAction<any[]>) => {
      state.commentary = action.payload
    },
  },
})

export const { setChapters, setCurrentIndex, setCommentary } = psalmSlice.actions

export default psalmSlice.reducer
