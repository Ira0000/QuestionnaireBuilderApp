import { RootState } from "../store";

// Select all questionnaires
export const selectAllQuestionnaires = (state: RootState) =>
  state.questionnaires.questionnaires.items;

// Select loading state for questionnaires
export const selectQuestionnairesLoading = (state: RootState) =>
  state.questionnaires.questionnaires.loading;

// Select error state for questionnaires
export const selectQuestionnairesError = (state: RootState) =>
  state.questionnaires.questionnaires.error;

// Select items per page for pagination
export const selectQuestionnairesPerPage = (state: RootState) =>
  state.questionnaires.questionnaires.itemsPerPage;

// Select current page for pagination
export const selectQuestionnairesPage = (state: RootState) =>
  state.questionnaires.questionnaires.page;

// Check if there are more pages available
export const selectQuestionnairesHasMorePages = (state: RootState) =>
  state.questionnaires.questionnaires.hasNextPage;

// Select sorting options (sortBy & sortOrder)
export const selectQuestionnairesSortItems = (state: RootState) =>
  state.questionnaires.sortItems;

// Select a single questionnaire
export const selectOneQuestionnaire = (state: RootState) =>
  state.questionnaires.questionnaire.item;

// Select error state for fetching a single questionnaire
export const selectOneQuestionnaireError = (state: RootState) =>
  state.questionnaires.questionnaire.error;

// Select loading state for fetching a single questionnaire
export const selectOneQuestionnaireLoading = (state: RootState) =>
  state.questionnaires.questionnaire.loading;
