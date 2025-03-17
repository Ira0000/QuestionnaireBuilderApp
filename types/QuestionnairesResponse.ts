import { Questions } from "./QuestionnairesTypes";

export interface ApiResponseQuestionnaires {
  data: {
    data: QuestionnairesApi[];
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export interface QuestionnairesApi {
  _id: string;
  name: string;
  description: string;
  questions: Questions[];
  createdAt: string;
  updatedAt: string;
  questionsQuantity: number;
  responseCount: number;
}

export interface QuestionnaireById {
  _id: string;
  name: string;
  description: string;
  questions: Questions[];
  questionsQuantity: number;
}
