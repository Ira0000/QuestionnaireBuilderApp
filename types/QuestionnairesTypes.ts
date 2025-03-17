export interface Questionnaires {
  _id: string;
  name: string;
  description: string;
  questions?: Questions[] | undefined;
}

export interface Questions {
  type: NonNullable<"text" | "single-choice" | "multiple-choice" | undefined>;
  text: string;
  options?: (string | undefined)[] | undefined;
}
