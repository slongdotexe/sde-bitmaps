import { expect } from "chai";

import { BigNumberBitmaps } from "../src";
import { MaxUint256 } from "../src/constants";

describe("Flip  tests", async () => {
  describe("flip", async () => {
    it("Should produce MaxUint256 -1 when flipping 01", async () => {
      const result = BigNumberBitmaps.from(1).flip();
      expect(result.value).eq(MaxUint256 - 1n);
    });
    it("Should produce MaxUint256 -2 when flipping 10", async () => {
      const result = BigNumberBitmaps.from(2).flip();
      expect(result.value).eq(MaxUint256 - 2n);
    });
    it("Should produce 0 when flipping MaxUint256", async () => {
      const result = BigNumberBitmaps.from(MaxUint256).flip();
      expect(result.value).eq(0n);
    });

    it("Should produce MaxUint256 when flipping 0", async () => {
      const result = BigNumberBitmaps.from(0).flip();
      expect(result.value).eq(MaxUint256);
    });
  });

  describe("flipBit", async () => {
    describe("unset to set", () => {
      it("Should flip the 0th bit", async () => {
        const initial = BigNumberBitmaps.from(0);
        expect(initial.value).eq(0n);
        const result = initial.flipBit(0);
        expect(result.value).eq(1n);
      });

      it("Should flip the 1st bit", async () => {
        const result = BigNumberBitmaps.from(0).flipBit(1);
        expect(result.value).eq(2n);
      });

      it("Should flip the 2nd bit", async () => {
        const result = BigNumberBitmaps.from(0).flipBit(2);
        expect(result.value).eq(4n);
      });

      it("Should flip the 255th bit", async () => {
        const result = BigNumberBitmaps.from(0).flipBit(255);
        expect(result.value).eq(2n ** 255n);
      });
    });

    describe("set to unset", () => {
      it("Should flip the 0th bit", async () => {
        const initial = BigNumberBitmaps.from(1);
        expect(initial.value).eq(1n);
        const result = initial.flipBit(0);
        expect(result.value).eq(0n);
      });

      it("Should flip the 1st bit", async () => {
        const initial = BigNumberBitmaps.from(2);
        expect(initial.value).eq(2n);
        const result = initial.flipBit(1);
        expect(result.value).eq(0n);
      });
      it("Should flip the 2nd bit", async () => {
        const initial = BigNumberBitmaps.from(4);
        expect(initial.value).eq(4n);
        const result = initial.flipBit(2);
        expect(result.value).eq(0n);
      });
      it("Should flip the 255th bit", async () => {
        const initial = BigNumberBitmaps.from(2n ** 255n);
        expect(initial.value).eq(2n ** 255n);
        const result = initial.flipBit(255);
        expect(result.value).eq(0n);
      });
    });
  });
});
