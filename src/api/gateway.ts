import { baseUrl } from ".";
import { GatewayResponse } from "./types";

const getGateways = (): Promise<GatewayResponse> => {
  return fetch(`${baseUrl}/gateways`, {
    method: "GET",
  }).then((res) => res.json());
};

export const gatewayApi = {
  getGateways,
};
