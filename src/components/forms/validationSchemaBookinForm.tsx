import * as yup from "yup";

const quizFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Quiz name is required")
    .min(3, "Quiz name must be at least 3 characters")
    .max(100, "Quiz name cannot exceed 100 characters")
    .trim(),

  description: yup
    .string()
    .required("Description is required")
    .min(3, "Description must be at least 3 characters")
    .max(200, "Description cannot exceed 200 characters")
    .trim(),

  questions: yup
    .array()
    .of(
      yup.object().shape({
        type: yup
          .string()
          .oneOf(
            ["text", "single-choice", "multiple-choice"],
            "Invalid question type",
          )
          .required("Question type is required"),

        text: yup
          .string()
          .required("Question text is required")
          .min(3, "Question text must be at least 3 characters")
          .max(300, "Question text cannot exceed 300 characters")
          .trim(),

        options: yup
          .array()
          .of(
            yup
              .string()
              .trim()
              .test(
                "not-empty",
                "Option cannot be empty",
                (value) => !!value?.trim(),
              ),
          )
          .when("type", {
            is: (type: string) =>
              type === "single-choice" || type === "multiple-choice",
            then: (schema) =>
              schema
                .required("Options are required for choice questions")
                .min(2, "At least 2 options are required")
                .test(
                  "has-values",
                  "Options cannot be empty",
                  (options) =>
                    options &&
                    options.every(
                      (option) => option && option.trim().length > 0,
                    ),
                ),
            otherwise: (schema) => schema.nullable(),
          }),
      }),
    )
    .min(1, "At least one question is required"),
});

export default quizFormValidationSchema;

export type QuizFormData = yup.InferType<typeof quizFormValidationSchema>;
