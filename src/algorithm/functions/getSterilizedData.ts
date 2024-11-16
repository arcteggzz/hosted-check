import { IAccountDetails } from "../types";
import { sampleTestAccountDetails } from "../data";
// import { monoReturnSample } from "../data";

export const getSterilizedData = (): IAccountDetails => {
  return sampleTestAccountDetails;
};
