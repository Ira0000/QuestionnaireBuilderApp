/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/utils/cn";
import Icon from "@/utils/icon";
import { ComponentProps } from "react";
import { Control, useController } from "react-hook-form";

type FormInputProps = ComponentProps<"input"> & {
  control: Control<any>;
  number?: number;
  label?: string;
  name: string;
  isPasswordField?: boolean;
  isPasswordShown?: boolean;
  toggleShowPassword?: () => void;
};
export default function FormInput({
  control,
  number,
  name,
  label,
  className,
  isPasswordField = false,
  isPasswordShown,
  toggleShowPassword,
  ...inputProps
}: FormInputProps) {
  const {
    formState: { errors },
  } = useController({ control, name });

  return (
    <div className="flex w-full flex-col">
      {label && (
        <label className="font-poppins mb-2 text-base font-bold text-[#2f2f2f]">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="flex items-center gap-2">
          {number && <p className="font-base">{number}.</p>}
          <input
            autoComplete="on"
            {...control.register(name)}
            {...inputProps}
            className={cn(
              `w-full rounded-[12px] bg-bgInputGray p-[10px] text-base font-base transition-colors outline-none placeholder:text-[#10182899] hover:bg-bgLightGray ${className}`,
              {
                "border-red": errors?.[name],
              },
            )}
          />
        </div>
        {isPasswordField && toggleShowPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute top-[14px] right-[12px]"
          >
            <Icon
              id={isPasswordShown ? "icon-eye" : "icon-eye-off"}
              w={20}
              h={20}
              className="text-[#4E453E]"
            />
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="text-error mt-1 text-sm">
          {errors[name].message?.toString()}
        </p>
      )}
    </div>
  );
}
