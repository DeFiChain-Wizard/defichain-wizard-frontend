export interface DefichainIncome {
  totalValueLM:             number;
  totalValueCollateral:     number;
  totalValueWallet:         number;
  totalValueLoan:           number;
  totalValue:               number;
  rewards:                  Rewards;
  avgApr:                   number;
  apyDaily:                 number;
  apyWeekly:                number;
  dfiPriceOracle:           number;
  dfiPriceDUSDPool:         number;
  dfiPriceBTCPool:          number;
  dUSD:                     number;
  nextOraclePriceBlocks:    number;
  nextOraclePriceTimeInMin: number;
  vaults:                   Vault[];
}

export interface Rewards {
  year:  Reward;
  month: Reward;
  week:  Reward;
  day:   Reward;
  hour:  Reward;
  min:   Reward;
}

export interface Reward {
  usd: number;
  dfi: number;
}

export interface Vault {
  id:              string;
  state:           string;
  collateralValue: number;
  loanValue:       number;
  vaultRatio:      number;
  nextVaultRation: null;
}
