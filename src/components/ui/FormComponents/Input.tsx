import { Controller } from "react-hook-form";

export default function Input({
  control,
  name,
  placeholder,
  type,
  required,
}: {
  control: any;
  name: string;
  placeholder: string;
  type: string;
  required?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          <input
            {...field}
            type={type}
            required={required}
            placeholder={placeholder}
            className="h-[60px] w-full rounded-[12px] bg-bgInputGray p-[18px] text-base font-base transition-colors outline-none placeholder:text-[#10182899] hover:bg-bgLightGray"
          />
          {error && (
            <p className="mt-[10px] text-sm text-hoverRed">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
