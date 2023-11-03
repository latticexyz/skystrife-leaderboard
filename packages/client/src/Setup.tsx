import { ReactNode, useEffect, useState } from "react";
import { MUDProvider } from "./MUDContext";

type Props = {
  children: ReactNode;
  setup: () => Promise<any>;
};

export function Setup({ children, setup }: Props) {
  const [result, setResult] = useState<Awaited<ReturnType<typeof setup>>>();

  useEffect(() => {
    setup().then((res) => setResult(res));
  }, [setup]);

  return (
    <div>
      {result ? (
        <MUDProvider value={result}>{children}</MUDProvider>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
