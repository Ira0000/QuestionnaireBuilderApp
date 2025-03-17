import { Questionnaires } from "types";

interface QuestionnaireItemProps {
  questionnaireItem: Questionnaires;
}

export default function QuestionnaireItem({
  questionnaireItem,
}: QuestionnaireItemProps) {
  return (
    <div className="flex flex-col gap-6 rounded-[20px] border border-borderGray p-4 md:w-[425px] lg:w-[888px] lg:flex-row lg:p-6">
      <h3>{questionnaireItem.name}</h3>
      <p>{questionnaireItem.description}</p>
      <ul className="flex justify-between">
        <li>Questions: {questionnaireItem.questionsQuantity}</li>
        <li>Completions: {questionnaireItem.responseCount}</li>
      </ul>
    </div>
  );
}
