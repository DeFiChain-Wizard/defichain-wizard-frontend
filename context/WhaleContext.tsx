import React, { createContext, useContext, useMemo } from "react";
import { WhaleApiClient } from "@defichain/whale-api-client";

const WhaleApiClientContext = createContext<{
  whaleAPI: WhaleApiClient;
}>(undefined as any);

export function useWhaleApiClient(): WhaleApiClient {
  return useContext(WhaleApiClientContext).whaleAPI;
}

export function WhaleProvider(props: any) {
  const client = useMemo(() => {
    return {
      whaleAPI: newWhaleAPIClient(),
    };
  }, []);

  return (
    <WhaleApiClientContext.Provider value={client}>
      {props.children}
    </WhaleApiClientContext.Provider>
  );
}

function newWhaleAPIClient() {
  return new WhaleApiClient({
    url: "https://ocean.defichain.com",
    timeout: 60000,
    version: "v0",
    network: "mainnet",
  });
}
