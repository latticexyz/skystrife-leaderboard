import { DetailedHTMLProps, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { primary?: boolean };

export function Card(props: Props) {
  const { className: _className, children, primary, style } = props;

  return (
    <div
      className={twMerge(
        "w-[326px]",
        primary ? "bg-ss-bg-1" : "bg-ss-bg-0",
        "rounded",
        "px-6 py-4",
        "border border-ss-stroke",
        "shadow-ss-default",
        _className
      )}
      style={style}
    >
      {children}
    </div>
  );
}
