import { Link } from "react-router-dom";
import { EMOJI as SYMBOL } from "./Match";
import { useMUD } from "./MUDContext";

export function Leaderboard() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const balances = useStore((state) =>
    Object.values(state.getRecords(tables.Scavenger_Balances))
  );

  return (
    <div className="min-h-screen w-full bg-blue-500">
      <Link className="text-3xl" to="/">
        Sky Scavenger
      </Link>
      <div className="m-2">
        <div className="text-2xl">Leaderboard</div>
        <div className="text-lg">
          {balances.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {balances.map((record) => (
                  <tr key={record.id}>
                    <td>{record.key.account}</td>
                    <td>
                      {record.value.value.toString()} {SYMBOL}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            "Nobody has pilfered yet :("
          )}
        </div>
      </div>
    </div>
  );
}
