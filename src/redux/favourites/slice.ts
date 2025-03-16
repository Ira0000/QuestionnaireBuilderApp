import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Campers } from "../../../types/CampersTypes";

export interface FavouritesState {
  campers: {
    items: Campers[];
    loading: boolean;
    error: string | null;
  };
}

const initialState: FavouritesState = {
  campers: {
    items: [],
    loading: false,
    error: null,
  },
};

const slice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addToFavourites: (
      state: FavouritesState,
      action: PayloadAction<Campers>,
    ) => {
      const exists = state.campers.items.some(
        (item) => item.id === action.payload.id,
      );
      if (!exists) {
        state.campers.items = [...state.campers.items, action.payload];
      }
    },
    removeFromFavourites: (
      state: FavouritesState,
      action: PayloadAction<Campers["id"]>,
    ) => {
      state.campers.items = state.campers.items.filter(
        (item) => item.id !== action.payload,
      );
    },
  },
});

export const { addToFavourites, removeFromFavourites } = slice.actions;
export const favouritesSlice = slice.reducer;
