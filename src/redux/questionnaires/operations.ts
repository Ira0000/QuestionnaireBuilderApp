import { ApiResponseQuestionnaires } from "../../../types/QuestionnairesResponse";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { QuestionnaireState } from "./slice";
import { Questionnaires } from "../../../types/QuestionnairesTypes";

const BASE_URL = axios.create({
  baseURL: "https://relaxed-phylis-iryna-l-de729a78.koyeb.app/",
});

//Fetch all Questionnaires (GET)

export const fetchQuestionnaires = createAsyncThunk<
  ApiResponseQuestionnaires,
  void,
  { rejectValue: string; state: { questionnaires: QuestionnaireState } }
>("questionnaires/fetchAll", async (_, { rejectWithValue, getState }) => {
  const state = getState();
  const { page, itemsPerPage } = state.questionnaires.questionnaires;
  const { sortBy, sortOrder } = state.questionnaires.sortItems;
  try {
    const params: Record<string, string | number> = {
      page,
      perPage: itemsPerPage,
      sortBy,
      sortOrder,
    };

    const { data } = await BASE_URL.get<ApiResponseQuestionnaires>(
      "/questionnaires",
      {
        params,
      },
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch questionnaires data.");
  }
});

//Fetch Questionnaire by Id (GET)

export const fetchQuestionnaireById = createAsyncThunk<
  Questionnaires,
  string,
  { rejectValue: string }
>("questionnaires/fetchbyId", async (id, { rejectWithValue }) => {
  try {
    const { data } = await BASE_URL.get<Questionnaires>(`questionnaires/${id}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch questionnaire data.");
  }
});

// Create a questionnaire by (POST)
export const createQuestionnaire = createAsyncThunk<
  Questionnaires,
  Omit<Questionnaires, "_id">,
  { rejectValue: string }
>("questionnaires/create", async (newQuestionnaire, { rejectWithValue }) => {
  try {
    const { data } = await BASE_URL.post<Questionnaires>(
      "questionnaires",
      newQuestionnaire,
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to create questionnaire.");
  }
});

// Update a questionnaire by ID (PATCH)
export const updateQuestionnaire = createAsyncThunk<
  Questionnaires,
  { id: string; updates: Partial<Questionnaires> },
  { rejectValue: string }
>("questionnaires/update", async ({ id, updates }, { rejectWithValue }) => {
  try {
    const { data } = await BASE_URL.patch<Questionnaires>(
      `questionnaires/${id}`,
      updates,
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to update questionnaire.");
  }
});

// Delete a questionnaire by ID (DELETE)
export const deleteQuestionnaire = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("questionnaires/delete", async (id, { rejectWithValue }) => {
  try {
    await BASE_URL.delete(`questionnaires/${id}`);
    return id;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to delete questionnaire.");
  }
});
