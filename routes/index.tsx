import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Names, readBirdJson } from "../shared/read-bird.tsx";

interface Prop {
  names: Names;
  href: string;
}

type Props = Prop[];

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    try {
      const files = [] as string[];
      for await (const dirEntry of Deno.readDir("static/2021")) {
        files.push(dirEntry.name);
      }

      const props = [] as Props;
      for (const file of files) {
        const o = await readBirdJson(2021, file);
        props.push({ href: `bird/2021/${file}`, names: o.names });
      }

      props.sort((a, b) => a.names.kana < b.names.kana ? -1 : 1);

      return ctx.render(props);
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
        <div class="flex flex-col m-4">
          {data.map((bird) => (
            <a href={bird.href}>{bird.names.kana} {bird.names.kanji}</a>
          ))}
        </div>
      </div>
    </>
  );
}
