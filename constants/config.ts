import { CustomMessage } from "../types/CustomMessage";

export const defaultConfig: CustomMessage = {
  compounding: {
    mode: 0,
    threshold: 0,
    token: null,
  },
  pause: 0,
  poolpairs: {},
  rules: {
    keepMaxRatio: null,
    keepMinRatio: null,
  },
  vaultId: null,
  version: "1.0",
};