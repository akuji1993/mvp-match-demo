import { userApi } from "./user";
import { gatewayApi } from "./gateway";
import { projectApi } from "./project";
import { reportApi } from "./report";

export * from "./types";

export const baseUrl = "http://178.63.13.157:8090/mock-api/api";

export const api = {
  user: userApi,
  project: projectApi,
  gateway: gatewayApi,
  report: reportApi,
};
