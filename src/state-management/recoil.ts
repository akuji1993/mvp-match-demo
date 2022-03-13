import { atom } from "recoil";
import { Gateway, Project } from "../api";

export enum RECOIL_ATOM {
  PROJECTS = "PROJECTS",
  GATEWAYS = "GATEWAYS",
}

export const projectsState = atom<Partial<Project>[] | null>({
  key: RECOIL_ATOM.PROJECTS,
  default: null,
});

export const gatewaysState = atom<Partial<Gateway>[] | null>({
  key: RECOIL_ATOM.GATEWAYS,
  default: null,
});
