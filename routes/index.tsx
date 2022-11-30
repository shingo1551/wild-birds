import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Birds as Props, getBirds } from "../shared/read-bird.tsx";

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
  return (
    <>
      <Head>
        <title>山ノ神沼の鳥</title>
        <script type="module" src="https://cdn.jsdelivr.net/npm/apexcharts" />
      </Head>
      <div class="m-4 mx-auto max-w-screen-lg font-serif">
        <h1 class="text-2xl">山ノ神沼の鳥 2021</h1>
        <hr />
        <h2 class="mx-4 my-2 text-lg">種別野鳥観察数の年間変化</h2>
        <div class="flex flex-col m-4">
          {data.map((bird) => (
            <a href={`bird/2021/${bird.file}`}>{bird.names.kana} {bird.names.kanji}</a>
          ))}
        </div>
      </div>
    </>
  );
}
