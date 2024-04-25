import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface RepositoryModalState {
  selectedRepositoryId: string | null;
  isOpen: boolean;
}

const initialState = {
  selectedRepositoryId: null,
  isOpen: false
} satisfies RepositoryModalState as RepositoryModalState

export const repositoryModalSlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    openModal(state) {
      state.isOpen = true
    },
    closeModal(state) {
      state.isOpen = false
    },
    setSelectedRepository(state, action: PayloadAction<string>) {
      state.selectedRepositoryId = action.payload
    }
  }
})
