import React from "react";
import { Controller } from "react-hook-form";

export default function TextArea({
  control,
  name,
  placeholder,
  className,
}: {
  control: any;
  name: string;
  placeholder: string;
  className?: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
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
