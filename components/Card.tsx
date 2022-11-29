import { Names as Props } from "../shared/read-bird.tsx";

export function Card(
  { kana, kanji, branch, genus, scientific, english }: Props,
) {
  return (
    <div class="m-4">
      <h1 class="text-2xl">{kana}</h1>
      <div class="m-2">
        <h2>{kanji}</h2>
        <h2>{branch}</h2>
        <h2>{genus}</h2>
        <h2>{scientific}</h2>
        <h2>{english}</h2>
      </div>
    </div>
  );
}
