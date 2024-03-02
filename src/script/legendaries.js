import * as fs from "fs";

import { writeFile } from "node:fs/promises";

const legendaries = JSON.parse(
  fs.readFileSync("./src/client/utils/legendaries.json")
);

const processLeg = async (leg) => {
  try {
    let res;
    res = await fetch(`https://api.guildwars2.com/v2/items/${leg.idLeg}`);
    const apiLeg = await res.json();

    res = await fetch(`https://api.guildwars2.com/v2/items/${leg.idPrecu}`);
    const apiPrecu = await res.json();

    res = await fetch(`https://api.guildwars2.com/v2/items/${leg.idPerf}`);
    const apiPerf = await res.json();

    res = await fetch(`https://api.guildwars2.com/v2/items/${leg.idProto}`);
    const apiProto = await res.json();

    const newLeg = {
      ...leg,
      iconLeg: apiLeg.icon,
      iconPrecu: apiPrecu.icon,
      iconPerf: apiPerf.icon,
      iconProto: apiProto.icon,
    };

    return newLeg;
  } catch (error) {
    console.error(error);
  }
};

const newLegendaries = [];

for (const leg of legendaries) {
  console.log(leg.leg);
  const newLeg = await processLeg(leg);
  newLegendaries.push(newLeg);
}

console.log(newLegendaries);

writeFile(
  "./src/client/utils/legendaries.json",
  JSON.stringify(newLegendaries)
);
