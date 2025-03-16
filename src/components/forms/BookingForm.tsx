import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
import bookingValidationSchema, {
  BookingFormData,
} from "./validationSchemaBookinForm";
import Button from "../ui/Button";
import Input from "../ui/FormComponents/Input";
import Calendar from "../ui/FormComponents/Calendar";
import TextArea from "../ui/FormComponents/TextArea";

export default function BookingForm() {
  const { control, handleSubmit } = useForm<BookingFormData>({
    resolver: yupResolver(bookingValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      bookingDate: undefined,
      comment: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: BookingFormData) => {
    toast.success(`${data.name}, your request was submitted!`, {
      duration: 4000,
      position: "top-right",
    });
  };

  return (
    <>
      <Toaster />
      <form
        noValidate
        className="w-full rounded-[10px] border border-borderGray px-3 py-5 lg:h-[588px] lg:w-[641px] lg:px-11 lg:py-[57px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="mb-2 text-xl font-xl">Book your campervan now</h3>
            <p className="text-base font-base text-gray">
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className="flex flex-col gap-[14px]">
            <Input
              control={control}
              name="name"
              placeholder="Name*"
              type="text"
              required
            />
            <Input
              control={control}
              name="email"
              placeholder="Email*"
              type="email"
              required
            />
            <Calendar control={control} name="bookingDate" />
            <TextArea
              control={control}
              name="comment"
              placeholder="Comment"
              className="h-[118px]"
            />
          </div>
          <Button
            text="Send"
            type="submit"
            className="place-self-center text-white"
          />
        </div>
      </form>
    </>
  );
}
