import { EMOJI as SYMBOL } from "./App";
import { useMUD } from "./MUDContext";

export function Leaderboard() {
  const {
    network: { tables, useStore },
  } = useMUD();

  const balances = useStore((state) =>
    state.getRecords(tables.Scavenger_Balances)
  );

  return (
    <div className="h-screen bg-blue-500 text-xl">
      <div>Leaderboard</div>
      <table>
        <thead>
          <tr>
            <th>Account</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(balances).map((record) => (
            <tr key={record.id}>
              <td>{record.key.account}</td>
              <td>
                {record.value.value.toString()} {SYMBOL}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
