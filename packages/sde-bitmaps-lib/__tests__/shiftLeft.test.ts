import BN from "bn.js";
import { expect } from "chai";
import { constants } from "ethers";

import { BigNumberBitmaps } from "../src";

describe("BigNumberBitmaps bitShiftLeft tests", async () => {
  const fourBitsBN: BN = new BN("1111", 2);
  const fourBitsBnBm = BigNumberBitmaps.fromBN(fourBitsBN);

  it("Should return 1111 shifting left 0", async () => {
    const expectedResult = new BN("1111", 2);
    const shift = 0;
    const result = fourBitsBnBm.bitShiftLeft(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 1110 shifting left 1", async () => {
    const expectedResult = new BN("1110", 2);
    const shift = 1;
    const result = fourBitsBnBm.bitShiftLeft(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 1100 shifting left 2", async () => {
    const expectedResult = new BN("1100", 2);
    const shift = 2;
    const result = fourBitsBnBm.bitShiftLeft(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 1000 shifting left 3", async () => {
    const expectedResult = new BN("1000", 2);
    const shift = 3;
    const result = fourBitsBnBm.bitShiftLeft(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return 0000 shifting left 4", async () => {
    const expectedResult = new BN("0000", 2);
    const shift = 4;
    const result = fourBitsBnBm.bitShiftLeft(shift);
    expect(result.toBN().eq(expectedResult)).eq(true);
  });

  it("Should return the correct result across full 256 bit range", async () => {
    const shiftValues = [...Array(257).keys()];

    shiftValues.forEach((shift) => {
      const expectedResult = new BigNumberBitmaps(
        constants.MaxUint256.shl(shift).and(constants.MaxUint256)
      );
      const result = new BigNumberBitmaps(constants.MaxUint256).bitShiftLeft(
        shift
      );
      expect(result.toBN().eq(expectedResult.toBN())).eq(true);
    });
  });

  it("Should not increase the bit width of the returned bitmap", async () => {
    const shiftValues = [...Array(257).keys()];

    shiftValues.forEach((shift) => {
      const result = new BigNumberBitmaps(constants.MaxUint256).bitShiftLeft(
        shift
      );
      // Edge-ish case, bit width of dec0 is `0`
      if (shift === 256) {
        expect(result.toBN().bitLength()).eq(0);
        return;
      }
      expect(result.toBN().bitLength()).eq(256);
    });
  });
});
