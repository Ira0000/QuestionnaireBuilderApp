import QuestionnairesList from "@/components/sections/QuestionnairesPage/QuestionnairesList";

export default function Catalog() {
  return (
    <div className="relative flex w-full flex-col gap-6 px-2 py-5 md:flex-row md:gap-[20px] md:px-5 md:py-12 lg:gap-[64px] lg:px-16">
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-[#475467]">
        Quiz Catalog
      </h1>
      <div className="mx-auto w-full">
        <QuestionnairesList />
      </div>
    </div>
  );
}
