export const getCurrentOrders = () => {
  const apiKey = localStorage.getItem("apiKey");

  return fetch(
    `https://api.guildwars2.com/v2/commerce/transactions/current/buys?access_token=${apiKey}`
  ).then((response) => response.json());
};