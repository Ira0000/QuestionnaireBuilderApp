import { MouseEventHandler } from "react";

type ButtonProps = {
  text: string;
  type: "submit" | "reset" | "button" | undefined;
  disabled?: boolean;
  className?: string;
  onClick?: MouseEventHandler | undefined;
};

export default function Button({
  text,
  className,
  disabled,
  type,
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        type={type}
        disabled={disabled}
        className={`block w-full max-w-[144px] rounded-[200px] bg-red py-4 text-base font-medium transition-colors hover:bg-hoverRed ${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
}
