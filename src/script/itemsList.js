import { writeFile } from "node:fs/promises";

const init = 0;
let page = init;
let lastPage = false;

const dict = {};

try {
  let res = await fetch(`https://api.guildwars2.com/v2/commerce/listings`);
  let tpIds = await res.json();

  do {
    console.log("Process: ", page);
    const res = await fetch(
      `https://api.guildwars2.com/v2/items?page=${page}&page_size=200&lang=fr`
    );
    const response = await res.json();
    if (response.text) lastPage = true;
    else {
      for (let i = 0; i < response.length; i++) {
        let item = response[i];
        if (
          !["Armor", "Weapon", "Back", "Container"].includes(item.type) &&
          !item.name.includes("Recette") &&
          !item.name.includes("Apparence") &&
          !item.name.includes("Zone") &&
          tpIds.includes(item.id)
        ) {
          console.log("+", item.type, item.id, item.name);
          dict[item.name] = item.id;
        } else {
          console.log("-", item.type, item.id, item.name);
        }
      }
    }

    page++;
  } while (!lastPage);
  await writeFile("./src/client/utils/items.json", JSON.stringify(dict));
} catch (error) {
  console.error(error);
}
a;
