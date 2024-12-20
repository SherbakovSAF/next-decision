import { Doubt_M } from "@prisma/client";
import { callApi } from "./base.service";
import { Doubt_I } from "../types/doubt.type";

export const getAllDoubtsService = async () => {
  try {
    return callApi<Doubt_I[]>("GET", "/doubt");
  } catch (error) {
    console.error(error);
    throw new Error("Не нашли, ошибка");
  }
};

export const getDoubtService = async (id: number) => {
  try {
    console.log("service", id);
    return callApi<Doubt_I>("GET", `/doubt/${id}`, null, { id });
  } catch (error) {
    console.warn(error);
  }
};

export const createDoubtService = async (doubt: Doubt_M) => {
  try {
    return callApi("POST", "/doubt", doubt);
  } catch (error) {
    console.warn(error);
  }
};

export const updateDoubtService = async (doubt: Doubt_M) => {
  try {
    return callApi("PUT", "/doubt", doubt);
  } catch (error) {
    console.warn(error);
  }
};
