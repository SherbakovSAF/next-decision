import { User_M } from "@prisma/client";
import { callApi } from "./base.service";

export const registerUserService = (user: User_M) => {
  try {
    return callApi<User_M>("POST", "/auth/register", user);
  } catch (error) {
    console.warn(error);
  }
};
