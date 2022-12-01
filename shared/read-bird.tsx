export interface Names {
  file: string;
  kana: string;
  kanji: string;
  branch: string;
  genus: string;
  scientific: string;
  english: string;
}

async function readBirdJson(year: number, file: string) {
  const json = await Deno.readTextFile(
    `static/${year}/${file}/bird.json`,
  );
  const o = JSON.parse(json) as {
    data: number[];
    names: Names;
  };
  o.names.file = file;
  return o;
}

export async function readBirdTxt(year: number, file: string) {
  return await Deno.readTextFile(
    `static/${year}/${file}/bird.txt`,
  );
}

//
interface Link {
  file: string;
  kana: string;
}

export interface Bird {
  file: string;
  names: Names;
  data: number[];
  prev: Link;
  next: Link;
}

export interface Birds {
  birds: Bird[];
  monthly: number[];
}

let _birds: Birds;

export async function getBirds(year: number) {
  if (_birds) {
    return _birds;
  }

  const files = [] as string[];
  for await (const dirEntry of Deno.readDir(`static/${year}`)) {
    if (dirEntry.isDirectory) {
      files.push(dirEntry.name);
    }
  }

  const birds = [] as Bird[];
  for (const file of files) {
    const o = await readBirdJson(year, file);
    birds.push({ file: file, data: o.data, names: o.names } as Bird);
  }

  birds.sort((a, b) => a.names.kana.localeCompare(b.names.kana));
  _birds = { birds: birds, monthly: (await getMonthly(year)).monthly };

  // create link
  birds[0].prev = getLink(birds.length - 1);
  for (let i = 1; i < birds.length; i++) {
    birds[i - 1].next = getLink(i);
    birds[i].prev = getLink(i - 1);
  }
  birds[birds.length - 1].next = getLink(0);

  return _birds;
}

function getLink(i: number) {
  return { file: _birds.birds[i].file, kana: _birds.birds[i].names.kana };
}

export async function getBird(year: number, file: string) {
  const birds = (await getBirds(year)).birds;
  return birds.find((bird) => bird.file == file) as Bird;
}

//
let _monthly: { monthly: number[] };
export async function getMonthly(year: number) {
  if (_monthly) {
    return _monthly;
  }

  const json = await Deno.readTextFile(
    `static/${year}/_data.json`,
  );
  _monthly = JSON.parse(json);
  return _monthly;
}
