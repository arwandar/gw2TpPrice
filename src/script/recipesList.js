import { writeFile } from "node:fs/promises";

const init = 0;
let page = init;
let lastPage = false;

const recipes = [];

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
        if (item.type === "Consumable" && item.details?.recipe_id)
          recipes.push({
            id: item.id,
            name: item.name,
            recipeId: item.details?.recipe_id,
            canBeSend: tpIds.includes(item.id),
          });
      }
    }

    page++;
  } while (!lastPage);

  await writeFile("./src/client/utils/recipes.json", JSON.stringify(recipes));
} catch (error) {
  console.error(error);
}
