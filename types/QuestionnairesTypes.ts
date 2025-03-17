export interface Questionnaires {
  _id: string;
  name: string;
  description: string;
  questions: Questions[];
}

export interface Questions {
  type: "text" | "multiple-choice" | "single-choice";
  text: string;
  options?: string[];
}
