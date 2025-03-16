import { Campers } from "types/CampersTypes";
import Icon from "@/utils/icon";

interface CamperFeaturesProps {
  camperItem: Campers;
}
export default function CamperReviews({ camperItem }: CamperFeaturesProps) {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <Icon key={`yellow-star-${i}`} id="icon-yellow-star" w={16} h={16} />,
      );
    }

    for (let i = rating; i < 5; i++) {
      stars.push(<Icon key={`empty-star-${i}`} id="icon-star" w={16} h={16} />);
    }
    return stars;
  };
  return (
    <ul className="flex w-full flex-col gap-5 py-3 lg:h-[588px] lg:w-[631px] lg:gap-11">
      {camperItem.reviews?.map((review, index) => {
        return (
          <li
            className="flex flex-col gap-4 overflow-y-auto"
            key={`${review.reviewer_name}-${index}`}
          >
            <div className="flex items-center gap-4">
              <span className="flex size-15 items-center justify-center rounded-full bg-bgLightGray text-2xl font-xl text-red">
                {review.reviewer_name.charAt(0).toUpperCase()}
              </span>
              <div className="flex flex-col gap-1">
                <p className="capitalise text-base font-base">
                  {review.reviewer_name}
                </p>
                <div className="flex gap-1">
                  {renderStars(review.reviewer_rating)}
                </div>
              </div>
            </div>
            <p className="text-base font-base text-darkGray">
              {review.comment}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
