import { useState } from "react";
import { useComponentValue, useEntityQuery } from "@latticexyz/react";
import {
  Entity,
  Has,
  HasValue,
  getComponentValueStrict,
} from "@latticexyz/recs";
import { toEthAddress } from "@latticexyz/utils";
import { decodeEntity, singletonEntity } from "@latticexyz/store-sync/recs";
import { useMUD } from "./MUDContext";
import { OverlineLarge, OverlineSmall } from "./Theme/SkyStrife/Typography";
import { Orbs } from "./Theme/SkyStrife/Orbs";

const TOKEN_ID =
  "0x4d616e6100000000000000000000000000000000000000000000000000000000";

// In a real application this could be a separate React component,
// but this program is optimized for readability
const tableData = (label: string, value: Entity | number) => (
  <tr>
    <th align="left">{label}</th>
    <td>{value}</td>
  </tr>
);

const tableDataBool = (label: string, bool: boolean) => (
  <tr>
    <th align="left">{label}</th>
    <td>{bool ? "Yes" : "No"}</td>
  </tr>
);

const MatchData = ({ matchId }: { matchId: number }) => {
  const {
    components: { Match, MatchConfig, MatchFinished, MatchReady },
  } = useMUD();

  const entitiesInMatch = useEntityQuery([HasValue(Match, { value: matchId })]);

  const matchEntity = useEntityQuery([
    Has(MatchConfig),
    HasValue(Match, { value: matchId }),
  ])[0];

  const matchFinished = useComponentValue(MatchFinished, matchEntity);
  const matchReady = useComponentValue(MatchReady, matchEntity);

  return (
    <div>
      <table>
        <tbody>
          {tableData("Entity for the match itself", matchEntity)}
          {tableData("Match entities", entitiesInMatch.length)}
          {tableDataBool(
            "Match over?",
            matchFinished ? matchFinished.value : false
          )}
          {tableDataBool("Match ready?", matchReady ? true : false)}
        </tbody>
      </table>
    </div>
  );
};

export const App = () => {
  const {
    components: { TokenBalance, LatestMatch },
  } = useMUD();

  const [selectedMatch, setSelectedMatch] = useState(0);

  const balances = useEntityQuery([Has(TokenBalance)])
    .filter(
      (entity) =>
        decodeEntity(TokenBalance.metadata.keySchema, entity).token === TOKEN_ID
    )
    .map((entity) => {
      const owner = decodeEntity(
        TokenBalance.metadata.keySchema,
        entity
      ).entity;
      const { value } = getComponentValueStrict(TokenBalance, entity);

      return { entity: owner, value };
    });

  const latest = useComponentValue(LatestMatch, singletonEntity);

  balances.sort((a, b) => Number(b.value - a.value));

  return (
    <div className="bg-slate-200 min-h-screen h-fit">
      <div className="p-8">
        <OverlineLarge>Match Information</OverlineLarge>
        <OverlineSmall>
          Match:
          <select
            name="match"
            id="match"
            value={selectedMatch}
            onChange={(e) => setSelectedMatch(parseInt(e.target.value))}
          >
            {
              [...Array(latest ? latest.value + 1 : 1).keys()].map(
                (num) => (
                  <option value={num} key={num}>
                    {num}
                  </option>
                ) // end of JSX
              ) // end of map
              /* end of JavaScript code embedded in the <select> tag */
            }
          </select>
        </OverlineSmall>
        <MatchData matchId={selectedMatch} />
      </div>

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
