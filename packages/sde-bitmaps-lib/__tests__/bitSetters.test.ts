import BN from "bn.js";
import { expect } from "chai";

import { BigNumberBitmaps } from "../src";
import { MaxUint256, Zero } from "../src/constants";

describe("BigNumberBitmaps bit setter tests", async () => {
  const MaxUint256BnBm = new BigNumberBitmaps(MaxUint256);
  const ZeroBnBm = new BigNumberBitmaps(Zero);
  const bitIndices = [...Array(256).keys()];

  describe("isBitSet tests", async () => {
    it("Should return true, testing idx 0 on `01`", async () => {
      const index = 0;

      const bits = BigNumberBitmaps.from(new BN("01", 2));
      expect(bits.toBN().testn(index)).eq(true);
    });

    it("Should return true, testing idx 1 on `10`", async () => {
      const index = 1;
      const bits = BigNumberBitmaps.from(new BN("10", 2).toString("hex"));
      expect(bits.toBN().testn(index)).eq(true);
    });

    it("Should return false, testing idx 0 on `10`", async () => {
      const index = 0;
      const bits = BigNumberBitmaps.from(new BN("10", 2).toString("hex"));
      expect(bits.toBN().testn(index)).eq(false);
    });

    it("Should return false, testing idx 1 on `01`", async () => {
      const index = 1;
      const bits = BigNumberBitmaps.from(new BN("01", 2).toString("hex"));
      expect(bits.toBN().testn(index)).eq(false);
    });

    it("Should correctly identify bits that are set across full 256 bit range", async () => {
      bitIndices.forEach((bitIndex) => {
        expect(MaxUint256BnBm.toBN().testn(bitIndex)).eq(true);
      });
    });

    it("Should correctly identify bits that are not set across full 256 bit range", async () => {
      bitIndices.forEach((bitIndex) => {
        expect(ZeroBnBm.toBN().testn(bitIndex)).eq(false);
      });
    });
  });

  describe("setBit/unsetBit tests", async () => {
    it("Should correctly set individual bits", async () => {
      bitIndices.forEach((bitIndex) => {
        const result = ZeroBnBm.setBit(bitIndex);
        expect(result.toBN().testn(bitIndex)).eq(true);
      });
    });

    it("Should correctly unset individual bits", async () => {
      bitIndices.forEach((bitIndex) => {
        const result = MaxUint256BnBm.unsetBit(bitIndex);
        expect(result.toBN().testn(bitIndex)).eq(false);
      });
    });

    it("Should correctly set a range of bits across full 256 bit range", async () => {
      bitIndices.forEach((bitIndex) => {
        const result = ZeroBnBm.setBit(bitIndex);
        expect(result.toBN().testn(bitIndex)).eq(true);
      });
    });
    it("Should correctly unset a range of bits", async () => {
      bitIndices.forEach((bitIndex) => {
        const result = MaxUint256BnBm.unsetBit(bitIndex);
        expect(result.toBN().testn(bitIndex)).eq(false);
      });
    });
  });
});

export {};
