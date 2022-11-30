import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import Bird, { Props } from "../../../islands/Bird.tsx";
import { getBird, getMonthly, readBirdTxt } from "../../../shared/read-bird.tsx";

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    try {
      const { year, id } = ctx.params;
      const bird = await getBird(+year, id);
      const comment = await readBirdTxt(+year, id);
      const o = await getMonthly(+year)
      return ctx.render({ ...bird, comment: comment, monthly: o.monthly });
    } catch (e) {
      console.warn(e);
      return ctx.render();
    }
  },
};

export default function route({ data }: PageProps<Props>) {
  return (
    <>
      <Head>
        <title>{data.names.kana}</title>
        <script type="module" src="https://cdn.jsdelivr.net/npm/apexcharts" />
        <link href="/card.css" rel="stylesheet" />
      </Head>

      <div class="m-4 mx-auto max-w-screen-lg font-serif">
        <h1 class="text-2xl">
          <a href="/">山ノ神沼の鳥 2021</a>
        </h1>
        <hr />
      </div>

      <Bird {...data} />

      <div class="m-4 mx-auto max-w-screen-lg flex">
        <div><a class="text-left" href={data.prev.file}>← {data.prev.kana}</a></div>
        <div style="flex-grow: 1;"></div>
        <div><a class="text-right" href={data.next.file}>{data.next.kana} →</a></div>
      </div>
    </>
  );
}
