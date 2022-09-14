interface CustomMessageCompounding {
  threshold: number;
  mode: number;
  token: string;
}

interface CustomMessageRules {
  keepMinRatio: number;
  keepMaxRatio: number;
}

interface CustomMessage {
  [key: string]: string | number | object;
  version: string;
  vaultId: string;
  pause: number;
  compounding: CustomMessageCompounding;
  poolpairs: {
      [key: string]: number;
  };
  rules: CustomMessageRules;
}
export { CustomMessage };
