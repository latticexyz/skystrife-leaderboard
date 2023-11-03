import { ReactNode, useEffect, useState } from "react";
import { MUDProvider } from "./MUDContext";
import { setup } from "./mud/setup";

type Props = {
  children: ReactNode;
  mySetup: () => ReturnType<typeof setup>;
};

export function Setup({ children, mySetup }: Props) {
  const [result, setResult] = useState<Awaited<ReturnType<typeof setup>>>();

  useEffect(() => {
    mySetup().then((res) => setResult(res));
  }, [mySetup]);

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
