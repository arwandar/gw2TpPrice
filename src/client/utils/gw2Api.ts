export const getCurrentOrders = () => {
  const apiKey = localStorage.getItem("apiKey");

  if (!apiKey) return [];

  return fetch(
    `https://api.guildwars2.com/v2/commerce/transactions/current/buys?access_token=${apiKey}`
  ).then((response) => response.json());
};

export const getUnlockedRecipes = async (): Promise<{
  main: string[];
  secondary: string[];
}> => {
  const result = { main: [], secondary: [] };

  const mainApiKey = localStorage.getItem("apiKey");
  if (mainApiKey)
    result.main = await fetch(
      `https://api.guildwars2.com/v2/account/recipes?access_token=${mainApiKey}`
    ).then((response) => response.json());

  const secondaryApiKey = localStorage.getItem("secondaryApiKey");
  if (secondaryApiKey)
    result.secondary = await fetch(
      `https://api.guildwars2.com/v2/account/recipes?access_token=${secondaryApiKey}`
    ).then((response) => response.json());

  return result;
};

export const getCurrentPrices = async (ids: number[]) => {
  if (ids.length === 0) return {};

  try {
    const res = await fetch(
      `https://api.guildwars2.com/v2/commerce/prices?ids=${ids}`
    );

    const response = await res.json();

    return response.reduce(
      (
        obj: Record<string, number>,
        item: { id: string; buys: { unit_price: number } }
      ) => ({ ...obj, [item.id]: item.buys.unit_price || -1 }),
      {}
    );
  } catch (error) {
    console.error(error);
    return {};
  }
};

export const getUnlockedSkins = async () => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://api.guildwars2.com/v2/account/skins?access_token=${apiKey}`
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getAchievements = async (ids?: number[]) => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) return [];

  try {
    let url = `https://api.guildwars2.com/v2/account/achievements?access_token=${apiKey}`;
    if (ids) url += `&ids=${ids.join(",")}`;

    const res = await fetch(url);
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMaterialStorage = async (): Promise<
  {
    id: number;
    count: number;
    binding?: "Account";
    category: number;
  }[]
> => {
  const apiKey = localStorage.getItem("apiKey");
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://api.guildwars2.com/v2/account/materials?access_token=${apiKey}`
    );
    const response = await res.json();
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLabelById = async (idToFind: number): Promise<string> => {
  const res = await fetch(`https://api.guildwars2.com/v2/items/${idToFind}`);
  const response = await res.json();

  return response.name;
};
