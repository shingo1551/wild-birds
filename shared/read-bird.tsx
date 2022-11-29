export interface Names {
  kana: string;
  kanji: string;
  branch: string;
  genus: string;
  scientific: string;
  english: string;
}

export function readBirdJson(year: number, id: string) {
  const json = Deno.readTextFileSync(
    `static/${year}/${id}.json`,
  );
  return JSON.parse(json) as {
    data: number[];
    names: Names;
  };
}

export function readBirdTxt(year: number, id: string) {
  return Deno.readTextFileSync(
    `static/${year}/${id}.txt`,
  );
}
