import { Names as Props } from "../shared/read-bird.tsx";
import { IS_BROWSER } from "$fresh/runtime.ts";

export function Card(
  { file, kana, kanji, branch, genus, scientific, english }: Props,
) {
  const sp = IS_BROWSER && (window.screen.width < 720)

  return (
    <div class={`m-4 ${sp ? '' : 'flex'}`}>
      <div style="flex-grow: 1;">
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
      <img class="right-0" src={`/2021/${file}/bird.jpg`} alt={english} />
    </div>
  );
}
