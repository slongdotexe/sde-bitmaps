import BN from "bn.js";

export const getBnMax256 = () => getMaxBN(256);

export const getBnMax4 = () => getMaxBN(4);

export const getMaxBN = (bitWidth: number) => {
  if (bitWidth % 4 !== 0) {
    throw new Error("Incorrect bitWidth: bit width must be multiple of 4");
  }
  return new BN("".padEnd(bitWidth / 4, "f"), "hex");
};

export const get256Indices = () => [...Array(256).keys()];
