import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Questionnaires } from "../../../types/QuestionnairesTypes";
import { ApiResponseQuestionnaires } from "../../../types/QuestionnairesResponse";
import {
  createQuestionnaire,
  deleteQuestionnaire,
  fetchQuestionnaireById,
  fetchQuestionnaires,
  updateQuestionnaire,
} from "./operations";

export interface QuestionnaireState {
  questionnaires: {
    items: Questionnaires[];
    loading: boolean;
    error: string | null;
    page: number;
    hasNextPage: boolean;
    itemsPerPage: number;
  };
  sortItems: {
    sortOrder: "asc" | "desc";
    sortBy: "_id" | "name" | "questionsQuantity" | "responseCount";
  };
  questionnaire: {
    item: Questionnaires | null;
    loading: boolean;
    error: string | null;
  };
}

const initialState: QuestionnaireState = {
  questionnaires: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasNextPage: false,
    itemsPerPage: 4,
  },
  sortItems: {
    sortBy: "_id",
    sortOrder: "asc",
  },
  questionnaire: {
    item: null,
    loading: false,
    error: null,
  },
};

const handlePending = (state: QuestionnaireState) => {
  state.questionnaires.loading = true;
};

const handleRejected = (
  state: QuestionnaireState,
  action: PayloadAction<string | undefined>,
) => {
  state.questionnaires.loading = false;
  const errorMessage = action.payload ?? null;
  state.questionnaires.error = errorMessage;
};

const handleQuestionnairePending = (state: QuestionnaireState) => {
  state.questionnaire.loading = true;
};

const handleQuestionnaireRejected = (
  state: QuestionnaireState,
  action: PayloadAction<string | undefined>,
) => {
  state.questionnaire.loading = false;
  const errorMessage = action.payload ?? null;
  state.questionnaire.error = errorMessage;
};

const slice = createSlice({
  name: "questionnaires",
  initialState,
  reducers: {
    incrementPage: (state: QuestionnaireState) => {
      state.questionnaires.page += 1;
    },
    resetPagination: (state: QuestionnaireState) => {
      state.questionnaires.page = 1;
      state.questionnaires.hasNextPage = false;
      state.questionnaires.items = [];
    },
    setSort: (
      state,
      action: PayloadAction<{
        sortBy: "_id" | "name" | "questionsQuantity" | "responseCount";
        sortOrder: "asc" | "desc";
      }>,
    ) => {
      state.sortItems = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all questionnaires
      .addCase(fetchQuestionnaires.pending, handlePending)
      .addCase(
        fetchQuestionnaires.fulfilled,
        (
          state: QuestionnaireState,
          action: PayloadAction<ApiResponseQuestionnaires>,
        ) => {
          console.log("fetchQuestionnaires.fulfilled payload:", action.payload);
          state.questionnaires.loading = false;
          state.questionnaires.error = null;
          if (state.questionnaires.page === 1) {
            state.questionnaires.items = action.payload.data.data;
          } else {
            state.questionnaires.items = [
              ...state.questionnaires.items,
              ...action.payload.data.data,
            ];
          }
          state.questionnaires.hasNextPage = action.payload.data.hasNextPage;
        },
      )
      .addCase(fetchQuestionnaires.rejected, handleRejected)

      // Fetch a questionnaire by ID
      .addCase(fetchQuestionnaireById.pending, handleQuestionnairePending)
      .addCase(
        fetchQuestionnaireById.fulfilled,
        (state: QuestionnaireState, action: PayloadAction<Questionnaires>) => {
          state.questionnaire.loading = false;
          state.questionnaire.error = null;
          state.questionnaire.item = action.payload;
        },
      )
      .addCase(fetchQuestionnaireById.rejected, handleQuestionnaireRejected)

      // Create a new questionnaire
      .addCase(createQuestionnaire.pending, handleQuestionnairePending)
      .addCase(
        createQuestionnaire.fulfilled,
        (state: QuestionnaireState, action: PayloadAction<Questionnaires>) => {
          state.questionnaire.loading = false;
          state.questionnaire.error = null;
          state.questionnaire.item = action.payload;
          state.questionnaires.items = [
            action.payload,
            ...state.questionnaires.items,
          ];
        },
      )
      .addCase(createQuestionnaire.rejected, handleQuestionnaireRejected)

      // Update an existing questionnaire
      .addCase(updateQuestionnaire.pending, handleQuestionnairePending)
      .addCase(
        updateQuestionnaire.fulfilled,
        (state, action: PayloadAction<Questionnaires>) => {
          state.questionnaire.loading = false;
          state.questionnaire.error = null;
          state.questionnaire.item = action.payload;
          const index = state.questionnaires.items.findIndex(
            (q) => q._id === action.payload._id,
          );
          if (index !== -1) {
            state.questionnaires.items[index] = action.payload;
          }
        },
      )
      .addCase(updateQuestionnaire.rejected, handleQuestionnaireRejected)

      // Delete a questionnaire by ID
      .addCase(deleteQuestionnaire.pending, handleQuestionnairePending)
      .addCase(
        deleteQuestionnaire.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.questionnaire.loading = false;
          state.questionnaire.error = null;
          state.questionnaires.items = state.questionnaires.items.filter(
            (q) => q._id !== action.payload,
          );
          if (state.questionnaire.item?._id === action.payload) {
            state.questionnaire.item = null;
          }
        },
      )
      .addCase(deleteQuestionnaire.rejected, handleQuestionnaireRejected);
  },
});

export const { incrementPage, resetPagination, setSort } = slice.actions;
export const questionnairesSlice = slice.reducer;
