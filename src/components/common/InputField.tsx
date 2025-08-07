import React from "react";

import clsx from "clsx";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
  actionLabel?: string;
  successMessage?: string;
  actionClickable?: boolean;
  onActionClick?: () => void;
  labelClassName?: string;
  containerClassName?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      errorMessage,
      className,
      actionLabel,
      successMessage,
      actionClickable,
      onActionClick,
      labelClassName,
      containerClassName,
      ...props
    },
    ref,
  ) => {
    const value = typeof props.value === "string" ? props.value : "";

    return (
      <div
        className={clsx("flex flex-col", containerClassName ?? "gap-2 py-4")}
      >
        <span className={clsx("text-body1-sb text-gray-800", labelClassName)}>
          {label}
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex w-full max-w-[398px] gap-1">
            <input
              name={props.name ?? "default-input"}
              ref={ref}
              {...props}
              className={clsx(
                "text-body1-med h-[44px] flex-1 rounded-sm border px-4 py-3 placeholder:text-gray-500 focus:border-gray-600 focus:outline-none",
                value.trim() ? "border-gray-600" : "border-gray-400",
                className,
              )}
            />
            {actionLabel && (
              <button
                type="button"
                disabled={!actionClickable}
                onClick={onActionClick}
                className={clsx(
                  "text-lab1-sb w-[83px] shrink-0 rounded-sm border p-3 transition-colors",
                  actionClickable
                    ? "text-mint border-mint hover:bg-mint-light cursor-pointer"
                    : "cursor-default border-gray-400 text-gray-500",
                )}
              >
                {actionLabel}
              </button>
            )}
          </div>
          {errorMessage && (
            <span className="text-cap1-med text-red">{errorMessage}</span>
          )}
          {successMessage && (
            <span className="text-cap1-med text-mint-contrast">
              {successMessage}
            </span>
          )}
        </div>
      </div>
    );
  },
);

InputField.displayName = "InputField";
export default InputField;
