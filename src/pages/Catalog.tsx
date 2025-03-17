import QuestionnairesList from "@/components/sections/CampersPage/QuestionnairesList";

export default function Catalog() {
  return (
    <div className="relative flex w-full flex-col gap-6 px-2 py-5 md:flex-row md:gap-[20px] md:px-5 md:py-12 lg:gap-[64px] lg:px-16">
      <div className="mx-auto w-full">
        <QuestionnairesList />
      </div>
    </div>
  );
}
