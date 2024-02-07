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
