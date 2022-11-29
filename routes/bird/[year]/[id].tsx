import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import Bird, { Props } from "../../../islands/Bird.tsx";
import { readBirdJson, readBirdTxt } from "../../../shared/read-bird.tsx";

export const handler: Handlers<Props> = {
  GET(_, ctx) {
    try {
      const { year, id } = ctx.params;
      const o = readBirdJson(year, id);
      const comment = readBirdTxt(year, id);
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
        <title>山ノ神沼の鳥</title>
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
      </Head>
      <Bird {...data} />
    </>
  );
}
