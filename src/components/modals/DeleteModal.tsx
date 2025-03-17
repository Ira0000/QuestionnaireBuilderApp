import { useAppDispatch } from "@/redux/hooks";
import {
  deleteQuestionnaire,
  fetchQuestionnaires,
} from "@/redux/questionnaires/operations";
import toast from "react-hot-toast";

interface DeleteModalProps {
  id: string;
  onClose: () => void;
}

const DeleteModal = ({ onClose, id }: DeleteModalProps) => {
  const dispatch = useAppDispatch();

  const handleDelete = async () => {
    try {
      const result = await dispatch(deleteQuestionnaire(id)).unwrap();

      if (result) {
        await dispatch(fetchQuestionnaires());
      }

      onClose();
      toast.success("Questionnaire deleted successfully!");
    } catch (error) {
      toast.error(`${error}. Please try again.`);
    } finally {
      onClose();
    }
  };

  return (
    <div className={"font-poppins text-darkGrey text-center"}>
      <h2 className={"mb-4 text-xl font-bold md:mb-6 md:text-3xl"}>
        Delete Questionnaire
      </h2>

      <p className={"mb-7 text-base font-normal md:mb-6 md:text-lg"}>
        Are you sure you want to delete this questionnaire?
      </p>

      <div
        className={
          "flex flex-col gap-[9px] md:flex-row md:justify-center md:gap-2.5"
        }
      >
        <button
          type="button"
          className={
            "bg-green md:text-md rounded-[30px] border-none py-3.5 text-base font-bold transition-colors duration-300 ease-in-out hover:bg-[#87d28d] focus:bg-[#87d28d] focus:outline-none md:px-[59px] md:py-[18px]"
          }
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          type="button"
          className={
            "bg-grey text-darkGrey/30 hover:text-darkGrey focus:text-darkGrey md:text-md rounded-[30px] border-none py-3.5 text-base font-bold transition-colors duration-300 ease-in-out focus:outline-none md:px-[59px] md:py-[18px]"
          }
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
