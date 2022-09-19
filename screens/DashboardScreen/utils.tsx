export const mapPauseToBoolean = (value: number) => {
  let state: boolean;
  if (value === 0) state = false;
  if (value === -1) state = true;
  return state;
};

const dfiToUsd = (dfi: number, usd: number, trunc: number = 2) => {
  return Number((dfi * usd).toFixed(trunc));
};

export const portfolioValue = (
  dfiPrice: number,
  usdPrice: number,
  unit: string
) => {
  const valueInUsd = dfiToUsd(dfiPrice, usdPrice, 2);
  const usd = `$ ${valueInUsd}`;
  const dfi = `DFI ${dfiPrice.toFixed(2)}`;

  if (unit === "dfi") return dfi;
  if (unit === "usd") return usd;
};
