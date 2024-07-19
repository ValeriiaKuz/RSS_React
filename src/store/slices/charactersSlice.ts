import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedCharactersState {
  selectedCharacters: number[];
}

const initialState: SelectedCharactersState = {
  selectedCharacters: []
};

export const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<number>) => {
      state.selectedCharacters = [...state.selectedCharacters, action.payload];
    },
    unselectCharacter: (state, action: PayloadAction<number>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (characterId) => characterId !== action.payload
      );
    },
    unselectAll: (state) => {
      state.selectedCharacters = initialState.selectedCharacters;
    }
  }
});

export const { selectCharacter, unselectCharacter, unselectAll } =
  selectedCharactersSlice.actions;

export const selectedCharactersReducer = selectedCharactersSlice.reducer;
