/* eslint-disable camelcase -- --  */
import BN from "bn.js";
import { expect } from "chai";
import { constants } from "ethers";

import { BigNumberBitmaps } from "../../../lib/BigNumberBitmaps";

describe("BigNumberBitmaps bitShiftRight tests", async () => {
  const fourBitsBN: BN = new BN("1111", 2);
  const fourBitsBnBm = BigNumberBitmaps.fromBN(fourBitsBN);

  it("Should return 1111 shifting left 0", async () => {
    const expectedResult = new BN("1111", 2);
    const shift = 0;
    const result = fourBitsBnBm.bitShiftRight(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 0111 shifting left 1", async () => {
    const expectedResult = new BN("0111", 2);
    const shift = 1;
    const result = fourBitsBnBm.bitShiftRight(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 0011 shifting left 2", async () => {
    const expectedResult = new BN("0011", 2);
    const shift = 2;
    const result = fourBitsBnBm.bitShiftRight(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 0001 shifting left 3", async () => {
    const expectedResult = new BN("0001", 2);
    const shift = 3;
    const result = fourBitsBnBm.bitShiftRight(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 0000 shifting left 4", async () => {
    const expectedResult = new BN("0000", 2);
    const shift = 4;
    const result = fourBitsBnBm.bitShiftRight(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return the correct result across full 256 bit range", async () => {
    const shiftValues = [...Array(257).keys()];

    shiftValues.forEach((shift) => {
      const expectedResult = new BigNumberBitmaps(
        constants.MaxUint256.shr(shift)
      );
      const result = new BigNumberBitmaps(constants.MaxUint256).bitShiftRight(
        shift
      );
      expect(result.toBN().eq(expectedResult.toBN())).eq(true);
    });
  });
});
