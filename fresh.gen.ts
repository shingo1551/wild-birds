// DO NOT EDIT. This file is generated by fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import config from "./deno.json" assert { type: "json" };
import * as $0 from "./routes/[name].tsx";
import * as $1 from "./routes/api/joke.ts";
import * as $2 from "./routes/bird/[year]/[id].tsx";
import * as $3 from "./routes/data-table/[year].tsx";
import * as $4 from "./routes/index.tsx";
import * as $5 from "./routes/top10/[year].tsx";
import * as $6 from "./routes/top30/[year].tsx";
import * as $$0 from "./islands/Bird.tsx";
import * as $$1 from "./islands/Counter.tsx";
import * as $$2 from "./islands/Top10.tsx";
import * as $$3 from "./islands/Top30.tsx";

const manifest = {
  routes: {
    "./routes/[name].tsx": $0,
    "./routes/api/joke.ts": $1,
    "./routes/bird/[year]/[id].tsx": $2,
    "./routes/data-table/[year].tsx": $3,
    "./routes/index.tsx": $4,
    "./routes/top10/[year].tsx": $5,
    "./routes/top30/[year].tsx": $6,
  },
  islands: {
    "./islands/Bird.tsx": $$0,
    "./islands/Counter.tsx": $$1,
    "./islands/Top10.tsx": $$2,
    "./islands/Top30.tsx": $$3,
  },
  baseUrl: import.meta.url,
  config,
};

export default manifest;
