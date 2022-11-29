export interface Names {
  file: string;
  kana: string;
  kanji: string;
  branch: string;
  genus: string;
  scientific: string;
  english: string;
}

export async function readBirdJson(year: number, id: string) {
  const json = await Deno.readTextFile(
    `static/${year}/${id}/bird.json`,
  );
  const o = JSON.parse(json) as {
    data: number[];
    names: Names;
  };
  o.names.file = id;
  return o;
}

export async function readBirdTxt(year: number, id: string) {
  return await Deno.readTextFile(
    `static/${year}/${id}/bird.txt`,
  );
}
