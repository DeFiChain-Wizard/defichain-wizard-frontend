import { WhaleApiClient } from "@defichain/whale-api-client";

export const fetchLoanTokens = async (client: WhaleApiClient) => {
  const tmpLoanTokens = await client.loan.listLoanToken(100);
  let loanTokens = [];

  for (let index = 0; index < tmpLoanTokens.length; index++) {
    const token = tmpLoanTokens[index].token;
    loanTokens.push({ label: token.displaySymbol, value: token.symbol });
  }

  return loanTokens
};

export const fetchWalletTokens = async (client: WhaleApiClient, address: string) => {
  const tokens = await client.address.listToken(address, 100);
  return tokens
};

export const fetchDFIUSDPrice = async (client: WhaleApiClient) => {
  const data = await client.prices.get('DFI', 'USD')
  const price = data.price.aggregated.amount
  return Number(price)
};