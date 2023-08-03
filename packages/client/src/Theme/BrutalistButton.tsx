import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { BrutalistCard } from "./BrutalistCard";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & { pending?: boolean };

export function BrutalistButton(props: Props) {
  return (
    <BrutalistCard {...props} clickable>
      <div
        onClick={(e) => {
          e.stopPropagation();

          if (props.onClick) props.onClick(e);
        }}
      >
        <div className="text-center px-2">{props.children}</div>
      </div>
    </BrutalistCard>
  );
}
