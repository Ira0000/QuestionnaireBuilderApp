import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { incrementPage, resetPagination } from "@/redux/questionnaires/slice";
import Loader from "../../ui/Loader/Loader";
import Button from "../../ui/Button";
import QuestionnaireItem from "./QuestionnaireItem";
import {
  selectAllQuestionnaires,
  selectQuestionnairesError,
  selectQuestionnairesHasMorePages,
  selectQuestionnairesLoading,
} from "@/redux/questionnaires/selectors";
import { fetchQuestionnaires } from "@/redux/questionnaires/operations";

export default function QuestionnairesList() {
  const dispatch = useAppDispatch();

  const list = useAppSelector(selectAllQuestionnaires);
  const error = useAppSelector(selectQuestionnairesError);
  useEffect(() => {
    dispatch(resetPagination());
    dispatch(fetchQuestionnaires());
  }, [dispatch]);

  const isLoading = useAppSelector(selectQuestionnairesLoading);
  const hasMore = useAppSelector(selectQuestionnairesHasMorePages);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchQuestionnaires());
  };

  if (error)
    return (
      <div className="flex">
        <h2 className="truncate text-2xl font-xl">No Questionnaires to show</h2>
      </div>
    );

  console.log(list);

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 l:grid-cols-2 lg:grid-cols-1 lg:gap-8">
        {list.map((item) => {
          return (
            <li key={item._id} className="mx-auto w-full">
              <QuestionnaireItem questionnaireItem={item} />
            </li>
          );
        })}
      </ul>
      <div className="mx-auto w-full">{isLoading && <Loader />}</div>
      {!isLoading && !error && hasMore && (
        <Button
          text="Load more"
          type="button"
          onClick={handleLoadMore}
          className="mx-auto mt-10 border border-borderGray bg-transparent text-black hover:border-hoverRed hover:bg-transparent"
        />
      )}
    </>
  );
}
