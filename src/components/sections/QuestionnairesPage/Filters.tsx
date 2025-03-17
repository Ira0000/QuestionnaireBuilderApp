import { SubmitHandler, useForm } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
// import { Equipment } from "types/CampersTypes";
import { useAppDispatch } from "@/redux/hooks";
import { changeFilter } from "@/redux/questionnaires/slice";
import Icon from "@/utils/icon";
import { cn } from "@/utils/cn";
import Button from "../../ui/Button";
import { Equipment } from "types/CampersTypes";
// import { Equipment } from "types/CampersTypes";

interface FormValues {
  location: string;
  vehicleType: string;
  equipment: Equipment[];
}

interface FilterProps {
  setIsFilterOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Filters({ setIsFilterOpen }: FilterProps) {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: {
      location: "",
      vehicleType: "",
      equipment: [],
    },
  });

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsFilterOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    const isFilterApplied =
      data.location.trim() !== "" ||
      data.vehicleType !== "" ||
      (data.equipment && data.equipment.length > 0);

    if (isFilterApplied) {
      dispatch(changeFilter(data));
    }
  };

  const watchVehicleType = watch("vehicleType");
  const watchEquipment = watch("equipment");

  const vehicleTypes = [
    { name: "Panel Truck", icon: "icon-grid-3" },
    { name: "Fully Integrated", icon: "icon-grid-4" },
    { name: "Alcove", icon: "icon-grid-9" },
  ];
  const equipmentOptions = [
    { name: Equipment.KITCHEN, icon: "icon-cup-hot" },
    { name: Equipment.AC, icon: "icon-wind" },
    { name: Equipment.BATHROOM, icon: "icon-shower" },
    { name: Equipment.TV, icon: "icon-tv" },
    { name: Equipment.RADIO, icon: "icon-ui-radios" },
    { name: Equipment.REFRIGERATOR, icon: "icon-fridge" },
    { name: Equipment.MICROWAVE, icon: "icon-microwave" },
    { name: Equipment.GAS, icon: "icon-gas-stove" },
    { name: Equipment.WATER, icon: "icon-water" },
  ];

  return (
    <form
      className="flex flex-col gap-3 md:w-[300px] md:gap-10 lg:w-[360px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="location" className="text-base font-base text-gray">
          Location
        </label>
        <div className="group relative">
          <input
            id="location"
            type="text"
            {...register("location")}
            className="h-14 w-[343px] rounded-2xl bg-bgInputGray pl-[48px] text-base font-base text-black transition-colors placeholder:text-gray hover:fill-black focus:fill-black focus:outline-none md:w-[300px] lg:w-90"
            placeholder="City"
          />
          <Icon
            id="icon-Map"
            w={20}
            h={20}
            className="absolute top-0 left-5 flex h-14 w-5 items-center justify-center fill-gray group-hover:fill-black group-focus:fill-black"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 md:gap-8">
        <p className="text-base font-base text-darkGray">Filters</p>
        <div className="flex flex-col gap-6">
          <label className="mb-0 text-xl font-xl md:mb-6">
            Vehicle Equipment
          </label>
          <hr className="border border-borderGray" />
          <ul className="grid grid-cols-3 gap-2 md:gap-3">
            {equipmentOptions.map((item, index) => (
              <li key={index} className="relative">
                <input
                  type="checkbox"
                  id={item.name}
                  value={item.name}
                  {...register("equipment")}
                  className="peer sr-only"
                />
                <label
                  htmlFor={item.name}
                  className={cn(
                    "flex h-[96px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-borderGray transition-colors duration-200 hover:border-red",
                    {
                      "!border-[#E44848]": watchEquipment.includes(item.name),
                    },
                  )}
                >
                  <Icon
                    id={item.icon}
                    w={32}
                    h={32}
                    className={cn({
                      "fill-transparent stroke-[#000000]":
                        item.icon === "icon-water" ||
                        item.icon === "icon-microwave" ||
                        item.icon === "icon-gas-stove",
                    })}
                  />
                  <p className="capitalize">{item.name}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4 md:gap-8">
          <label className="mb-0 text-xl font-xl md:mb-6">Vehicle Type</label>
          <hr className="border border-borderGray" />
          <ul className="grid grid-cols-3 gap-3">
            {vehicleTypes.map((type) => (
              <li key={type.name} className="relative">
                <input
                  type="radio"
                  id={type.name}
                  value={type.name}
                  {...register("vehicleType")}
                  className="peer sr-only"
                />
                <label
                  htmlFor={type.name}
                  className={cn(
                    "flex h-[96px] w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-borderGray transition-colors duration-200 hover:border-red",
                    {
                      "border-red": watchVehicleType === type.name,
                    },
                  )}
                >
                  <Icon id={type.icon} w={32} h={32} />
                  <p className="text-center capitalize">{type.name}</p>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button text="Search" type="submit" className="text-white" />
    </form>
  );
}
