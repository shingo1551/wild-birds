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
    `data/${year}/${id}.json`,
  );
  return JSON.parse(json) as {
    data: number[];
    names: Names;
  };
}

export function readBirdTxt(year: string, id: string) {
  return Deno.readTextFileSync(
    `data/${year}/${id}.txt`,
  );
}
