import { Names as Props } from "../shared/read-bird.tsx";

export function Card(
  { kana, kanji, branch, genus, scientific, english }: Props,
) {
  return (
    <div class="m-4">
      <h1>
        <span class="text-2xl font-bold">{kana}</span>
        <span class="ml-2 text-lg">{kanji}</span>
      </h1>
      <div class="m-2">
        <h2>{branch}{genus}</h2>
        <h2 class="italic font-bold">{scientific}</h2>
        <h2>{english}</h2>
      </div>
    </div>
  );
}
