import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useViewport } from "@/hooks/viewportWidth";
import Filters from "@/components/sections/CampersPage/Filters";
import CampersList from "@/components/sections/CampersPage/CampersList";

export default function Catalog() {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

  const { width } = useViewport();
  const breakpoint = 767;

  if (width > breakpoint)
    return (
      <div className="relative flex w-full flex-col gap-6 px-2 py-5 md:flex-row md:gap-[20px] md:px-5 md:py-12 lg:gap-[64px] lg:px-16">
        <Filters setIsFilterOpen={setIsFilterOpen} />
        <div className="mx-auto w-full">
          <CampersList />
        </div>
      </div>
    );

  return (
    <div className="relative flex w-full flex-col gap-6 px-2 py-5 md:flex-row md:gap-[64px] md:px-16 md:py-12">
      <div className="fixed top-15 z-50 md:hidden">
        <button
          onClick={() => setIsFilterOpen(true)}
          className="size-5 cursor-pointer bg-transparent text-red transition-colors hover:text-hoverRed"
        >
          <FaFilter />
        </button>
      </div>
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
          <div className="p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-l font-l text-red">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-2xl text-red transition-colors hover:text-hoverRed"
              >
                &times;
              </button>
            </div>
            <Filters setIsFilterOpen={setIsFilterOpen} />
          </div>
        </div>
      )}
      <div className="mx-auto w-full">
        <CampersList />
      </div>
    </div>
  );
}
