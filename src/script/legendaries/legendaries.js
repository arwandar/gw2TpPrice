import { writeFile } from "node:fs/promises";
import { getWeapons } from "./weapons.js";
import { getProvenance } from "./provenance.js";

try {
  const weaponGen = await getWeapons();

  let res = await fetch(
    `https://api.guildwars2.com/v2/legendaryarmory?ids=all`
  );
  res = await res.json();
  let items = res.map((item) => ({
    id: item.id,
    maxCount: item.max_count,
  }));

  while (items.some((item) => !item.name)) {
    const ids = items
      .filter((item) => !item.name)
      .map((item) => item.id)
      .slice(0, 100);
    res = await fetch(
      `https://api.guildwars2.com/v2/items?ids=${ids.join(",")}&lang=fr`
    );
    res = await res.json();
    res.forEach((item) => {
      const index = items.findIndex((i) => i.id === item.id);
      let details;
      if (item.type === "Armor") {
        details = {
          type: item.details?.type,
          weight: item.details?.weight_class,
          provenance: getProvenance(item.name),
        };
      } else if (item.type === "Weapon") {
        let weapon = weaponGen.find((gen) => gen.name === item.name);
        if (!weapon) weapon = {};
        delete weapon.name;
        details = { type: item.details?.type, ...weapon };
      } else {
        console.log(item.type);
        details = { provenance: getProvenance(item.name) };
      }

      items[index] = {
        ...items[index],
        name: item.name,
        type: item.type,
        icon: item.icon,
        details,
      };
    });
  }

  // remove Équipement légendaire déverrouillé !
  items = items.filter(({ id }) => id !== 95093);

  writeFile("./src/client/utils/legendaries.json", JSON.stringify(items));
} catch (error) {
  console.error(error);
}
