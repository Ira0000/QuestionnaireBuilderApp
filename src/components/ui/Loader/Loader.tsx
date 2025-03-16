import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="mx-auto flex items-center justify-center">
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
