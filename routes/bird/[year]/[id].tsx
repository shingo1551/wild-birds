import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import Bird, { Props } from "../../../islands/Bird.tsx";
import { readBirdJson, readBirdTxt } from "../../../shared/read-bird.tsx";

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    try {
      const { year, id } = ctx.params;
      const o = await readBirdJson(+year, id);
      const comment = await readBirdTxt(+year, id);
      return ctx.render({ ...o, comment: comment });
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
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      </Head>

      <div class="m-4 font-serif">
        <h1 class="text-2xl">
          <a href="/">山ノ神沼の鳥 2021</a>
        </h1>
        <hr />
      </div>

      <Bird {...data} />
    </>
  );
}
