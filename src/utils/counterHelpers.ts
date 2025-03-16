import { Campers, CamperUtility } from "../../types/CampersTypes";

export function countAverage(camperItem: Campers): {
  reviewsCount: number;
  roundedRating: number;
} {
  const reviewsCount: number = camperItem?.reviews?.length ?? 0;

  const averageRating: number =
    camperItem.reviews?.reduce(
      (sum, review) => sum + review.reviewer_rating,
      0,
    ) ?? 0;
  const roundedRating: number =
    averageRating > 0
      ? Math.round((averageRating / reviewsCount) * 10) / 10
      : 0;
  return { reviewsCount, roundedRating };
}

export function filterCamperUtilities(camperItem: Campers): CamperUtility[] {
  const camperItemUtilities = [
    {
      name: camperItem.transmission,
      value: camperItem.transmission,
      icon: "icon-diagram",
    },
    {
      name: camperItem.engine,
      value: camperItem.engine,
      icon: "icon-fuel-pump",
    },
    { name: "Kitchen", value: camperItem.kitchen, icon: "icon-cup-hot" },
    { name: "AC", value: camperItem.AC, icon: "icon-wind" },
    { name: "Bathroom", value: camperItem.bathroom, icon: "icon-shower" },
    { name: "TV", value: camperItem.TV, icon: "icon-tv" },
    { name: "Radio", value: camperItem.radio, icon: "icon-ui-radios" },
    {
      name: "Refrigerator",
      value: camperItem.refrigerator,
      icon: "icon-fridge",
    },
    {
      name: "Microwave",
      value: camperItem.microwave,
      icon: "icon-microwave",
    },
    { name: "Gas", value: camperItem.gas, icon: "icon-gas-stove" },
    { name: "Water", value: camperItem.water, icon: "icon-water" },
  ];

  return camperItemUtilities.filter((utility) => utility.value);
}
