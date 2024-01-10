export const getCurrentOrders = (apiKey: string) =>
  fetch(
    `https://api.guildwars2.com/v2/commerce/transactions/current/buys?access_token=${apiKey}`
  )
    .then((response) => response.json())
    .then((data: any) => {
      const items = data.reduce(
        (
          list: { [x: string]: number },
          item: { item_id: string | number; quantity: any }
        ) => {
          if (!list[item.item_id]) list[item.item_id] = 0;
          list[item.item_id] += item.quantity;
          return list;
        },
        {}
      );
      return items;
    });
