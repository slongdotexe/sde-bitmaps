import BN from "bn.js";

import { BigNumberBitmaps } from ".";

export const fourBitsBN: BN = new BN("1111", 2);
export const fourBitsBnBm = BigNumberBitmaps.from(fourBitsBN);

export const MaxUint256BN = new BN(
  "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  "hex"
);
