import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { fetchCampersById } from "@/redux/campers/operations";
import {
  selectOneCamper,
  selectOneCamperLoading,
} from "@/redux/campers/selectors";
import { Campers } from "types/CampersTypes";
import Icon from "@/utils/icon";
import { countAverage } from "@/utils/counterHelpers";
import { cn } from "@/utils/cn";
import Loader from "@/components/ui/Loader/Loader";
import BookingForm from "@/components/forms/BookingForm";
import CamperReviews from "@/components/sections/OneCamperPage/CamperReviews";
import CamperFeatures from "@/components/sections/OneCamperPage/CamperFeatures";

export default function CamperPage() {
  const buildLinkClass = (tab: boolean): string => {
    return cn("text-xl font-xl text-black relative pb-6 cursor-pointer", {
      "after:absolute after:bottom-0 after:left-0 after:h-[5px] after:w-full after:bg-red after:z-10":
        tab,
    });
  };

  const [activeTab, setActiveTab] = useState(false);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchCampersById(id));
    }
  }, [dispatch, id]);

  const camperItem: Campers | null = useAppSelector(selectOneCamper);
  const isLoading: boolean = useAppSelector(selectOneCamperLoading);
  const { reviewsCount, roundedRating } = camperItem
    ? countAverage(camperItem)
    : { reviewsCount: 0, roundedRating: 0 };

  if (isLoading) {
    return (
      <div className="flex w-full items-center">
        <Loader />
      </div>
    );
  }

  if (!camperItem) {
    return <div>No camper found</div>;
  }

  return (
    <div className="flex flex-col gap-3 px-3 py-5 lg:gap-7 lg:px-16 lg:py-12">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-xl">{camperItem.name}</h2>
        <div className="mb-2 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Icon
              id="icon-yellow-star"
              w={16}
              h={16}
              className="flex items-center justify-center"
            />
            <p className="text-base font-base">
              {roundedRating} ({reviewsCount} Reviews)
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Icon id="icon-Map" h={16} w={16} />
            <p className="text-base font-base">{camperItem.location}</p>
          </div>
        </div>
        <p className="text-2xl font-xl">€{camperItem.price.toFixed(2)}</p>
      </div>
      <ul className="mx-auto flex flex-col gap-5 md:flex-row md:flex-wrap lg:mx-0 lg:gap-12">
        {camperItem.gallery?.map((photo, index) => {
          return (
            <li
              key={`gallery-${camperItem.id}-${index}`}
              className="h-78 w-full overflow-hidden rounded-[10px] md:w-73 lg:w-73"
            >
              <img
                className="size-full object-cover"
                src={photo.thumb}
                alt="Camper"
              />
            </li>
          );
        })}
      </ul>
      <p className="mb-8 text-base font-base text-darkGray">
        {camperItem.description}
      </p>
      <div>
        <div className="relative mb-11">
          <div>
            <div className="flex gap-10">
              <button
                onClick={() => setActiveTab(false)}
                className={buildLinkClass(activeTab === false)}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab(true)}
                className={buildLinkClass(activeTab === true)}
              >
                Reviews
              </button>
            </div>
            <hr className="absolute bottom-0.5 left-0 h-[1px] w-full border-0 bg-borderGray" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-10 lg:flex-row">
          {activeTab ? (
            <CamperReviews camperItem={camperItem} />
          ) : (
            <CamperFeatures camperItem={camperItem} />
          )}
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
