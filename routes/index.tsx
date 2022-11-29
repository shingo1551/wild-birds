import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

import { Names, readBirdJson } from "../shared/read-bird.tsx";

interface Prop {
  names: Names;
  href: string;
}

type Props = Prop[];

export const handler: Handlers<Props> = {
  GET(_, ctx) {
    try {
      const files = new Set<string>();
      for (const dirEntry of Deno.readDirSync(".")) {
        console.log(dirEntry);
      }
      for (const dirEntry of Deno.readDirSync("static/2021")) {
        files.add(dirEntry.name.split(".")[0]);
      }

      const props = [] as Props;
      files.forEach((file) => {
        const o = readBirdJson(2021, file);
        props.push({ href: `bird/2021/${file}`, names: o.names });
      });

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
      </Head>
      <div class="m-4 mx-auto max-w-screen-md flex flex-col">
        {data.map((bird) => (
          <a href={bird.href}>{bird.names.kana} {bird.names.kanji}</a>
        ))}
      </div>
    </>
  );
}
