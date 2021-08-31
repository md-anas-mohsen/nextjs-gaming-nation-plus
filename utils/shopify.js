import Client from "shopify-buy";

const client = Client.buildClient({
  domain: "gaming-nation-plus.myshopify.com",
  storefrontAccessToken: "5181f65d6e701ff6e63ff4d30bbcbcc0",
});

export { client };
