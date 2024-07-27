import * as fs from "fs";

import { writeFile } from "node:fs/promises";

const guildTreksEn = JSON.parse(
  fs.readFileSync("./src/script/guildTreks-en.json")
);
const guildTreksFr = JSON.parse(
  fs.readFileSync("./src/script/guildTreks-fr.json")
);

const guildTreks = guildTreksEn.map((trek) => {
  return {
    id: trek.id,
    chatCode: trek.chat_link,
    nameEn: trek.name,
    nameFr: guildTreksFr.find((item) => item.id === trek.id).name,

    mapFr: guildTreksFr.find((item) => item.id === trek.id).map_name,

    waypointFr: guildTreksFr.find((item) => item.id === trek.id).waypoint_name,

    searchFr: guildTreksFr
      .find((item) => item.id === trek.id)
      .name.toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, ""),
  };
});

writeFile(
  "./src/client/utils/guildTreks.json",
  JSON.stringify(guildTreks, null, 2),
  "utf8"
);
