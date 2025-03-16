import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

export default function Calendar({
  control,
  name,
}: {
  control: any;
  name: string;
  required?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="flex flex-col">
          <DatePicker
            selected={value}
            onChange={onChange}
            placeholderText="Booking Date*"
            dateFormat="dd/MM/yyyy"
            className="h-[60px] w-full rounded-[12px] bg-bgInputGray p-[18px] text-base font-base transition-colors outline-none placeholder:text-[#10182899] hover:bg-bgLightGray"
          />
          {error && (
            <p className="mt-[10px] text-sm text-red-500">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
