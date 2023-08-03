import { twMerge } from "tailwind-merge";
import { Body } from "./Typography";

type Props = {
  amount: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function Mana(props: Props) {
  const { amount, className, style } = props;

  return (
    <Body className={twMerge("flex flex-row items-center text-ss-text-highlight", className)} style={style}>
      🔮 {Math.floor(amount)}
    </Body>
  );
}
