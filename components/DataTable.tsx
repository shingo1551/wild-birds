import mimeDbV1520 from "https://deno.land/std@0.150.0/media_types/vendor/mime-db.v1.52.0.ts";
import { Bird, Birds as Props } from "../shared/read-bird.tsx";

export function DataTable({ birds, monthly }: Props) {
  const th = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "計", "%"];
  const sum = monthly.reduce((v1, v2) => v1 + v2);
  return (
    <div class="my-4">
      <table>
        <tr>
          <td></td>
          {th.map((h) => <td>{h}</td>)}
        </tr>
        <tr>
          <th>観察日数</th>
          {monthly.map((count) => <td>{count}</td>)}
          <td>{sum}</td>
          <td>100</td>
        </tr>
        {birds.map((bird) => tr(bird, sum))}
      </table>
    </div>
  );
}

function tr(bird: Bird, sum: number) {
  const s = bird.data.reduce((v1, v2) => v1 + v2);
  return (
    <tr>
      <th>{bird.names.kana}</th>
      {bird.data.map((count) => <td>{count}</td>)}
      <td>{s}</td>
      <td>{Math.ceil(100 * s / sum)}</td>
    </tr>
  );
}
