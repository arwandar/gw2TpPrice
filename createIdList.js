import { writeFile } from "node:fs/promises";

const init = 0;
let page = init;
let lastPage = false;

const dict = {};

try {
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
          !["Armor", "Weapon", "Back", "Container", "MiniPet"].includes(
            item.type
          ) &&
          !item.flags.includes("AccountBound") &&
          !item.flags.includes("SoulbindOnAcquire")
        ) {
          console.log(item.type, item.id, item.name);
          dict[item.name] = item.id;
        } else {
        }
      }
    }

    page++;
  } while (!lastPage);
} catch (error) {
  console.error(error);
}

await writeFile("./src/utils/dict.json", JSON.stringify(dict));
