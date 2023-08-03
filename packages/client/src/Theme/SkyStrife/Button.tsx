import React from "react";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  buttonType: "primary" | "secondary" | "tertiary";
  size?: "lg" | "md";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ type, className, buttonType, disabled, children, size, ...props }, ref) => {
    if (!size) size = "md";

    return (
      <button
        ref={ref}
        type={type || "button"}
        disabled={disabled}
        style={{
          lineHeight: "24px",
          letterSpacing: "1px",
        }}
        className={twMerge(
          "group transition enabled:active:translate-y-0.5 rounded text-ss-text-default",
          "disabled:grayscale-[60%] disabled:cursor-not-allowed disabled:aria-busy:cursor-wait",
          "uppercase",
          size === "lg" && "px-6 py-3 text-base font-medium rounded-sm",
          size === "md" && "px-4 py-2 text-sm font-medium rounded-sm",
          "primary" === buttonType &&
            "bg-ss-blue hover:bg-ss-blue-hover shadow-ss-default disabled:shadow-ss-default active:shadow-ss-active",
          "secondary" === buttonType &&
            "bg-ss-gold hover:bg-ss-gold-hover shadow-ss-small disabled:shadow-ss-small active:shadow-ss-small-active",
          "tertiary" === buttonType &&
            "text-ss-text-light outline bg-ss-bg-0 outline-ss-stroke hover:bg-white hover:text-ss-text-default",
          className
        )}
        {...props}
      >
        <span className="inline-grid pointer-events-none overflow-hidden">
          <span className="row-start-1 col-start-1 transition opacity-100 translate-y-0 group-[[aria-busy=true]]:-translate-y-3 group-[[aria-busy=true]]:opacity-0">
            {children}
          </span>
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
