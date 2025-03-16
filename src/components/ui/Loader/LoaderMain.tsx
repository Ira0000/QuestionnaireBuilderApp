import { ThreeDots } from "react-loader-spinner";

export default function LoaderMain() {
  return (
    <div className="bg-opacity-50 fixed top-0 left-0 flex h-full w-full items-center justify-center bg-gray-200">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#E44848"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}
