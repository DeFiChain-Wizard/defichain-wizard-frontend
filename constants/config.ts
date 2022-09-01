import { CustomMessage } from "@defichainwizard/core";

export const defaultConfig: CustomMessage = {
  compounding: {
    mode: 1,
    threshold: null,
    token: "DFI",
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