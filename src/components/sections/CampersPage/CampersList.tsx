import { useEffect } from "react";
import {
  selectAllCampers,
  selectCampersError,
  selectCampersHasMorePages,
  selectCampersLoading,
  selectFilters,
} from "@/redux/campers/selectors";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { incrementPage, resetPagination } from "@/redux/campers/slice";
import { fetchCampers } from "@/redux/campers/operations";
import CamperItem from "./CamperItem";
import Loader from "../../ui/Loader/Loader";
import Button from "../../ui/Button";

export default function CampersList() {
  const dispatch = useAppDispatch();

  const list = useAppSelector(selectAllCampers);
  const filters = useAppSelector(selectFilters);
  const error = useAppSelector(selectCampersError);
  useEffect(() => {
    dispatch(resetPagination());
    dispatch(fetchCampers());
  }, [dispatch, filters.location, filters.form, filters.equipment]);

  const isLoading = useAppSelector(selectCampersLoading);
  const hasMore = useAppSelector(selectCampersHasMorePages);

  const handleLoadMore = () => {
    dispatch(incrementPage());
    dispatch(fetchCampers());
  };

  if (error)
    return (
      <div className="flex">
        <h2 className="truncate text-2xl font-xl">No Campers to show</h2>
      </div>
    );

  return (
    <>
      <ul className="grid grid-cols-1 gap-3 l:grid-cols-2 lg:grid-cols-1 lg:gap-8">
        {list.map((item) => {
          return (
            <li key={item.id} className="mx-auto w-full">
              <CamperItem camperItem={item} />
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
