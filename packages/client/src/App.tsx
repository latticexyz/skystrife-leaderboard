import { useEntityQuery } from "@latticexyz/react";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { toEthAddress } from "@latticexyz/utils";
import { decodeEntity } from "@latticexyz/store-sync/recs";
import { useMUD } from "./MUDContext";
import { OverlineLarge, OverlineSmall } from "./Theme/SkyStrife/Typography";
import { Orbs } from "./Theme/SkyStrife/Orbs";

export const App = () => {
  const {
    components: { TokenBalance },
  } = useMUD();

  const balances = useEntityQuery([Has(TokenBalance)]).map((entity) => {
    const owner = decodeEntity(TokenBalance.metadata.keySchema, entity).entity;
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
              <div key={b.entity}>{toEthAddress(b.entity)}</div>
            ))}
            <div className="h-2" />
          </div>

          <div className="w-16" />

          <div>
            <OverlineSmall className="mb-3 text-ss-text-x-light">
              Balance
            </OverlineSmall>
            {balances.map((b) => (
              <Orbs key={b.entity} amount={b.value} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
