import { Campers, CamperUtility } from "types/CampersTypes";
import { cn } from "@/utils/cn";
import { filterCamperUtilities } from "@/utils/counterHelpers";
import Icon from "@/utils/icon";

interface CamperFeaturesProps {
  camperItem: Campers;
}

export default function CamperFeatures({ camperItem }: CamperFeaturesProps) {
  const camperItemUtilities: CamperUtility[] = camperItem
    ? filterCamperUtilities(camperItem)
    : [];
  return (
    <div className="flex flex-col justify-between rounded-[10px] bg-bgInputGray px-3 py-5 lg:h-[588px] lg:w-[631px] lg:px-13 lg:py-11">
      <ul className="flex w-full flex-wrap gap-2 lg:w-[527px]">
        {camperItemUtilities.map((utility, index) => {
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
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-xl">Vehicle details</h3>
        <hr className="h-[1px] w-full border-0 bg-borderGray" />
        <table className="border-separate border-spacing-y-4">
          <tbody className="text-base font-base">
            <tr>
              <td>Form</td>
              <td className="text-right capitalize">{camperItem.form}</td>
            </tr>
            <tr>
              <td>Length</td>
              <td className="text-right">{camperItem.length}</td>
            </tr>
            <tr>
              <td>Width</td>
              <td className="text-right">{camperItem.width}</td>
            </tr>
            <tr>
              <td>Height</td>
              <td className="text-right">{camperItem.height}</td>
            </tr>
            <tr>
              <td>Tank</td>
              <td className="text-right">{camperItem.tank}</td>
            </tr>
            <tr>
              <td>Consumption</td>
              <td className="text-right">{camperItem.consumption}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
