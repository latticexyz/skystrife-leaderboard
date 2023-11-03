import { Link } from "react-router-dom";
import { useMUD } from "./MUDContext";
import { Hex } from "viem";

function MatchLink({ matchEntity }: { matchEntity: Hex }) {
  const {
    network: { tables, useStore },
  } = useMUD();

  const index = useStore((state) =>
    state.getValue(tables.MatchIndex, { matchEntity })
  );

  return (
    <button className="bg-gray-500 hover:bg-gray-700 font-bold text-lg">
      <Link to={`match/${matchEntity}`}>
        Match #{index ? index.matchIndex : matchEntity}
      </Link>
    </button>
  );
}

export function Home() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const matches = useStore((state) => state.getRecords(tables.MatchConfig));

  return (
    <div className="bg-blue-500">
      <div className="text-3xl">Sky Scavenger</div>
      <div>
        <Link to={`leaderboard`}>Go to the leaderboard</Link>
      </div>
      <div className="text-2xl">Leaderboard</div>
      <div className="text-2xl">Matches</div>
      <div>
        {Object.values(matches).map((record) => (
          <div key={record.id}>
            <MatchLink matchEntity={record.key.key} />
          </div>
        ))}
      </div>
    </div>
  );
}
