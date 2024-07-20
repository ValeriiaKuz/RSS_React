import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from 'rickmortyapi';

export interface SelectedCharactersState {
  selectedCharacters: Character[];
}

const initialState: SelectedCharactersState = {
  selectedCharacters: []
};

export const selectedCharactersSlice = createSlice({
  name: 'selectedCharacters',
  initialState,
  reducers: {
    selectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacters = [...state.selectedCharacters, action.payload];
    },
    unselectCharacter: (state, action: PayloadAction<Character>) => {
      state.selectedCharacters = state.selectedCharacters.filter(
        (character) => character.id !== action.payload.id
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
