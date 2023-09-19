import { twMerge } from "tailwind-merge";
import { Body } from "./Typography";
import { formatEther } from "viem";

type Props = {
  amount: bigint;
} & React.HTMLAttributes<HTMLDivElement>;

export function Orbs({ amount, className, style }: Props) {
  return (
    <Body
      className={twMerge(
        "flex flex-row items-center text-ss-text-highlight",
        className
      )}
      style={style}
    >
      🔮 {formatEther(amount)}
    </Body>
  );
}
