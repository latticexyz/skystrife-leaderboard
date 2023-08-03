import { useEntityQuery } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { Has, getComponentValueStrict } from "@latticexyz/recs";
import { Hex } from "viem";

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
    <>
      <div>
        <h1>Sky Strife Leaderboard</h1>
        <table>
          <thead>
            <tr>
              <th>Account</th>
              <th>Balance (🔮)</th>
            </tr>
          </thead>
          <tbody>
            {balances.map((b) => (
              <tr key={b.entity}>
                <td>{bytes32ToAddress(b.entity as Hex)}</td>
                <td>{b.value.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
