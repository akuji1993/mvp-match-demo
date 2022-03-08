import { baseUrl } from ".";
import { UserResponse } from "./types";

const getUser = (): Promise<UserResponse> => {
  return fetch(`${baseUrl}/users`, {
    method: "GET",
  }).then((res) => res.json());
};

export const userApi = {
  getUser,
};
