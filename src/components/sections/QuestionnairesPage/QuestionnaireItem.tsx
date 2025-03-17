import { QuestionnairesApi } from "types";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";
import Modal from "@/components/modals/Modal/Modal";
import DeleteModal from "@/components/modals/DeleteModal";

interface QuestionnaireItemProps {
  questionnaireItem: QuestionnairesApi;
}

export default function QuestionnaireItem({
  questionnaireItem,
}: QuestionnaireItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex flex-col gap-6 rounded-[20px] border border-[#dadde1] p-4 md:w-[425px] lg:w-[888px] lg:flex-row lg:p-6">
      <div className="absolute top-4 right-0">
        <DropdownMenu
          questionnaireId={questionnaireItem._id}
          onDelete={() => setIsModalOpen(true)}
        />
      </div>

      <h3 className="text-xl font-semibold text-[#475467]">
        {questionnaireItem.name}
      </h3>
      <p className="text-gray-600">{questionnaireItem.description}</p>
      <ul className="flex justify-between text-sm text-[#6c717b]">
        <li>Questions: {questionnaireItem.questionsQuantity}</li>
        <li>Completions: {questionnaireItem.responseCount}</li>
      </ul>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <DeleteModal
            id={questionnaireItem._id}
            onClose={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
