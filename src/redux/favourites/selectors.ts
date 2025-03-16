import { RootState } from "../store";

export const selectIfIsFavourite = (state: RootState) =>
  state.favourites.campers.items;
