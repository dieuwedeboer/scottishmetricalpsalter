import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PsalmState {
  chapters: any[]; // Define the type of your chapters
  currentChapterIndex: number;
}

const initialState: PsalmState = {
  chapters: [],
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
  },
})

export const { setChapters, setCurrentIndex } = psalmSlice.actions

export default psalmSlice.reducer
