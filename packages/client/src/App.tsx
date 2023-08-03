import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { Hex } from "viem";
import { OverlineLarge, OverlineSmall } from "./Theme/SkyStrife/Typography";
import { Mana } from "./Theme/SkyStrife/Mana";

const TOKEN_ID =
  "0x4d616e6100000000000000000000000000000000000000000000000000000000";

const bytes32ToAddress = (s: Hex) => s.slice(0, 2) + s.slice(26);

export const App = () => {
  const {
    components: { TokenBalance },
  } = useMUD();

  const balances = useEntityQuery([Has(TokenBalance)])
    .filter((entity) => entity.split(":")[0] === TOKEN_ID)
    .map((entity) => {
      const owner = entity.split(":")[1];
      const { value } = getComponentValueStrict(TokenBalance, entity);

      return { entity: owner, value };
    });

  balances.sort((a, b) => Number(b.value - a.value));

  return (
    <div className="bg-slate-200 min-h-screen h-fit">
      <div className="p-8">
        <OverlineLarge>Sky Strife Leaderboard</OverlineLarge>

        <div className="flex">
          <div>
            <OverlineSmall className="mb-3 text-ss-text-x-light">
              Player
            </OverlineSmall>
            {balances.map((b) => (
              <div key={b.entity}>{bytes32ToAddress(b.entity as Hex)}</div>
            ))}
            <div className="h-2" />
          </div>

          <div className="w-16" />

          <div>
            <OverlineSmall className="mb-3 text-ss-text-x-light">
              Balance
            </OverlineSmall>
            {balances.map((b) => (
              <Mana key={b.entity} amount={Number(b.value)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
