import { BigNumber } from "@ethersproject/bignumber";
import BN from "bn.js";

import { BigNumberBitmaps } from ".";

export const fourBitsBN: BN = new BN("1111", 2);
export const fourBitsBnBm = BigNumberBitmaps.from(fourBitsBN);

export const MaxUint256BN = new BN(
  "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  "hex"
);

export const MaxUint256 = BigInt(MaxUint256BN.toString());

export const Zero = 0n;

export const MaxUint256BigNumber = BigNumber.from(MaxUint256BN.toString());

export const ZeroBigNumber = BigNumber.from(0);
