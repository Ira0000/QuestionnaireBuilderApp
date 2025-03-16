import { RootState } from "../store";

export const selectAllCampers = (state: RootState) =>
  state.campers.campers.items;

export const selectCampersLoading = (state: RootState) =>
  state.campers.campers.loading;

export const selectCampersError = (state: RootState) =>
  state.campers.campers.error;

export const selectCampersPerPage = (state: RootState) =>
  state.campers.campers.itemsPerPage;

export const selectCampersPage = (state: RootState) =>
  state.campers.campers.page;

export const selectCampersHasMorePages = (state: RootState) =>
  state.campers.campers.hasMore;

export const selectFilters = (state: RootState) => state.campers.filters;

export const selectOneCamper = (state: RootState) => state.campers.camper.item;

export const selectOneCamperError = (state: RootState) =>
  state.campers.camper.error;

export const selectOneCamperLoading = (state: RootState) =>
  state.campers.camper.loading;
