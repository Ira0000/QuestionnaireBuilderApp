import { ApiResponseCampers } from "./../../../types/CampersResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { CampersState } from "./slice";
import { Campers } from "../../../types/CampersTypes";

const BASE_URL = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/",
});

export const fetchCampers = createAsyncThunk<
  ApiResponseCampers,
  void,
  { rejectValue: string; state: { campers: CampersState } }
>("campers/fetchAll", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const { page, itemsPerPage } = state.campers.campers;
  const { location, form, equipment } = state.campers.filters;
  try {
    const params: Record<string, string | number | boolean> = {
      page,
      limit: itemsPerPage,
    };

    if (location) params.location = location;
    if (form) params.form = form;

    if (equipment.length > 0) {
      equipment.forEach((item) => {
        params[item] = true;
      });
    }
    const { data } = await BASE_URL.get<ApiResponseCampers>("/campers", {
      params,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch campers data.");
  }
});

export const fetchCampersById = createAsyncThunk<
  Campers,
  string,
  { rejectValue: string }
>("campers/fetchbyId", async (id, { rejectWithValue }) => {
  try {
    const { data } = await BASE_URL.get<Campers>(`/campers/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch campers data.");
  }
});
