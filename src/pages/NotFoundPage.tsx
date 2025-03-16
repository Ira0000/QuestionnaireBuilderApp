import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-grey flex size-full flex-col items-center justify-center rounded-[30px] px-1 text-center lg:max-h-[736px]">
      <h1 className="text-9xl font-extrabold text-black">404</h1>
      <p className="text-darkGrey mt-4 text-2xl font-xl">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="mt-2 text-gray-500">
        You may have mistyped the address or the page may have moved.
      </p>
      <Button
        className="mt-4 text-white"
        type="button"
        text="Go Back"
        onClick={() => navigate(-1)}
      />
    </div>
  );
}
