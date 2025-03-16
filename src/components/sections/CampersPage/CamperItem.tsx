import { Link, useLocation } from "react-router-dom";
import { Campers } from "types/CampersTypes";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { countAverage, filterCamperUtilities } from "@/utils/counterHelpers";
import {
  addToFavourites,
  removeFromFavourites,
} from "@/redux/favourites/slice";
import { selectIfIsFavourite } from "@/redux/favourites/selectors";
import Icon from "@/utils/icon";
import { cn } from "@/utils/cn";

interface CamperItemProps {
  camperItem: Campers;
}

export default function CamperItem({ camperItem }: CamperItemProps) {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const smallImageLink = camperItem?.gallery?.[0]?.thumb;

  const { reviewsCount, roundedRating } = countAverage(camperItem);

  const camperItemUtilities = filterCamperUtilities(camperItem);

  const handleHeartClick = (data: Campers) => {
    const isFavorite = checkIfFavourite(data);
    if (isFavorite) {
      dispatch(removeFromFavourites(data.id));
    } else {
      dispatch(addToFavourites(data));
    }
  };

  const listFavourites = useAppSelector(selectIfIsFavourite);

  function checkIfFavourite(currentItem: Campers) {
    return listFavourites.some((item) => item.id === currentItem.id);
  }

  return (
    <div className="flex flex-col gap-6 rounded-[20px] border border-borderGray p-4 md:w-[425px] lg:w-[888px] lg:flex-row lg:p-6">
      <div className="h-80 w-full overflow-hidden rounded-[10px] lg:w-73">
        <img
          className="h-full w-full object-cover"
          src={smallImageLink}
          alt={camperItem.name}
        />
      </div>
      <div className="lg:w-131">
        <div className="mb-2 flex flex-col lg:flex-row lg:justify-between">
          <h2 className="truncate text-2xl font-xl lg:w-[339px]">
            {camperItem.name}
          </h2>
          <div className="flex justify-between gap-3 md:items-center">
            <p className="text-2xl font-l">€{camperItem.price.toFixed(2)}</p>
            <button
              onClick={() => handleHeartClick(camperItem)}
              className="cursor-pointer items-center justify-center"
            >
              <Icon
                id="icon-heart"
                h={24}
                w={26}
                className={cn("transition-colors hover:fill-hoverRed", {
                  "fill-red": checkIfFavourite(camperItem),
                  "fill-black": !checkIfFavourite(camperItem),
                })}
              />
            </button>
          </div>
        </div>
        <div className="mb-6 flex items-center gap-4">
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
        <p className="mb-6 truncate text-base font-base text-darkGray lg:w-131">
          {camperItem.description}
        </p>
        <ul className="mb-6 flex flex-wrap gap-2 md:w-100">
          {camperItemUtilities.slice(0, 4).map((utility, index) => {
            return (
              <li
                key={`${camperItem.id}-feature-${index}`}
                className="flex items-center justify-center gap-2 rounded-[100px] bg-bgLightGray px-[18px] py-[12px] text-base font-base capitalize"
              >
                <Icon
                  id={utility.icon}
                  w={20}
                  h={20}
                  className={cn("", {
                    "fill-transparent stroke-[#000000]":
                      utility.icon === "icon-water" ||
                      utility.icon === "icon-microwave" ||
                      utility.icon === "icon-gas-stove",
                  })}
                />
                {utility.name}
              </li>
            );
          })}
        </ul>
        <Link
          to={`/catalog/${camperItem.id.toString()}`}
          state={location}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-auto flex h-[56px] w-[166px] cursor-pointer items-center justify-center rounded-[200px] bg-red text-white transition-colors hover:bg-hoverRed md:mx-0"
        >
          Show more
        </Link>
      </div>
    </div>
  );
}
