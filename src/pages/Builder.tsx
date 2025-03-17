import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TextArea from "@/components/ui/FormComponents/TextArea";
import { useAppDispatch } from "@/redux/hooks";
import { createQuestionnaire } from "@/redux/questionnaires/operations";
import FormInput from "@/components/ui/FormComponents/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import quizFormValidationSchema from "@/components/forms/validationSchemaBookinForm";

interface Questions {
  options?: (string | undefined)[] | undefined;
  text: string;
  type: NonNullable<"text" | "single-choice" | "multiple-choice" | undefined>;
}

interface FormData {
  name: string;
  description: string;
  questions?: Questions[] | undefined;
}

export default function Builder() {
  const dispatch = useAppDispatch();
  const { control, handleSubmit, setValue, getValues, watch } =
    useForm<FormData>({
      defaultValues: {
        name: "",
        description: "",
        questions: [{ type: "text", text: "" }],
      },
      resolver: yupResolver(quizFormValidationSchema),
      mode: "onBlur",
    });

  // Watch for changes in the form questions
  const formQuestions = watch("questions");

  // Initialize state with the form's default values
  const [questionFields, setQuestionFields] = useState<Questions[]>([
    { type: "text", text: "" },
  ]);

  // Keep local state in sync with form state
  useEffect(() => {
    if (formQuestions) {
      setQuestionFields(formQuestions);
    }
  }, [formQuestions]);

  const addAnswer = (index: number) => {
    const updatedFields = [...questionFields];
    if (!updatedFields[index].options) {
      updatedFields[index].options = [];
    }
    updatedFields[index].options.push("");
    setQuestionFields(updatedFields);
    setValue("questions", updatedFields);
  };

  const removeAnswer = (index: number, answerIndex: number) => {
    const updatedFields = [...questionFields];
    if (
      updatedFields[index].options &&
      updatedFields[index].options.length > 0
    ) {
      updatedFields[index].options.splice(answerIndex, 1);
    }
    setQuestionFields(updatedFields);
    setValue("questions", updatedFields);
  };

  const handleQuestionTypeChange = (
    index: number,
    value: "text" | "multiple-choice" | "single-choice",
  ) => {
    // Get the current form values to ensure we have the latest text
    const currentFormValues = getValues();
    const currentQuestions = currentFormValues.questions || [];

    // Create a deep copy of the current questions
    const updatedQuestions = JSON.parse(JSON.stringify(currentQuestions));

    // Preserve the text from the current form state
    const currentText = updatedQuestions[index]?.text || "";

    if (value === "text") {
      // For text questions, remove options
      updatedQuestions[index] = {
        type: value,
        text: currentText,
      };
    } else {
      // For choice questions, keep the text and set options
      updatedQuestions[index] = {
        type: value,
        text: currentText,
        options: updatedQuestions[index]?.options || ["", "", ""],
      };
    }

    // Update both form state and local state
    setValue("questions", updatedQuestions);
    setQuestionFields(updatedQuestions);
  };

  const addQuestion = () => {
    // Get current form values to ensure we have all the latest data
    const currentFormValues = getValues();
    const currentQuestions = currentFormValues.questions || [];

    // Create a new question
    const newQuestion: Questions = { type: "text", text: "" };

    // Create updated questions array
    const updatedQuestions = [...currentQuestions, newQuestion];

    // Update both form state and local state
    setValue("questions", updatedQuestions);
    setQuestionFields(updatedQuestions);
  };

  const removeQuestion = (index: number) => {
    // Get current form values to ensure we have all the latest data
    const currentFormValues = getValues();
    const currentQuestions = currentFormValues.questions || [];

    // Create a copy and remove the question
    const updatedQuestions = [...currentQuestions];
    updatedQuestions.splice(index, 1);

    // Update both form state and local state
    setValue("questions", updatedQuestions);
    setQuestionFields(updatedQuestions);
  };

  const onSubmit = (data: FormData) => {
    dispatch(createQuestionnaire(data));
    console.log(data);
  };

  return (
    <div className="w-full max-w-xs rounded-lg bg-white px-4 py-6 shadow-lg md:max-w-2xl sm:max-w-md sm:px-8">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800 sm:text-3xl">
        Create Quiz
      </h1>
      <form
        noValidate
        className="w-full space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          control={control}
          name="name"
          label="Quiz Name"
          type="text"
          required
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />
        <TextArea
          control={control}
          name="description"
          label="Description"
          className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500"
        />

        {questionFields.map((field, index) => (
          <div
            key={index}
            className="space-y-6 rounded-lg border border-gray-200 bg-gray-50 p-2 sm:p-6"
          >
            <div className="relative flex w-full items-center">
              <FormInput
                control={control}
                name={`questions.${index}.text`}
                label={`Question ${index + 1}`}
                className="w-[90%] border border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeQuestion(index)}
                className="absolute top-10 right-0 flex size-5 items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-50 sm:top-4 sm:right-4"
              >
                x
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <label className="text-xs font-medium text-gray-600 sm:text-sm">
                Question Type:
              </label>
              <select
                value={field.type}
                onChange={(e) =>
                  handleQuestionTypeChange(
                    index,
                    e.target.value as
                      | "text"
                      | "multiple-choice"
                      | "single-choice",
                  )
                }
                className="h-10 rounded-lg border border-gray-300 bg-gray-100 p-2 text-xs text-gray-700 focus:ring-2 focus:ring-blue-500 sm:h-12 sm:w-48 sm:p-3 sm:text-base"
              >
                <option value="text">Text</option>
                <option value="single-choice">Single choice</option>
                <option value="multiple-choice">Multiple choice</option>
              </select>
            </div>

            {(field.type === "single-choice" ||
              field.type === "multiple-choice") && (
              <>
                <h3 className="text-xs font-medium text-gray-700 sm:text-sm">
                  Options
                </h3>
                {field.options &&
                  field.options.map((answer, answerIndex) => (
                    <div
                      key={answerIndex}
                      className="relative flex items-center gap-3"
                    >
                      <FormInput
                        control={control}
                        label="Answer"
                        number={answerIndex + 1}
                        name={`questions.${index}.options.${answerIndex}`}
                        className="w-[82%] border border-gray-300 focus:ring-2 focus:ring-blue-500 sm:w-[80%]"
                      />
                      <button
                        type="button"
                        onClick={() => removeAnswer(index, answerIndex)}
                        className="absolute top-10 right-0 flex size-5 items-center justify-center rounded-full border border-red-500 text-red-500 hover:bg-red-50 sm:top-4 sm:right-4"
                      >
                        x
                      </button>
                    </div>
                  ))}
                <button
                  type="button"
                  onClick={() => addAnswer(index)}
                  className="mt-2 text-xs text-blue-500 hover:underline sm:text-sm"
                >
                  Add Answer
                </button>
              </>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addQuestion}
          className="w-full rounded-lg border border-blue-500 py-2 text-xs text-blue-600 transition hover:bg-blue-50 sm:py-3 sm:text-base"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-500 py-2 text-xs text-white transition hover:bg-blue-600 sm:py-3 sm:text-base"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
