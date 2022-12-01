import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Bird, Birds as Props, getBirds } from "../shared/read-bird.tsx";
import { divide } from "../shared/utils.ts";

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    try {
      return ctx.render(await getBirds(2021));
    } catch (e) {
      console.warn(e);
      return ctx.render();
    }
  },
};

export default function Home({ data }: PageProps<Props>) {
  const cols = divide<Bird>(data.birds, 2);

  const Col = ({ birds }: { birds: Bird[] }) => (
    <div class="flex flex-col mx-4">
      {birds.map((bird) => (
        <a href={`bird/2021/${bird.file}`}>{bird.names.kana}</a>
        // <a href={`bird/2021/${bird.file}`}>{bird.names.kana} {bird.names.kanji}</a>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>山ノ神沼の鳥</title>
        <script type="module" src="https://cdn.jsdelivr.net/npm/apexcharts" />
      </Head>
      <div class="m-4 mx-auto max-w-screen-lg font-serif">
        <h1 class="text-2xl">山ノ神沼の鳥 2021</h1>
        <hr />
        <h2 class="my-2 text-lg">種別野鳥観察数の年間変化</h2>

        <div class="flex my-2">
          <Col birds={cols[0]} />
          <Col birds={cols[1]} />
        </div>

        <hr />
        <div class="my-2 mx-auto max-w-screen-lg flex flex-col">
          <a href={`top30/2021`}>野鳥の頻度 ベスト30 (Bar Chart)</a>
          <a href={`top10/2021`}>野鳥の頻度 ベスト10 (Line Chart)</a>
          <a href={`data-table/2021`}>データテーブル</a>
        </div>
      </div>
    </>
  );
}
