import { DoubtReaction_M } from "@prisma/client";
import { callApi } from "./base.service";

export const createReactionService = async (reaction: DoubtReaction_M) => {
  try {
    return callApi<DoubtReaction_M>("POST", `/reaction`, reaction);
  } catch (error) {
    console.warn(error);
  }
};

export const getReactionService = async (doubtId: number, date: Date) => {
  try {
    return callApi<DoubtReaction_M[]>("GET", `/reaction/`, null, {
      doubtId,
      time: new Date(date).getTime(),
    });
  } catch (error) {
    console.warn(error);
  }
};
