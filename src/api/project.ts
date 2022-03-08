import { baseUrl } from ".";
import { ProjectResponse } from "./types";

const getProjects = (): Promise<ProjectResponse> => {
  return fetch(`${baseUrl}/projects`, {
    method: "GET",
  }).then((res) => res.json());
};
export const projectApi = { getProjects };
