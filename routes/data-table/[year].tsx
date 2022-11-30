import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Birds as Props, getBirds } from "../../shared/read-bird.tsx";
import { DataTable } from "../../components/DataTable.tsx";

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    try {
      const { year } = ctx.params;
      return ctx.render(await getBirds(+year));
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
        <title>データテーブル</title>
        <script type="module" src="https://cdn.jsdelivr.net/npm/apexcharts" />
        <link href="/data-table.css" rel="stylesheet" />
      </Head>

      <div class="m-4 mx-auto max-w-screen-lg font-serif">
        <h1 class="text-2xl">山ノ神沼の鳥 2021</h1>
        <hr />
        <DataTable {...data} />
      </div>
    </>
  );
}
