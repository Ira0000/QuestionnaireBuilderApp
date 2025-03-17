/* eslint-disable @typescript-eslint/no-explicit-any */

import { ComponentProps } from "react";
import { Control, Controller } from "react-hook-form";

type TextAreaProps = ComponentProps<"textarea"> & {
  control: Control<any>;
  label?: string;
  labelClassName: string;
  name: string;
  placeholder: string;
  className?: string;
};

export default function TextArea({
  control,
  name,
  placeholder,
  className,
  label,
  labelClassName,
}: TextAreaProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          {label && (
            <label
              className={`font-poppins mb-2 text-base font-bold text-[#2f2f2f] ${labelClassName}`}
            >
              {label}
            </label>
          )}
          <textarea
            {...field}
            placeholder={placeholder}
            className={`w-full rounded-[12px] bg-bgInputGray p-[18px] text-base font-base transition-colors outline-none placeholder:text-[#10182899] hover:bg-bgLightGray ${className}`}
          />
          {error && (
            <p className="mt-[10px] text-sm text-hoverRed">{error.message}</p>
          )}
        </div>
      )}
    />
  );
}
