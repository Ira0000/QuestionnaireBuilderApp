import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="flex h-screen flex-col justify-center bg-[url(/public/hero_1x.avif)] bg-cover bg-center pl-2 text-bgInputGray md:pl-16">
      <h1 className="mb-4 text-4xl leading-[48px] font-semibold md:leading-[32px]">
        Questionnaires
        <br /> For Every Need
      </h1>
      <p className="mb-10 text-2xl font-xl">
        Collect valuable data and feedback from your audience.
      </p>
      <div className="flex flex-col gap-5">
        <Link
          to="/catalog"
          className="flex h-[56px] w-[173px] cursor-pointer items-center justify-center rounded-[200px] bg-red text-base text-white transition-colors hover:bg-hoverRed"
        >
          View Catalog
        </Link>
        <Link
          to="/builder"
          className="flex h-[56px] w-[173px] cursor-pointer items-center justify-center rounded-[200px] bg-red text-base text-white transition-colors hover:bg-hoverRed"
        >
          Create New
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
