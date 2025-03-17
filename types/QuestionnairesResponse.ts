import { Questionnaires } from "./QuestionnairesTypes";

export interface ApiResponseQuestionnaires {
  data: {
    data: Questionnaires[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}
