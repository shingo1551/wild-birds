import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import Top30 from "../../islands/Top30.tsx";
import { Birds as Props, getBirds } from "../../shared/read-bird.tsx";

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
        <h1 class="text-2xl">
          <a href="/">山ノ神沼の鳥 2021</a>
        </h1>
        <hr />
      </div>
      <Top30 {...data} />
    </>
  );
}
