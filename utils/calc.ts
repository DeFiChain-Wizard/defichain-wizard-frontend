const calcDfiUsdPrice = (dfi: number, usd: number, trunc: number = 2) => {
  return Number((dfi * usd).toFixed(trunc));
};

export const portfolioValue = (dfiPrice: number, usdPrice: number, unit: string) => {
  const valueInUsd = calcDfiUsdPrice(dfiPrice, usdPrice, 2);
  const usd = `$ ${valueInUsd}`;
  const dfi = `DFI ${dfiPrice.toFixed(2)}`;

  if (unit === "dfi") return dfi;
  if (unit === "usd") return usd;
};